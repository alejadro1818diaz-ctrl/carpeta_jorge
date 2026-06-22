//EJERCICIO NUMERO 1
let opcion = parseInt(prompt(
    "===== MENÚ DE EJERCICIOS =====\n" +
    "1. Conversión de unidades\n" +
    "2. Operaciones con número de 6 cifras\n" +
    "3. Incrementar un segundo a una hora\n" +
    "4. Ecuación cuadrática\n" +
    "5. Venta de huevos\n" +
    "6. Calcular X y N\n" +
    "7. Clasificación de deportes\n" +
    "8. Validación de contraseña\n" +
    "9. Conteo de números pares\n" +
    "10. Día de la semana\n" +
    "11. Suma de arreglo\n" +
    "12. Conteo de pares e impares\n" +
    "13. Radar de aeronaves\n" +
    "14. Temperatura\n" +
    "0. Salir\n\n" +
    "Seleccione una opción:"
));

switch(opcion){

    case 1:{
        let unidad, cantidad, m, km, mt;
        unidad = parseInt(prompt('Digite 1 para Millas - 2 para Kilometros - 3 para Metros'));
        cantidad = prompt('Digite el valor a convertir');
        switch (unidad){

            case 1:
                km = cantidad * 1.6093;
                mt = cantidad * 1609.34;
                document.write(cantidad + ' Millas, equivalen a ' + km + ' Kilometros, y a '+ mt + ' Metros');
                break;
            case 2:
                m = cantidad * 0.621371;
                mt = cantidad * 1000;
                document.write(cantidad + 'Kilometros, equivalen a ' + m + 'Millas, y a ' + mt + 'Metros');
                break;
            case 3:
                m = cantidad * 0.000621371;
                km = cantidad / 1000;
                document.write(cantidad + 'Metros equivalen a ' + m + 'Millas, y a ' + km + 'Kilometros');
                break;
            default:
                document.write('Valor Incorrecto');
                break;  
        }
        break;
/// EJERCICIO NUMERO 2
    }
    case 2:{

        let d1, d2, d3, d4, d5, d6, num, coc;
        num = parseInt(prompt('Digite un numero de 6 cifras'));
        d6 = num % 10;
        coc = Math.trunc(num / 10);
        d5 = coc % 10;
        coc = Math.trunc(coc / 10);
        d4 = coc % 10;
        coc = Math.trunc(coc / 10);
        d3 = coc % 10;
        coc = Math.trunc(coc / 10);
        d2 = coc % 10;
        coc = Math.trunc(coc / 10);
        d1 = coc % 10;
        coc = Math.trunc(coc / 10);

        document.write('La suma de una de las cifras centrales son: ' + (d3+d4));
        document.write('La multiplicacion es: ' + (d1*d6));
        document.write('La resta es: ' + (d2-d5));
        break;
///EJERCICIO NUMERO 3
    }
    case 3:{

    let h = Number(prompt("Ingrese la hora"));
    let m = Number(prompt("Ingrese los minutos"));
    let s = Number(prompt("Ingrese los segundos"));

    s++;

    if (s >= 60) {
        s = 0;
        m++;
    }

    if (m >= 60) {
        m = 0;
        h++;
    }

    if (h >= 24) {
        h = 0;
    }

    document.write(`La nueva hora es: ${h}:${m}:${s}`);

    break;
}
///EJERCICIO NUMERO 4
    case 4:{

        let a = parseInt(prompt('Ingrese el valor de a: '));
        let b = parseInt(prompt('Ingrese el valor de b: '));
        let c = parseInt(prompt('Ingrese el valor de c: '));

        let discriminante = (b * b) - (4 * a * c);
        let opcion = 1;

        switch(opcion){
            case 1:
                if (discriminante > 0){
                    let x1 = (-b + discriminante ** (1/2)) / (2 * a);
                    let x2 = (-b - discriminante ** (1/2)) / (2 * a);
                    
                    document.write('Hay dos soluciones reales <br>');
                    document.write('x1 = ' + x1 + '<br>');
                    document.write('x2 = ' + x2);
                }

                if (discriminante == 0){
                    let x = (-b) / (2 * a);
                    document.write('Hay unicamente una solucion <br>');
                    document.write('x = ' + x);
                }

                if (discriminante < 0){
                    document.write('Hay dos soluciones no reales');
                }
                break;
        }
        
        break;
    }
///EJERCICIO NUMERO 5
    case 5:{

        let continuar = true;

        while (continuar) {

            let cantidad = parseInt(prompt("Ingrese la cantidad de huevos:"));
            let tipo = prompt("Ingrese el tipo de huevo (A, AA o AAA)");
            let dia = prompt("Ingrese el día de la compra");
            let frecuente = prompt("¿El cliente es frecuente? (si/no)");

            let precio = 0;

            if (tipo === "A") {
                precio = 600;

            } else if (tipo === "AA") {
                precio = 700;

            } else if (tipo === "AAA") {
                precio = 750;

            } else {
                alert("Tipo de huevo incorrecto");
                continue;
            }

            let subtotal = cantidad * precio;
            let descuento = 0;

            if (cantidad >= 30 && cantidad <= 45) {
                descuento = descuento + 0.10;

            } else if (cantidad >= 46 && cantidad <= 70) {
                descuento = descuento + 0.15;

            } else if (cantidad >= 71 && cantidad <= 100) {
                descuento = descuento + 0.20;

            } else if (cantidad > 100) {
                descuento = descuento + 0.25;
            }

            if (frecuente === "si") {
                descuento = descuento + 0.025;
            }

            let total = subtotal - (subtotal * descuento);

            if (
                dia === "lunes" ||
                dia === "martes" ||
                dia === "miercoles" ||
                dia === "miércoles" ||
                dia === "jueves" ||
                dia === "viernes"
            ) {

                total = total + (total * 0.05);

            } else if (dia === "sabado" || dia === "sábado") {

                total = total - (total * 0.05);

            } else if (dia === "domingo") {

            } else {
                alert("Día inválido");
                continue;
            }

            alert(
                "Subtotal: $" + subtotal +
                "\nDescuento: " + (descuento * 100) + "%" +
                "\nTotal a pagar: $" + total
            );

            let respuesta = prompt("¿Desea realizar otra compra? (si/no)");

            if (respuesta === "no") {
                continuar = false;
                alert("Gracias por su compra, que tenga buen dia");
            }
        }
        break;
    }
///EJERCICIO NUMERO 6
    case 6:{

        let n = parseInt(prompt("Ingrese el valor de N"));
        let x = parseInt(prompt("Ingrese el valor de X"));

        let suma = 0;
        let exponente = 2;

        while (exponente <= n) {

            suma = suma + (x ** exponente) / exponente;

            exponente = exponente + 2;
        }

        alert("El resultado de la suma es: " + suma);
        break;
    }
///EJERCICIO NUMERO 7
    case 7:{

    let ajedrez = Number(prompt("Personas en ajedrez"));
    let atletismo = Number(prompt("Personas en atletismo"));
    let futbol = Number(prompt("Personas en fútbol"));
    let gimnasia = Number(prompt("Personas en gimnasia"));
    let natacion = Number(prompt("Personas en natación"));

    let totalParticipantes =
        ajedrez + atletismo + futbol + gimnasia + natacion;

    if (totalParticipantes === 400) {

        document.write(`
            Ajedrez: ${ajedrez}<br>
            Atletismo: ${atletismo}<br>
            Fútbol: ${futbol}<br>
            Gimnasia: ${gimnasia}<br>
            Natación: ${natacion}
        `);

    } else {
        document.write(`Total incorrecto: ${totalParticipantes}`);
    }

    break;
}
///EJERCICIO NUMERO 8
    case 8:{

        let contraseñaCorrecta = "1234";
        let intentos = 0;

        while (intentos < 3) {
            let contraseña = prompt("Introduce la contraseña:");

            if (contraseña === contraseñaCorrecta) {
                alert("Acceso concedido");
                break;
            } else {
                intentos++;
                
                if (intentos === 3) {
                    alert("Alerta, intruso");
                } else {
                    alert("Acceso denegado");
                }
            }
        }
        break;
    }
///EJERCICIO NUMERO 9
    case 9:{

    let contador = 0;
    let valor;

    do {
        valor = Number(prompt("Ingrese un número par"));

        if (valor % 2 === 0) {
            contador++;
        }

    } while (valor % 2 === 0);

    alert(`Cantidad de números pares: ${contador}`);

    break;
}
///EJERCICIO NUMERO 10
    case 10:{

        let dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        let numero = parseInt(prompt("Digite un número del 1 al 7"));

        if (numero >= 1 && numero <= 7) {
            alert("El día es: " + dias[numero - 1]);
        } else {
            alert("Número no válido");
        }
        break;
    }
///EJERCICIO NUMERO 11
    case 11:{

        let numeros = [10, 20, 30, 40, 50];
        let suma = 0;

        for (let i = 0; i < numeros.length; i++) {
            suma += numeros[i];
        }
        alert("Arreglo: " + numeros + 
            "\n" +
            "La suma es: " + suma
        );
        break;
    }
///EJERCICIO NUMERO 12
    case 12:{
        numeros = [];
        pares = 0;
        impares = 0;
        let numero = 0;
        posicion = 0;

        while (true) {
            numero = prompt("Digite un número");

            if (numero == 0 || numero == "") {
                break;
            }

            numeros[posicion] = parseInt(numero);
            posicion++;

            if (numero % 2 == 0) {
                pares++;
            } else {
                impares++;
            }
        }

        alert("Array: " + numeros);
        alert("Cantidad de pares: " + pares);
        alert("Cantidad de impares: " + impares);
        break;
    }
///EJERCICIO NUMERO 13
 let tipoAeronave = "";

switch (d2) {

    case 1:
        tipoAeronave = "Avión militar";
        break;

    case 2:
        tipoAeronave = "Avión civil de carga";
        break;

    case 3:
        tipoAeronave = "Avión civil de pasajeros";
        break;

    case 4:
        tipoAeronave = "Aeronave sin permiso";
        break;

    case 5:
        tipoAeronave = "Aeronave de supertransporte";
        break;

    case 6:
        tipoAeronave = "Aeronave enemiga";
        break;

    case 7:
        tipoAeronave = "Avión mixto";
        break;

    case 8:
        tipoAeronave = "Helicóptero";
        break;

    case 9:
        tipoAeronave = "Globo aerostático";
        break;

    default:
        tipoAeronave = "Dirigible";
}

document.write(tipoAeronave + "<br>");
    }