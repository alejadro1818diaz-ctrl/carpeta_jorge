// Variable global para guardar el estado del cálculo actual
let liquidacionActual = null;

function mostrarError(mensaje) {
    const errorDiv = document.getElementById('error');
    if(mensaje) {
        errorDiv.innerText = mensaje;
        errorDiv.style.display = 'block';
    } else {
        errorDiv.style.display = 'none';
    }
}

function validarHorario(fecha) {
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    
    // El horario permitido según el taller es de 5:00 am a 12:00 pm (Mediodía)
    const minutosTotales = hora * 60 + minutos;
    const inicioPermitido = 5 * 60;  // 5:00 AM
    const finPermitido = 12 * 60;   // 12:00 PM

    return (minutosTotales >= inicioPermitido && minutosTotales <= finPermitido);
}

function calcularCobro() {
    mostrarError(null);
    document.getElementById('resultados').style.display = 'none';
    document.getElementById('seccionPago').style.display = 'none';
    document.getElementById('vueltasContainer').style.display = 'none';

    // 1. Captura de Datos
    const tipoVehiculo = document.getElementById('tipoVehiculo').value;
    const placa = document.getElementById('placa').value.trim().toUpperCase();
    const ingresoInput = document.getElementById('ingreso').value;
    const salidaInput = document.getElementById('salida').value;
    const aplicaPicoPlaca = document.getElementById('picoPlaca').value === 'si';

    // 2. Validación de todos los datos de entrada
    if (!placa || !ingresoInput || !salidaInput) {
        mostrarError("Por favor, complete todos los campos obligatorios.");
        return;
    }

    const fechaIngreso = new Date(ingresoInput);
    const fechaSalida = new Date(salidaInput);

    if (fechaSalida <= fechaIngreso) {
        mostrarError("La fecha y hora de salida debe ser posterior a la de ingreso.");
        return;
    }

    // Validación de Horario (5:00 am a 12:00 pm)
    if (!validarHorario(fechaIngreso) || !validarHorario(fechaSalida)) {
        mostrarError("Error: El parqueadero solo opera en el horario de 5:00 am a 12:00 pm.");
        return;
    }

    // 3. Cálculo de Tiempo en Minutos y Horas
    const diferenciaMs = fechaSalida - fechaIngreso;
    const tiempoMinutos = Math.floor(diferenciaMs / (1000 * 60));
    const tiempoHoras = (tiempoMinutos / 60).toFixed(2);

    // 4. Cálculo de Tarifas ($125/min auto, $95/min moto)
    const tarifaMinuto = (tipoVehiculo === 'Automóvil') ? 125 : 95;
    let valorBase = tiempoMinutos * tarifaMinuto;

    // 5. Aplicar Descuento de Pico y Placa (25% solo para Automóviles)
    let descuento = 0;
    if (tipoVehiculo === 'Automóvil' && aplicaPicoPlaca) {
        descuento = valorBase * 0.25;
    }
    let valorConDescuento = valorBase - descuento;

    // 6. Ajuste a múltiplo de 50 a favor del parqueadero (Redondeo hacia arriba)
    let valorPagar = Math.ceil(valorConDescuento / 50) * 50;

    // Guardar estado de la liquidación actual
    liquidacionActual = {
        fecha: fechaIngreso.toLocaleDateString(),
        tipoVehiculo: tipoVehiculo,
        placaVehiculo: placa,
        tiempoParqueadoHoras: parseFloat(tiempoHoras),
        valorPagar: valorPagar,
        tiempoMinutos: tiempoMinutos,
        valorBase: valorBase,
        descuento: descuento
    };

    // Mostrar interfaz de resultados
    document.getElementById('resTiempo').innerText = tiempoMinutos;
    document.getElementById('resHoras').innerText = tiempoHoras;
    document.getElementById('resValorBase').innerText = valorBase.toLocaleString('es-CO');
    document.getElementById('resDescuento').innerText = descuento.toLocaleString('es-CO');
    document.getElementById('resValorFinal').innerText = valorPagar.toLocaleString('es-CO');
    
    document.getElementById('resultados').style.display = 'block';
    document.getElementById('seccionPago').style.display = 'block';
}

function procesarPago() {
    mostrarError(null);
    const dineroIngresado = parseInt(document.getElementById('dineroIngresado').value);
    const valorPagar = liquidacionActual.valorPagar;

    if (isNaN(dineroIngresado) || dineroIngresado < valorPagar) {
        mostrarError(`El dinero ingresado debe ser igual o mayor al valor a pagar ($${valorPagar.toLocaleString('es-CO')}).`);
        return;
    }

    let cambio = dineroIngresado - valorPagar;
    document.getElementById('resCambio').innerText = cambio.toLocaleString('es-CO');

    // Desglose exacto de billetes y monedas del sistema monetario
    let restante = cambio;
    const denominaciones = [
        { nombre: "Billetes de $50.000", valor: 50000 },
        { nombre: "Billetes de $20.000", valor: 20000 },
        { nombre: "Billetes de $10.000", valor: 10000 },
        { nombre: "Billetes de $5.000", valor: 5000 },
        { nombre: "Billetes de $2.000", valor: 2000 },
        { nombre: "Billetes de $1.000", valor: 1000 },
        { nombre: "Monedas de $500", valor: 500 },
        { nombre: "Monedas de $50", valor: 50 } // Única moneda de cambio según la observación
    ];

    let htmlVueltas = "";
    denominaciones.forEach(d => {
        if (restante >= d.valor) {
            let cantidad = Math.floor(restante / d.valor);
            restante %= d.valor;
            htmlVueltas += `<p>• ${cantidad}x ${d.nombre}</p>`;
        }
    });

    if(cambio === 0) {
        htmlVueltas = "<p>Pago exacto. No se requiere cambio.</p>";
    }

    document.getElementById('desgloseVueltas').innerHTML = htmlVueltas;
    document.getElementById('vueltasContainer').style.display = 'block';

    // Descargar el archivo JSON con los datos estructurados
    descargarJSON(liquidacionActual);
}

function descargarJSON(objetoData) {
    const jsonEstructura = {
        "Fecha": objetoData.fecha,
        "Tipo de vehículo": objetoData.tipoVehiculo,
        "Placa del vehículo": objetoData.placaVehiculo,
        "Tiempo que permaneció parqueado (en horas)": objetoData.tiempoParqueadoHoras,
        "Valor a pagar": objetoData.valorPagar
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonEstructura, null, 4));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `recibo_${objetoData.placaVehiculo}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}