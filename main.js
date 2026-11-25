let habitaciones = [];

const TIPOS = ["Sencilla", "Doble", "Suite"];
const ESTADOS = ["Libre", "Ocupada", "Limpieza"];

function mostrarMenu() {
    const opcion = prompt(`
        === HOTEL ===
        1. Registrar nueva habitación
        2. Listar habitaciones
        3. Buscar habitación por número
        4. Cambiar estado de una habitación
        5. Eliminar habitación
        6. Salir
        Seleccione una opción:
    `);

    if (opcion === null) {
        console.log("Saliendo del sistema...");
        return;
    }

    switch (opcion.trim()) {
        case "1":
            registrarHabitacion(mostrarMenu);
            break;
        case "2":
            listarHabitaciones();
            mostrarMenu();
            break;
        case "3":
            buscarHabitacion(mostrarMenu);
            break;
        case "4":
            cambiarEstado(mostrarMenu);
            break;
        case "5":
            eliminarHabitacion();
            mostrarMenu();
            break;
        case "6":
            console.log("Saliendo del sistema...");
            break;
        default:
            console.log("Opción no válida.");
            mostrarMenu();
            break;
    }
}


function registrarHabitacion(callback) {
    const numero = (prompt("Número de habitación:") ?? "").trim();
    const tipoIngresado = (prompt("Tipo (Sencilla, Doble o Suite):") ?? "").trim();
    const precioNoche = Number(prompt("Precio por noche:"));

    console.log("Validando información de la habitación...");

    setTimeout(() => {
        const tipo = TIPOS.find(t => t.toLowerCase() === tipoIngresado.toLowerCase());

        if (!numero) {
            console.log("El número de habitación es obligatorio.");
        } else if (habitaciones.some(h => h.numero === numero)) {
            console.log(`La habitación ${numero} ya está registrada.`);
        } else if (!tipo) {
            console.log("Tipo no válido. Usa Sencilla, Doble o Suite.");
        } else if (!(precioNoche > 0)) {
            console.log("El precio por noche debe ser un número mayor que cero.");
        } else {
            habitaciones.push({ numero, tipo, precioNoche, estado: "Libre", huesped: "" });
            console.log("Habitación registrada correctamente.");
        }
        callback();
    }, 2000);
}

function listarHabitaciones() {
    if (habitaciones.length === 0) {
        console.log("No existen registros de habitaciones.");
    } else {
        console.table(habitaciones);
    }
}

function buscarHabitacion(callback) {
    const numBuscar = (prompt("Ingrese el número de habitación a buscar:") ?? "").trim();
    console.log("Consultando base de datos del hotel...");

    setTimeout(() => {
        const encontrada = habitaciones.find(h => h.numero === numBuscar);
        if (encontrada) {
            console.log("Habitación encontrada:", encontrada);
        } else {
            console.log("Habitación no encontrada.");
        }
        callback();
    }, 2000);
}

function cambiarEstado(callback) {
    const numHab = (prompt("Número de habitación para cambiar estado:") ?? "").trim();
    console.log("Esperando al personal del hotel...");

    setTimeout(() => {
        const hab = habitaciones.find(h => h.numero === numHab);
        if (hab) {
            const estadoIngresado = (prompt("Nuevo estado (Libre, Ocupada o Limpieza):") ?? "").trim();
            const nuevoEstado = ESTADOS.find(e => e.toLowerCase() === estadoIngresado.toLowerCase());

            if (!nuevoEstado) {
                console.log("Estado no válido. Usa Libre, Ocupada o Limpieza.");
            } else {
                hab.estado = nuevoEstado;
                if (nuevoEstado === "Ocupada") {
                    hab.huesped = (prompt("Nombre del huésped:") ?? "").trim();
                } else if (nuevoEstado === "Libre") {
                    hab.huesped = "";
                }
                console.log("Estado actualizado con éxito.");
            }
        } else {
            console.log("La habitación no existe.");
        }
        callback();
    }, 3000);
}

function eliminarHabitacion() {
    const numEliminar = (prompt("Número de habitación a eliminar:") ?? "").trim();
    const indice = habitaciones.findIndex(h => h.numero === numEliminar);

    if (indice !== -1) {
        habitaciones.splice(indice, 1);
        console.log(`Habitación ${numEliminar} eliminada.`);
    } else {
        console.log("No se encontró la habitación.");
    }
}

mostrarMenu();