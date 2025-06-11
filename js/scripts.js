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