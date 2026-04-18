// ========================================
// GESTIÓN DE INPUTS - VERSIÓN MEJORADA
// ========================================

import { DOM } from '/chatbot/config.js';
import { sendMessage } from '/chatbot/messages.js';

/**
 * Actualiza el estado del botón de envío
 */
export function updateSendButtonState(input, button) {
    const text = input.value.trim();
    button.disabled = text.length === 0;
}

/**
 * Auto-redimensiona el textarea mientras se escribe
 */
export function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
}

/**
 * ✨ Maneja el click en las sugerencias rápidas
 */
export function setupQuickSuggestions() {
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const suggestion = chip.getAttribute('data-suggestion');
            if (suggestion) {
                // Colocar la sugerencia en el input centrado
                DOM.centeredInput.value = suggestion;
                
                // Actualizar el botón de envío
                updateSendButtonState(DOM.centeredInput, DOM.centeredSendBtn);
                
                // Auto-resize del textarea
                autoResizeTextarea(DOM.centeredInput);
                
                // Focus en el input
                DOM.centeredInput.focus();
                
                // Opcionalmente, enviar automáticamente
                // sendMessage(DOM.centeredInput, DOM.centeredSendBtn);
            }
        });
    });
}

/**
 * Configura los event listeners para los inputs
 */
export function setupInputListeners() {
    // Event listeners para el input centrado (welcome screen)
    DOM.centeredInput.addEventListener('input', () => {
        updateSendButtonState(DOM.centeredInput, DOM.centeredSendBtn);
        autoResizeTextarea(DOM.centeredInput);
    });

    // Event listeners para el input del footer (chat activo)
    DOM.userInput.addEventListener('input', () => {
        updateSendButtonState(DOM.userInput, DOM.sendBtn);
        autoResizeTextarea(DOM.userInput);
    });

    // Manejo del teclado virtual en móviles (mejorado para iOS)
    const handleMobileKeyboard = (input) => {
        // Detectar iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        if (isIOS) {
            // En iOS, usar un enfoque diferente
            setTimeout(() => {
                // Scroll al contenedor principal
                const appContainer = document.querySelector('.app-container');
                const chatMain = document.querySelector('.chat-main');
                
                if (appContainer && chatMain) {
                    // Asegurar que el input esté visible
                    input.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
                }
            }, 100);
        } else {
            // Android y otros
            setTimeout(() => {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    };

    DOM.centeredInput.addEventListener('focus', () => handleMobileKeyboard(DOM.centeredInput));
    DOM.userInput.addEventListener('focus', () => handleMobileKeyboard(DOM.userInput));

    // Prevenir zoom en iOS al hacer focus
    const preventIOSZoom = (e) => {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            setTimeout(() => {
                viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
            }, 500);
        }
    };

    DOM.centeredInput.addEventListener('focus', preventIOSZoom);
    DOM.userInput.addEventListener('focus', preventIOSZoom);

    // Enter para enviar (Shift+Enter para nueva línea) - Input centrado
    DOM.centeredInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!DOM.centeredSendBtn.disabled) {
                sendMessage(DOM.centeredInput, DOM.centeredSendBtn);
            }
        }
    });

    // Enter para enviar (Shift+Enter para nueva línea) - Input footer
    DOM.userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!DOM.sendBtn.disabled) {
                sendMessage(DOM.userInput, DOM.sendBtn);
            }
        }
    });

    // Click en botones de envío
    DOM.centeredSendBtn.addEventListener('click', () => {
        sendMessage(DOM.centeredInput, DOM.centeredSendBtn);
    });

    DOM.sendBtn.addEventListener('click', () => {
        sendMessage(DOM.userInput, DOM.sendBtn);
    });

    // ✨ Configurar sugerencias rápidas
    setupQuickSuggestions();
}

/**
 * Anima los placeholders del input centrado
 */
export function setupPlaceholderAnimation(placeholders) {
    let lastPlaceholderIndex = -1;

    function getRandomPlaceholder() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * placeholders.length);
        } while (newIndex === lastPlaceholderIndex);
        
        lastPlaceholderIndex = newIndex;
        return placeholders[newIndex];
    }

    function animatePlaceholder() {
        const input = DOM.centeredInput.value.length === 0 ? DOM.centeredInput : null;
        if (!input) return;
        
        input.style.opacity = '0.5';
        
        setTimeout(() => {
            input.placeholder = getRandomPlaceholder();
            input.style.opacity = '1';
        }, 300);
    }

    // Cambiar placeholder cada 8 segundos
    setInterval(animatePlaceholder, 8000);
}

