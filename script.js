const header = document.getElementById('header');
const headerLogo = document.getElementById('header-logo');
const navToggleIcon = document.querySelector('#nav-toggle i');
const sectionsWithObserver = document.querySelectorAll('section[id]');

// CORREÇÃO FINAL: Ponto e vírgula no final, não dois pontos.
const logoPreta = 'Modern_Creative_Business_Card__2_-removebg-preview.png'; 

const observerOptions = {
    root: null,
    rootMargin: '-80px 0px 0px 0px',
    threshold: 0.4
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId === 'servicos' || sectionId === 'diferenciais' || sectionId === 'contato') {
                header.classList.add('on-light-section');
            } else {
                header.classList.remove('on-light-section');
            }
        }
    });
}, observerOptions);

sectionsWithObserver.forEach(section => {
    sectionObserver.observe(section);
});

window.addEventListener('scroll', () => {
    const isScrolled = window.scrollY > 20;
    header.classList.toggle('header-scrolled', isScrolled);
});

// Lógica para o efeito fade-in constante
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        } else {
            // Remove a classe quando o elemento sai da viewport para que a animação possa ser reativada
            entry.target.classList.remove('is-visible');
        }
    });
}, {
    threshold: 0.1 // O elemento será observado quando 10% dele estiver visível
});

const elementsToFadeIn = document.querySelectorAll('.fade-in-element');
elementsToFadeIn.forEach(el => fadeInObserver.observe(el));

const navList = document.getElementById('nav-list');
const navToggle = document.getElementById('nav-toggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isMenuOpen = navList.classList.toggle('show-menu');
        navToggleIcon.className = isMenuOpen ? 'bx bx-x' : 'bx bx-menu';
    });
}

const navLinksMobile = document.querySelectorAll('.nav-list .nav-link');
navLinksMobile.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('show-menu');
        navToggleIcon.className = 'bx bx-menu';
    });
});

// --- LÓGICA DO NOVO FORMULÁRIO COM FORMSPREE ---
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Envia os dados do formulário para o Formspree
        const response = await fetch(contactForm.action, {
            method: contactForm.method,
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json' // Importante para o Formspree retornar JSON
            }
        });

        if (response.ok) { // Se a resposta do Formspree for bem-sucedida
            // Exibe a mensagem de sucesso
            successMessage.classList.add('show');

            // Reseta o formulário
            contactForm.reset();

            // Faz a mensagem sumir após 3 segundos (3000ms)
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);
        } else {
            // Tratar erros, se o Formspree retornar um erro (ex: validação)
            console.error('Erro ao enviar o formulário para o Formspree:', response.statusText);
            alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
        }
    });
}