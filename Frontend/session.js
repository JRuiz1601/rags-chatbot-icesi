// ========================================
// GESTIÓN DE SESIONES
// ========================================

let currentSessionId = null;

/**
 * Genera un sessionId único usando timestamp + random string
 * Formato: session-{timestamp}-{random}
 */
export function generateSessionId() {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 10);
    return `session-${timestamp}-${randomString}`;
}

/**
 * Inicializa una nueva sesión
 */
export function initNewSession() {
    currentSessionId = generateSessionId();
    console.log('🆔 Nueva sesión creada:', currentSessionId);
    return currentSessionId;
}

/**
 * Obtiene el sessionId actual (crea uno si no existe)
 */
export function getSessionId() {
    if (!currentSessionId) {
        initNewSession();
    }
    return currentSessionId;
}
