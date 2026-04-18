// ========================================
// ARCHIVO PRINCIPAL - VERSIÓN MEJORADA
// INICIALIZACIÓN Y EVENTOS
// ========================================

import { DOM, PLACEHOLDERS } from '/chatbot/config.js';
import { initNewSession } from '/chatbot/session.js';
import { initTheme, toggleTheme, focusInput, createTooltip, showNotification, hideTypingIndicator } from '/chatbot/theme.js';
import { setupInputListeners, setupPlaceholderAnimation } from '/chatbot/inputs.js';

// ========================================
// INICIALIZACIÓN
// ========================================

/**
 * Inicializa la aplicación cuando carga la página
 */
function init() {
    // Inicializar referencias del DOM
    DOM.init();
    
    // Inicializar tema
    initTheme();
    
    // Crear nueva sesión
    initNewSession();
    
    // Configurar inputs y sugerencias rápidas
    setupInputListeners();
    
    // Configurar animación de placeholders
    setupPlaceholderAnimation(PLACEHOLDERS);
    
    // Configurar tooltips
    createTooltip(DOM.newChatBtn, 'Nuevo chat');
    createTooltip(DOM.themeToggle, 'Cambiar tema');
    
    // Configurar event listeners de botones
    setupEventListeners();
    
    // Configurar atajos de teclado
    setupKeyboardShortcuts();
    
    // Focus en input
    focusInput();
    
    console.log('✅ Chatbot Electivas - Versión Mejorada Inicializada');
    console.log('🎨 Diseño con colores institucionales Universidad Icesi');
    console.log('Shortcuts:');
    console.log('  - Ctrl/Cmd + K: Nuevo chat');
    console.log('  - Ctrl/Cmd + Shift + L: Cambiar tema');
    console.log('  - Enter: Enviar mensaje');
    console.log('  - Shift + Enter: Nueva línea');
}

// ========================================
// EVENT LISTENERS
// ========================================

/**
 * Configura los event listeners principales
 */
function setupEventListeners() {
    // Toggle de tema
    DOM.themeToggle.addEventListener('click', toggleTheme);
    
    // Botón de nuevo chat
    DOM.newChatBtn.addEventListener('click', startNewChat);
}

/**
 * Inicia un nuevo chat (resetea todo)
 */
function startNewChat() {
    // Generar nuevo sessionId
    initNewSession();
    
    // Limpiar mensajes
    DOM.messagesContainer.innerHTML = '';
    DOM.messagesContainer.classList.remove('active');
    DOM.chatMain.classList.remove('chat-mode');
    
    // Ocultar typing indicator
    hideTypingIndicator();
    
    // Resetear inputs
    DOM.centeredInput.value = '';
    DOM.userInput.value = '';
    DOM.centeredInput.style.height = 'auto';
    DOM.userInput.style.height = 'auto';
    
    // Deshabilitar botones
    DOM.centeredSendBtn.disabled = true;
    DOM.sendBtn.disabled = true;
    
    // Mostrar welcome screen con sugerencias
    DOM.welcomeSection.style.display = 'block';
    DOM.inputFooter.style.display = 'none';
    
    // Mostrar sugerencias rápidas
    if (DOM.quickSuggestions) {
        DOM.quickSuggestions.style.display = 'flex';
    }
    
    // Scroll al inicio
    DOM.chatMain.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Focus en input centrado
    setTimeout(() => {
        DOM.centeredInput.focus();
    }, 300);
    
    // Notificación
    showNotification('Nuevo chat iniciado');
    
    console.log('🔄 Chat reseteado - Versión Mejorada');
}

/**
 * Configura los atajos de teclado
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K = Nuevo chat
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            startNewChat();
        }
        
        // Ctrl/Cmd + Shift + L = Toggle tema
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

// ========================================
// INICIAR APLICACIÓN
// ========================================

window.addEventListener('load', init);

console.log('✅ Chatbot Electivas - Versión Mejorada - Script cargado correctamente');
console.log('🎨 Con diseño institucional Universidad Icesi');

