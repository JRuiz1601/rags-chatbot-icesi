// ========================================
// GESTIÓN DE MENSAJES Y COMUNICACIÓN CON N8N
// VERSIÓN MEJORADA CON RUTAS RELATIVAS
// ========================================

import { DOM, WEBHOOK_URL } from '/chatbot/config.js';
import { getSessionId } from '/chatbot/session.js';
import { showTypingIndicator, hideTypingIndicator, switchToChat, scrollToBottom, showNotification } from '/chatbot/theme.js';

/**
 * Muestra la barra de progreso
 */
function showProgressBar() {
    let progressBar = document.querySelector('.loading-bar');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'loading-bar';
        document.body.appendChild(progressBar);
    }
    progressBar.classList.add('active');
}

/**
 * Oculta la barra de progreso
 */
function hideProgressBar() {
    const progressBar = document.querySelector('.loading-bar');
    if (progressBar) {
        progressBar.classList.remove('active');
    }
}

/**
 * Escapa HTML para prevenir XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML.replace(/\n/g, '<br>');
}

/**
 * Agrega un mensaje del usuario al DOM
 */
export function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    
    messageDiv.innerHTML = `
        <div class="message-avatar user-avatar">👤</div>
        <div class="message-content">
            <div class="message-text">${escapeHtml(text)}</div>
        </div>
    `;
    
    DOM.messagesContainer.appendChild(messageDiv);
    scrollToBottom();
    
    console.log('👤 Usuario:', text);
}

/**
 * ⌨️ Efecto de escritura progresiva mejorado - rápido y fluido
 */
function typeWriter(element, html, speed = 3) {
    return new Promise((resolve) => {
        // Crear contenedor temporal para obtener el texto sin HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const fullText = tempDiv.textContent || tempDiv.innerText;
        
        // Renderizar HTML completo desde el inicio
        element.innerHTML = html;
        
        // Cursor parpadeante
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '▋';
        
        // Obtener todos los nodos de texto en el elemento
        const getTextNodes = (node) => {
            const textNodes = [];
            const walker = document.createTreeWalker(
                node,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            let n;
            while (n = walker.nextNode()) {
                if (n.textContent.trim()) textNodes.push(n);
            }
            return textNodes;
        };
        
        // Guardar textos originales
        const textNodes = getTextNodes(element);
        const originalTexts = textNodes.map(node => node.textContent);
        
        // Ocultar todo el texto
        textNodes.forEach(node => node.textContent = '');
        
        let currentNodeIndex = 0;
        let currentCharIndex = 0;
        
        function type() {
            if (currentNodeIndex >= textNodes.length) {
                // Terminar - mostrar todo y quitar cursor
                textNodes.forEach((node, i) => node.textContent = originalTexts[i]);
                cursor.remove();
                // Scroll solo al terminar
                scrollToBottom();
                resolve();
                return;
            }
            
            const currentNode = textNodes[currentNodeIndex];
            const currentText = originalTexts[currentNodeIndex];
            
            if (currentCharIndex < currentText.length) {
                // Escribir siguiente carácter
                currentNode.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                
                // Posicionar cursor
                cursor.remove();
                if (currentNode.parentElement) {
                    currentNode.parentElement.appendChild(cursor);
                }
                
                // NO hacer scroll automático - dejar al usuario libre
                
                setTimeout(type, speed);
            } else {
                // Pasar al siguiente nodo
                currentNodeIndex++;
                currentCharIndex = 0;
                setTimeout(type, 1); // Sin delay entre nodos
            }
        }
        
        element.appendChild(cursor);
        setTimeout(type, 150); // Delay inicial reducido
    });
}

/**
 * Agrega un mensaje del bot al DOM con soporte para Markdown y efecto typewriter
 */
export async function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    
    // Convertir Markdown a HTML
    let htmlContent = marked.parse(text);
    
    // Envolver tablas en un contenedor scrollable para móviles
    htmlContent = htmlContent.replace(
        /<table>/g,
        '<div class="table-wrapper" style="overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 1rem 0;"><table>'
    );
    htmlContent = htmlContent.replace(
        /<\/table>/g,
        '</table></div>'
    );
    
    messageDiv.innerHTML = `
        <div class="message-avatar bot-avatar">
            <img src="assets/images/Logo-Icesi.png" alt="ICESI" class="avatar-logo">
        </div>
        <div class="message-content">
            <div class="message-text markdown-content"></div>
        </div>
    `;
    
    DOM.messagesContainer.appendChild(messageDiv);
    
    const messageText = messageDiv.querySelector('.message-text');
    
    // Iniciar efecto typewriter
    await typeWriter(messageText, htmlContent);
    
    console.log('🎓 ICESI Bot:', text);
}

/**
 * Envía un mensaje al backend de N8N
 */
export async function sendMessage(inputElement, buttonElement) {
    const message = inputElement.value.trim();
    if (!message) return;
    
    // 1. Agregar mensaje del usuario
    addUserMessage(message);
    
    // 2. Limpiar y resetear input
    inputElement.value = '';
    inputElement.style.height = 'auto';
    buttonElement.disabled = true;
    
    // 3. Si es el primer mensaje, cambiar a modo chat
    if (DOM.welcomeSection.style.display !== 'none') {
        switchToChat();
    }
    
    // 4. Mostrar typing indicator y activar animación de rotación
    showTypingIndicator();
    showProgressBar();
    
    // Agregar clase thinking al avatar del typing indicator
    const typingAvatar = DOM.typingIndicator.querySelector('.bot-avatar');
    if (typingAvatar) {
        typingAvatar.classList.add('thinking');
    }
    
    try {
        // 5. Llamada al webhook de N8N
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: message,
                sessionId: getSessionId()
            })
        });
        
        // 6. Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // 7. Parsear respuesta JSON
        const data = await response.json();
        
        // 8. Remover clase thinking y ocultar typing indicator
        if (typingAvatar) {
            typingAvatar.classList.remove('thinking');
        }
        hideTypingIndicator();
        hideProgressBar();
        
        // 9. Mostrar respuesta del bot
        if (data.success && data.respuesta) {
            addBotMessage(data.respuesta);
        } else {
            throw new Error('Respuesta inválida del servidor');
        }
        
    } catch (error) {
        // Manejo de errores
        console.error('❌ Error al enviar mensaje:', error);
        
        // Remover clase thinking en caso de error
        if (typingAvatar) {
            typingAvatar.classList.remove('thinking');
        }
        hideTypingIndicator();
        hideProgressBar();
        
        const errorMessage = 'Lo siento, hubo un problema al procesar tu mensaje. Por favor, intenta de nuevo.';
        addBotMessage(errorMessage);
        
        showNotification('Error de conexión');
    }
    
    // 10. Focus en input del footer
    DOM.userInput.focus();
    
    console.log('📤 Mensaje enviado:', message);
    console.log('🆔 Session ID:', getSessionId());
}

/**
 * Copia texto al portapapeles
 */
export function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copiado al portapapeles');
    });
}

