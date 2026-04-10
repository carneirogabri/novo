// Seleciona os elementos do carrossel
const carousel = document.querySelector('.carousel-container');
const nextBtn = document.getElementById('next-doctor');
const prevBtn = document.getElementById('prev-doctor');

// Configuração de quanto o carrossel pula (tamanho do card + gap)
const scrollAmount = 330; 

// Função para Avançar
nextBtn.addEventListener('click', () => {
    // Verifica se chegou no final do scroll
    const isAtEnd = carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 10;

    if (isAtEnd) {
        // Se estiver no fim, volta para o começo (Efeito Infinito)
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
        // Senão, avança normalmente
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
});

// Função para Voltar
prevBtn.addEventListener('click', () => {
    // Verifica se está no início
    if (carousel.scrollLeft <= 0) {
        // Se estiver no início, pula para o final (Efeito Infinito Reverso)
        carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' });
    } else {
        // Senão, volta normalmente
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
});

const steps = document.querySelectorAll('.step');
const mainBtn = document.getElementById('mainBtn');
const tabSignIn = document.getElementById('tabSignIn');
const tabSignUp = document.getElementById('tabSignUp');
const authTabs = document.getElementById('authTabs');

let currentStep = 1;
let isSignUpMode = false;

// Alternar entre abas
tabSignUp.addEventListener('click', () => {
    isSignUpMode = true;
    resetFlow();
    tabSignUp.classList.add('tab-active');
    tabSignIn.classList.remove('tab-active');
    document.getElementById('mainTitle').innerText = "Crie sua conta";
    document.getElementById('mainSubtitle').innerText = "Etapa 1 de 5: Credenciais";
    document.getElementById('loginPassContainer').style.display = "none";
    document.getElementById('socialSeparator').style.display = "none";
    document.getElementById('socialButtons').style.display = "none";
    mainBtn.innerText = "Próximo";
});

tabSignIn.addEventListener('click', () => {
    isSignUpMode = false;
    resetFlow();
    tabSignIn.classList.add('tab-active');
    tabSignUp.classList.remove('tab-active');
    document.getElementById('mainTitle').innerText = "Welcome Back Creative!";
    document.getElementById('mainSubtitle').innerText = "We Are Happy To See You Again";
    document.getElementById('loginPassContainer').style.display = "block";
    document.getElementById('socialSeparator').style.display = "flex";
    document.getElementById('socialButtons').style.display = "grid";
    mainBtn.innerText = "Login";
});

function resetFlow() {
    currentStep = 1;
    steps.forEach(s => s.classList.remove('active'));
    steps[0].classList.add('active');
}

mainBtn.addEventListener('click', () => {
    if (!isSignUpMode) {
        // Lógica de Login Simples
        const pass = document.getElementById('fieldPassword').value;
        if(pass === '123456') window.location.href = 'index.html';
        else document.getElementById('authError').innerText = "Senha incorreta (123456)";
        return;
    }

    // Lógica de Cadastro (5 Etapas)
    if (currentStep < 5) {
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Conta criada com sucesso!");
        window.location.href = 'index.html';
    }
});

function showStep(s) {
    steps.forEach(step => step.classList.remove('active'));
    document.querySelector(`[data-step="${s}"]`).classList.add('active');
    
    document.getElementById('mainSubtitle').innerText = `Etapa ${s} de 5`;

    if (s === 5) {
        mainBtn.innerText = "Confirmar e Criar Conta";
        // Preencher Resumo
        document.getElementById('summaryEmail').innerText = document.getElementById('fieldEmail').value;
        document.getElementById('summaryCPF').innerText = document.getElementById('fieldCPF').value;
        document.getElementById('summaryPhone').innerText = document.getElementById('fieldPhone').value;
        document.getElementById('summaryPlan').innerText = document.getElementById('fieldHealthPlan').value;
        document.getElementById('summaryCard').innerText = document.getElementById('fieldCardNumber').value;
    } else {
        mainBtn.innerText = "Próximo";
    }
}

// Navegação suave e atualização do estado dos radios
document.addEventListener('DOMContentLoaded', function() {
    const radios = document.querySelectorAll('.radio-inputs .radio input');
    const sections = {
        '#home': 'home',
        '#sobre': 'sobre',
        '#servicos': 'servicos',
        '#doutores': 'doutores',
        '#depoimentos': 'depoimentos',
        '#duvidas': 'duvidas'
    };

    // Função para marcar o radio correspondente à seção visível
    function setActiveRadio() {
        let activeSection = null;
        for (const [selector, value] of Object.entries(sections)) {
            const section = document.querySelector(selector);
            if (section) {
                const rect = section.getBoundingClientRect();
                // Considera a seção ativa se seu topo estiver próximo ao topo da viewport
                if (rect.top <= 150 && rect.bottom >= 150) {
                    activeSection = value;
                    break;
                }
            }
        }
        if (activeSection) {
            const radioToCheck = document.querySelector(`.radio-inputs .radio input[value="${activeSection}"]`);
            if (radioToCheck && !radioToCheck.checked) {
                radioToCheck.checked = true;
            }
        }
    }

    // Escuta a rolagem para atualizar o radio ativo
    window.addEventListener('scroll', setActiveRadio);
    setActiveRadio(); // chamada inicial

    // Adiciona evento de clique em cada radio para rolar suavemente até a seção
    radios.forEach(radio => {
        radio.addEventListener('change', function(e) {
            if (this.checked) {
                const targetValue = this.value;
                let targetSelector = null;
                for (const [selector, value] of Object.entries(sections)) {
                    if (value === targetValue) {
                        targetSelector = selector;
                        break;
                    }
                }
                if (targetSelector) {
                    const targetElement = document.querySelector(targetSelector);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    });
});