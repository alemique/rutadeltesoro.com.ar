// --- Lógica para el Acordeón del Reglamento ---

// 1. Seleccionamos todos los encabezados del acordeón
const accordionHeaders = document.querySelectorAll('.accordion-header');

// 2. Recorremos cada encabezado y le añadimos un "escuchador de eventos"
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        // 3. Cuando se hace clic en un encabezado...

        // Obtenemos el panel de contenido asociado a ese encabezado
        const content = header.nextElementSibling;

        // Alternamos la clase 'active' en el encabezado
        header.classList.toggle('active');

        // 4. Comprobamos si el panel de contenido está abierto o cerrado
        if (content.style.maxHeight) {
            // Si está abierto (tiene un valor de maxHeight), lo cerramos
            content.style.maxHeight = null;
        } else {
            // Si está cerrado, lo abrimos dándole la altura de su contenido
            content.style.maxHeight = content.scrollHeight + "px";
        } 
    });
});

// --- Lógica para el Menú Hamburguesa ---

// 1. Seleccionamos los elementos del DOM
const navToggle = document.querySelector('.nav-toggle');
const navCluster = document.querySelector('.nav-right-cluster');
const navLinks = document.querySelectorAll('.nav-menu a');

// 2. "Escuchador" para el clic en el botón hamburguesa
navToggle.addEventListener('click', () => {
    navCluster.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// 3. "Escuchador" para cerrar el menú al hacer clic en un enlace (útil en páginas de una sola vista)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navCluster.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// --- Lógica para la Tabla de Posiciones en Vivo ---

// 1. URL de tu Google Script (ya está configurado para devolver el ranking)
const LEADERBOARD_URL = 'https://script.google.com/macros/s/AKfycbym5-onTOyzlqZn_G4O-5acxAZzReYjIOY5SF8tBh3TtT2jEFVw6IZ2MMMtkHGtRl0F/exec';

// 2. Elemento del DOM donde insertaremos la tabla
const tableContainer = document.querySelector('#ranking .table-container');

// 3. Función para obtener los datos y construir la tabla
async function fetchAndDisplayRanking() {
    if (!tableContainer) return; // Si no encuentra el contenedor, no hace nada

    try {
        // Mostramos un mensaje de "Cargando..."
        tableContainer.innerHTML = '<p>Cargando el Concilio de Guardianes...</p>';

        const response = await fetch(LEADERBOARD_URL);
        if (!response.ok) {
            throw new Error('Error al contactar con el servidor de los Guardianes.');
        }
        const data = await response.json();

        // Si no hay datos o hay un error, mostrar un mensaje
        if (!data || data.length === 0) {
            tableContainer.innerHTML = '<p>Aún no hay equipos en el ranking. ¡Sé el primero!</p>';
            return;
        }

        // Construimos el HTML de la tabla
        let tableHTML = `
            <table class="leaderboard-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Guardián</th>
                        <th>Fragmentos</th>
                        <th>Tiempo</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Añadimos una fila (<tr>) por cada equipo en el ranking
        data.slice(0, 10).forEach((team, index) => {
            tableHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${team.teamName || 'Guardián Anónimo'}</td>
                    <td>${team.score || 0}</td>
                    <td>${team.time || '00:00:00'}</td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        // Reemplazamos el mensaje de "Cargando..." con la tabla completa
        tableContainer.innerHTML = tableHTML;

    } catch (error) {
        console.error("Error al obtener el ranking:", error);
        tableContainer.innerHTML = '<p>No se pudo cargar el ranking. Intenta más tarde.</p>';
    }
}

// 4. Ejecutamos la función cuando la página se carga
document.addEventListener('DOMContentLoaded', fetchAndDisplayRanking);