// --- Lógica para el Preloader ---
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    // Duración fija de 3 segundos (3000 milisegundos)
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 3000); 
});


// --- Lógica para el Acordeón del Reglamento ---
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        header.classList.toggle('active');

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        } 
    });
});


// --- Lógica para el Menú Hamburguesa ---
const navToggle = document.querySelector('.nav-toggle');
const navCluster = document.querySelector('.nav-right-cluster');
const navLinks = document.querySelectorAll('.nav-menu a');

if (navToggle && navCluster) {
    navToggle.addEventListener('click', () => {
        navCluster.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navCluster.classList.contains('active')) {
            navCluster.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});


// --- Lógica para la Tabla de Posiciones en Vivo ---
const LEADERBOARD_URL = 'https://script.google.com/macros/s/AKfycbym5-onTOyzlqZn_G4O-5acxAZzReYjIOY5SF8tBh3TtT2jEFVw6IZ2MMMtkHGtRl0F/exec';
const tableContainer = document.querySelector('#ranking .table-container');

async function fetchAndDisplayRanking() {
    if (!tableContainer) return;

    try {
        tableContainer.innerHTML = '<p>Cargando el Concilio de Guardianes...</p>';

        const response = await fetch(LEADERBOARD_URL);
        if (!response.ok) {
            throw new Error('Error al contactar con el servidor de los Guardianes.');
        }
        const data = await response.json();

        if (!data || data.length === 0) {
            tableContainer.innerHTML = '<p>Aún no hay equipos en el ranking. ¡Sé el primero!</p>';
            return;
        }

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

        tableContainer.innerHTML = tableHTML;

    } catch (error) {
        console.error("Error al obtener el ranking:", error);
        tableContainer.innerHTML = '<p>No se pudo cargar el ranking. Intenta más tarde.</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayRanking);
