let habitaciones = [];

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

    switch (opcion) {
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
    const numero = prompt("Número de habitación:");
    const tipo = prompt("Tipo (Sencilla, Doble o Suite):");
    const precioNoche = prompt("Precio por noche:");
    
    console.log("Validando información de la habitación...");
    
    setTimeout(() => {
        const nuevaHabitacion = {
            numero: numero,
            tipo: tipo,
            precioNoche: Number(precioNoche),
            estado: "Libre",
            huesped: ""
        };
        habitaciones.push(nuevaHabitacion);
        console.log("Habitación registrada correctamente.");
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

