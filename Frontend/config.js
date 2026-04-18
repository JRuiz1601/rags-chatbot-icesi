// ========================================
// CONFIGURACIÓN GLOBAL - VERSIÓN MEJORADA
// ========================================

// URL del webhook de N8N
export const WEBHOOK_URL = 'https://n8n.srv1057844.hstgr.cloud/webhook/chatbot-electivas';

// ⚠️ NOTA: Si estás probando localmente, las rutas de imágenes son relativas
// Para VPS: Cambiar a assets/images/Logo-Icesi.png

// Placeholders animados para el input
export const PLACEHOLDERS = [
    'Electivas sobre inteligencia artificial...',
    'Materias los martes por la tarde...',
    'Cursos de 3 créditos disponibles...',
    'Electivas de sostenibilidad ambiental...',
    'Materias sin prerequisitos...',
    'Cursos dictados por el profesor González...',
    'Electivas virtuales de programación...',
    'Materias de diseño y creatividad...',
    'Cursos con evaluación por proyectos...',
    'Electivas de desarrollo web...',
    'Materias sobre blockchain y criptomonedas...',
    'Cursos de análisis de datos...',
    'Electivas los jueves en la mañana...',
    'Materias de negocios y emprendimiento...',
    'Cursos sobre machine learning...',
    'Electivas de marketing digital...',
    'Materias con metodología activa...',
    'Cursos sobre ciberseguridad...',
    'Electivas de innovación social...',
    'Materias del departamento de ingeniería...'
];

// ✨ SUGERENCIAS RÁPIDAS (Basadas en electivas reales)
export const QUICK_SUGGESTIONS = [
    {
        label: 'Clases en la tarde',
        query: 'Electivas que empiezan después de las 4pm'
    },
    {
        label: 'Electivas virtuales',
        query: 'Muéstrame las electivas con horario virtual'
    },
    {
        label: 'Tecnología e IA',
        query: 'Electivas sobre tecnología e inteligencia artificial'
    },
    {
        label: 'Sostenibilidad',
        query: 'Electivas de sostenibilidad y medio ambiente'
    }
];

// Elementos del DOM
export const DOM = {
    // Botones
    themeToggle: null,
    newChatBtn: null,
    centeredSendBtn: null,
    sendBtn: null,
    
    // Inputs
    centeredInput: null,
    userInput: null,
    
    // Secciones
    welcomeSection: null,
    messagesContainer: null,
    inputFooter: null,
    typingIndicator: null,
    chatMain: null,
    quickSuggestions: null,
    
    // Inicializar referencias del DOM
    init() {
        this.themeToggle = document.getElementById('themeToggle');
        this.newChatBtn = document.getElementById('newChatBtn');
        this.centeredSendBtn = document.getElementById('centeredSendBtn');
        this.sendBtn = document.getElementById('sendBtn');
        this.centeredInput = document.getElementById('centeredInput');
        this.userInput = document.getElementById('userInput');
        this.welcomeSection = document.getElementById('welcomeSection');
        this.messagesContainer = document.getElementById('messagesContainer');
        this.inputFooter = document.getElementById('inputFooter');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.chatMain = document.querySelector('.chat-main');
        this.quickSuggestions = document.getElementById('quickSuggestions');
    }
};

