document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu ul li a');

    // Toggle para el menú hamburguesa en móviles
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar el menú cuando se hace clic en un enlace (para móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) { // Solo si es un dispositivo móvil
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Lógica para resaltar el enlace activo
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        link.classList.remove('active'); // Elimina 'active' de todos primero

        let linkPath = new URL(link.href).pathname;

        // Ajuste para la página de inicio
        // Si es el root ('/') o 'index.html'
        if (linkPath === '/' || linkPath.endsWith('/index.html')) {
            if (currentPath === '/' || currentPath.endsWith('/index.html')) {
                link.classList.add('active');
            }
        } else if (currentPath.includes(linkPath)) {
            link.classList.add('active');
        }
    });
});
// --- Lógica del Carrusel de Imágenes para Admisiones ---
let slideIndex = 1; // Índice de la slide actual
let autoSlideTimeout; // Variable para almacenar el temporizador del avance automático

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-slide");
    let dots = document.getElementsByClassName("dot");

    // Limpia el temporizador de avance automático cada vez que una slide cambia (manual o automática)
    clearTimeout(autoSlideTimeout);

    // Lógica para ir al principio o al final si se pasa del rango
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Oculta todas las slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // Desactiva todos los puntos de navegación
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    // Muestra la slide actual y activa el punto correspondiente
    if (slides[slideIndex - 1]) { // Verifica que la slide exista
        slides[slideIndex - 1].style.display = "block";
    }
    if (dots[slideIndex - 1]) { // Verifica que el punto exista
        dots[slideIndex - 1].className += " active-dot";
    }

    // Configura el temporizador para avanzar automáticamente a la siguiente slide después de 5 segundos (5000 ms)
    autoSlideTimeout = setTimeout(() => plusSlides(1), 5000);
}

// Función para avanzar o retroceder en las slides
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Función para ir a una slide específica usando los puntos
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Llama a showSlides() una vez que el DOM esté completamente cargado
// Esto asegura que el carrusel se inicialice correctamente.
document.addEventListener('DOMContentLoaded', (event) => {
    // Solo inicializa el carrusel si la sección existe en la página
    if (document.querySelector('.admissions-carousel-hero')) {
        showSlides(slideIndex);
    }
});
