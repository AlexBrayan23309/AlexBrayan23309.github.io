// ===== VALIDACIONES PARA BÚSQUEDA DE PASAJES =====
function validarOrigen(origen) {
    const origenLimpio = origen.trim();

    if (!origenLimpio) {
        return "El origen es requerido.";
    }
    if (origenLimpio.length < 2) {
        return "El origen debe tener al menos 2 caracteres.";
    }
    return null;
}
function validarDestino(destino) {
    const destinoLimpio = destino.trim();

    if (!destinoLimpio) {
        return "El destino es requerido.";
    }
    if (destinoLimpio.length < 2) {
        return "El destino debe tener al menos 2 caracteres.";
    }
    return null;
}
function validarFecha(fecha) {
    if (!fecha) {
        return "La fecha es requerida.";
    }
    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
        return "La fecha no puede ser anterior a hoy.";
    }
    return null;
}
function validarOrigenDestinoDiferentes(origen, destino) {
    const origenLimpio = origen.trim().toLowerCase();
    const destinoLimpio = destino.trim().toLowerCase();

    // Si ambos están vacíos o solo uno está vacío, es válido
    // Solo valida si AMBOS tienen contenido
    if (origenLimpio && destinoLimpio && origenLimpio === destinoLimpio) {
        return "El origen y destino no pueden ser iguales.";
    }

    return null;
}

function validarOrigenDestino(origen, destino) {
    const origenLimpio = origen.trim().toLowerCase();
    const destinoLimpio = destino.trim().toLowerCase();

    if (origenLimpio === destinoLimpio) {
        return "El origen y destino no pueden ser iguales.";
    }

    return null;
}

function validarPasajeros(pasajeros) {
    if (!pasajeros) {
        return "Debes seleccionar la cantidad de pasajeros.";
    }
    const cantidad = parseInt(pasajeros);
    if (cantidad < 1 || cantidad > 5) {
        return "La cantidad de pasajeros debe estar entre 1 y 5.";
    }
    return null;
}

function validarBusquedaPasajes(origen, destino, fecha, pasajeros) {
    const errorOrigen = validarOrigen(origen);
    if (errorOrigen) return crearResultadoValidacion(errorOrigen);

    const errorDestino = validarDestino(destino);
    if (errorDestino) return crearResultadoValidacion(errorDestino);

    const errorOrigenDestino = validarOrigenDestinoDiferentes(origen, destino);
    if (errorOrigenDestino) return crearResultadoValidacion(errorOrigenDestino);

    const errorFecha = validarFecha(fecha);
    if (errorFecha) return crearResultadoValidacion(errorFecha);

    const errorPasajeros = validarPasajeros(pasajeros);
    if (errorPasajeros) return crearResultadoValidacion(errorPasajeros);

    return crearResultadoValidacion(null);
}

function crearResultadoValidacion(error) {
    return error ? { valido: false, mensaje: error } : { valido: true, mensaje: "" };
}

// ===== VALIDACIONES PARA EMAIL =====
function validarEmail(email) {
    const emailLimpio = email.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailLimpio) {
        return "El correo electrónico es requerido.";
    }

    if (!regexEmail.test(emailLimpio)) {
        return "Por favor, ingresa un correo electrónico válido.";
    }

    return null;
}

// ===== VALIDACIONES PARA CONTRASEÑA =====

function validarPassword(password) {
    if (!password) {
        return "La contraseña es requerida.";
    }
    if (password.length < 8) {
        return "La contraseña debe tener al menos 8 caracteres.";
    }
    return null;
}

function validarConfirmPassword(password, confirmar) {
    if (!confirmar) {
        return "Debes confirmar tu contraseña.";
    }

    if (password !== confirmar) {
        return "Las contraseñas no coinciden.";
    }

    return null;
}
// ===== VALIDACIONES PARA NOMBRE =====
function validarNombreCompleto(nombre) {
    const nombreLimpio = nombre.trim();

    if (!nombreLimpio) {
        return "El nombre completo es requerido.";
    }
    if (nombreLimpio.length < 3) {
        return "El nombre debe tener al menos 3 caracteres.";
    }
    if (nombreLimpio.length > 100) {
        return "El nombre no puede exceder 100 caracteres.";
    }
    return null;
}
// ===== VALIDACIONES PARA LOGIN =====
function validarLogin(email, password) {
    const errorEmail = validarEmail(email);
    if (errorEmail) return crearResultadoValidacion(errorEmail);

    const errorPassword = validarPassword(password);
    if (errorPassword) return crearResultadoValidacion(errorPassword);

    return crearResultadoValidacion(null);
}
// ===== VALIDACIONES PARA REGISTRO =====
function validarRegistro(nombre, email, password, confirmar) {
    const errorNombre = validarNombreCompleto(nombre);
    if (errorNombre) return crearResultadoValidacion(errorNombre);

    const errorEmail = validarEmail(email);
    if (errorEmail) return crearResultadoValidacion(errorEmail);

    const errorPassword = validarPassword(password);
    if (errorPassword) return crearResultadoValidacion(errorPassword);

    const errorConfirm = validarConfirmPassword(password, confirmar);
    if (errorConfirm) return crearResultadoValidacion(errorConfirm);

    return crearResultadoValidacion(null);
}
// ===== FUNCIÓN AUXILIAR PARA MOSTRAR ERRORES =====
function intercambiarCiudades(origenEl, destinoEl) {
    const origenInput = typeof origenEl === 'string' ? document.getElementById(origenEl) : origenEl;
    const destinoInput = typeof destinoEl === 'string' ? document.getElementById(destinoEl) : destinoEl;

    if (!origenInput || !destinoInput) return false;

    const temp = origenInput.value;
    origenInput.value = destinoInput.value;
    destinoInput.value = temp;
    return true;
}

function _dispatchInputChange(el) {
    if (!el) return;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
}

/**
 * Vincula un botón para intercambiar las ciudades del origen y destino.
 * Llama a `intercambiarCiudades` y opcionalmente despacha eventos y pone foco.
 */
function bindIntercambiarBoton(btnEl, origenEl, destinoEl, options = {}) {
    const btn = typeof btnEl === 'string' ? document.getElementById(btnEl) : btnEl;
    const origenInput = typeof origenEl === 'string' ? document.getElementById(origenEl) : origenEl;
    const destinoInput = typeof destinoEl === 'string' ? document.getElementById(destinoEl) : destinoEl;

    if (!btn || !origenInput || !destinoInput) return false;

    const { dispatchEvents = true, focusAfter = null } = options;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const ok = intercambiarCiudades(origenInput, destinoInput);
        if (!ok) return;
        if (dispatchEvents) {
            _dispatchInputChange(origenInput);
            _dispatchInputChange(destinoInput);
        }
        if (focusAfter === 'origen') origenInput.focus();
        else if (focusAfter === 'destino') destinoInput.focus();
    });

    return true;
}

/**
 * Muestra un mensaje de error en un elemento específico
 */
function mostrarError(idElemento, mensaje) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.classList.add("visible");
    }
}
/**
 * Limpia el mensaje de error de un elemento
 */
function limpiarError(idElemento) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = "";
        elemento.classList.remove("visible");
    }
}
