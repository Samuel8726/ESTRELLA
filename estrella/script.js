// =========================================================
// SCRIPT.JS - CÓDIGO FINAL COMPLETO: EFECTO LLUVIA SUAVE
// =========================================================

// 1. CONFIGURACIÓN DE CONTENIDO
const PHRASES = [
    { text: "Hermosa!", size: 30, color: '#FFB6C1' },
    { text: "Feli Cumpleaños!!", size: 45, color: '#FFFFFF' },
    { text: "Bonita!", size: 25, color: '#FFD700' },
    { text: "Happy Birthay Tu Yu!!", size: 29, color: '#ADD8E6' },
    { text: "Te Amo Mucho!!", size: 35, color: '#FFA07A' },
    { text: "Bella!!", size: 30, color: '#7ae2ffff' },
    { text: "Divina!", size: 35, color: '#FFA07A' }
    // Añade más frases aquí
];

// Rutas de tus imágenes (¡Asegúrate que el nombre y extensión sean correctos!)
const IMAGE_URLS = [
    'img/foto1.jpeg',
    'img/foto2.jpeg',
    'img/foto3.jpeg',
    'img/foto4.jpeg',
    'img/foto5.jpeg'
    // Añade más rutas de imágenes aquí
];

// 2. LÓGICA DE LA ANIMACIÓN
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('star-container');
    const totalParticles = 200;
    const particles = [];

    // Función de creación de partículas
    function createParticle(type, content) {
        const p = document.createElement(type === 'image' ? 'img' : 'div');
        p.classList.add('particle');

        p.style.left = `${Math.random() * 100}vw`;
        p.style.top = `${Math.random() * 100}vh`;
        p.speed = Math.random() * 0.5 + 0.1;

        if (type === 'star') {
            p.classList.add('star');
        } else if (type === 'phrase') {
            p.classList.add('phrase');
            p.textContent = content.text;
            p.style.fontSize = `${content.size}px`;
            p.style.color = content.color;
        } else if (type === 'image') {
            p.classList.add('image-particle');
            p.src = content;
        }

        p.style.transform = 'translate(-50%, -50%)';

        // Las imágenes inician con opacidad baja para el desvanecimiento suave
        if (type === 'image') {
            p.style.opacity = 0.1;
        }

        container.appendChild(p);
        particles.push(p);
    }

    // Creación de las partículas
    for (let i = 0; i < totalParticles; i++) {
        if (i < IMAGE_URLS.length) {
            createParticle('image', IMAGE_URLS[i % IMAGE_URLS.length]);
        } else if (i < (IMAGE_URLS.length + PHRASES.length)) {
            createParticle('phrase', PHRASES[i % PHRASES.length]);
        } else {
            createParticle('star');
        }
    }

    // Bucle de animación (Efecto Lluvia 2D con Reinicio Suave)
    function animate() {
        const containerHeight = window.innerHeight;

        particles.forEach(p => {
            // 1. Mueve la partícula hacia abajo
            const currentTop = parseFloat(p.style.top);
            p.style.top = `${currentTop + p.speed * 7}px`;

            // 2. REINICIO INVISIBLE (Corrección definitiva)
            if (currentTop > containerHeight + 50) {

                // Oculta la imagen antes de cambiar su posición (evita el "salto")
                if (p.classList.contains('image-particle')) {
                    p.style.display = 'none';
                }

                // Reinicia la posición Y arriba y X aleatoria
                p.style.top = `-50px`;
                p.style.left = `${Math.random() * 100}vw`;

                // Vuelve a mostrar la imagen y reinicia la opacidad baja para el desvanecimiento
                if (p.classList.contains('image-particle')) {
                    p.style.display = 'block';
                    p.style.opacity = 0.1;
                } else {
                    p.style.opacity = 1;
                }

                p.speed = Math.random() * 0.5 + 0.1;
            }

            // 3. Incremento de Opacidad (SOLO PARA IMÁGENES)
            // Hace que la imagen se desvanezca de 0.1 a 1.0 mientras cae.
            if (p.classList.contains('image-particle') && parseFloat(p.style.opacity) < 1) {
                p.style.opacity = Math.min(1, parseFloat(p.style.opacity) + 0.01);
            }

            // 4. Efecto de parpadeo/brillo (Para frases y estrellas)
            if (p.classList.contains('star') || p.classList.contains('phrase')) {
                if (p.style.display !== 'none') {
                    p.style.opacity = 0.5 + Math.sin(Date.now() * 0.005 * p.speed) * 0.5;
                }
            }
        });

        requestAnimationFrame(animate);
    }

    // Inicia el bucle de animación
    animate();
});