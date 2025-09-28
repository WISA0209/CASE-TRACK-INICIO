// Función que detecta cuando un elemento entra en el viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
    );
}

function animateOnScroll() {
    const sections = document.querySelectorAll('.info-section');

    sections.forEach((section) => {
        const text = section.querySelector('.text-container');
        if (isElementInViewport(section)) {
            section.classList.add('show');
            section.classList.remove('reverse');
            text.classList.add('show');
        } else {
            section.classList.remove('show');
            section.classList.add('reverse');
            text.classList.remove('show');
        }
    });
}

// Corrige desplazamiento horizontal al hacer scroll a una sección
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const rect = target.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            window.scrollTo({
                top: rect.top + scrollTop,
                left: 0, // Fuerza que siempre sea desde la izquierda
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', animateOnScroll);

document.addEventListener('DOMContentLoaded', animateOnScroll);

