// ========================================
// GESTIÓN DE TEMAS Y UI - VERSIÓN MEJORADA
// ========================================

import { DOM } from '/chatbot/config.js';

/**
 * Inicializa el tema desde localStorage
 */
export function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

/**
 * Alterna entre tema claro y oscuro
 */
export function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

/**
 * Muestra el indicador de escritura (typing)
 */
export function showTypingIndicator() {
    DOM.typingIndicator.style.display = 'flex';
    scrollToBottom();
}

/**
 * Oculta el indicador de escritura
 */
export function hideTypingIndicator() {
    DOM.typingIndicator.style.display = 'none';
}

/**
 * Scroll suave al final de los mensajes
 */
export function scrollToBottom(smooth = true) {
    if (smooth) {
        DOM.chatMain.scrollTo({
            top: DOM.chatMain.scrollHeight,
            behavior: 'smooth'
        });
    } else {
        DOM.chatMain.scrollTop = DOM.chatMain.scrollHeight;
    }
}

/**
 * Cambia de welcome screen a modo chat
 */
export function switchToChat() {
    DOM.welcomeSection.style.display = 'none';
    DOM.inputFooter.style.display = 'block';
    DOM.messagesContainer.classList.add('active');
    DOM.chatMain.classList.add('chat-mode');
}

/**
 * Gestiona el foco en el input apropiado
 */
export function focusInput() {
    if (DOM.welcomeSection.style.display !== 'none') {
        DOM.centeredInput.focus();
    } else {
        DOM.userInput.focus();
    }
}

/**
 * Crea y muestra un tooltip
 */
export function createTooltip(element, text) {
    let tooltip = null;
    let showTimeout = null;
    let hideTimeout = null;
    
    const removeTooltip = () => {
        if (showTimeout) {
            clearTimeout(showTimeout);
            showTimeout = null;
        }
        
        hideTimeout = setTimeout(() => {
            if (tooltip) {
                tooltip.classList.remove('show');
                setTimeout(() => {
                    if (tooltip && tooltip.parentNode) {
                        tooltip.remove();
                    }
                    tooltip = null;
                }, 200);
            }
        }, 100);
    };
    
    const showTooltip = () => {
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
        
        if (tooltip) return; // Ya existe
        
        showTimeout = setTimeout(() => {
            tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = text;
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.bottom + 4 + 'px'; // Reducido de 8 a 4px
            
            setTimeout(() => {
                if (tooltip) tooltip.classList.add('show');
            }, 10);
        }, 300); // Delay de 300ms antes de mostrar
    };
    
    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', removeTooltip);
    element.addEventListener('click', removeTooltip);
}

/**
 * Muestra una notificación temporal
 */
export function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

/**
 * Detecta si es dispositivo móvil
 */
export function isMobile() {
    return window.innerWidth <= 768;
}

