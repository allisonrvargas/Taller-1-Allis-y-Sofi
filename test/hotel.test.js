import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const codigo = readFileSync(join(resolve(dirname(fileURLToPath(import.meta.url)), '..'), 'main.js'), 'utf8');

// Ejecuta main.js como lo haría el navegador, con las respuestas del usuario (prompt) en una cola
// y setTimeout simulado: guarda los retardos pedidos y ejecuta de inmediato.
function ejecutar(respuestas) {
    const cola = [...respuestas];
    const retardos = [];
    const registro = [];
    const sandbox = {
        prompt: () => (cola.length ? cola.shift() : null), // sin más respuestas = el usuario cancela
        setTimeout: (fn, ms) => { retardos.push(ms); fn(); return 0; },
        console: { log: (...a) => registro.push(a.join(' ')), table: (t) => registro.push(`TABLE:${JSON.stringify(t)}`) }
    };
    vm.createContext(sandbox);
    vm.runInContext(codigo, sandbox);
    return {
        registro, retardos,
        habitaciones: JSON.parse(vm.runInContext('JSON.stringify(habitaciones)', sandbox)),
        sobrantes: cola.length
    };
}

const registrar = (num, tipo, precio) => ['1', num, tipo, precio];

test('registra una habitación válida con estado Libre y precio numérico (2 s de espera)', () => {
    const r = ejecutar([...registrar('101', 'doble', '250'), '6']);
    assert.deepEqual(r.habitaciones, [{ numero: '101', tipo: 'Doble', precioNoche: 250, estado: 'Libre', huesped: '' }]);
    assert.ok(r.registro.includes('Habitación registrada correctamente.'));
    assert.deepEqual(r.retardos, [2000]);
});

test('rechaza número vacío, tipo inválido, precio inválido y números repetidos', () => {
    const r = ejecutar([
        ...registrar('', 'Doble', '100'),
        ...registrar('102', 'Penthouse', '100'),
        ...registrar('103', 'Suite', 'gratis'),
        ...registrar('104', 'Suite', '-5'),
        ...registrar('105', 'Sencilla', '80'),
        ...registrar('105', 'Sencilla', '80'),
        '6'
    ]);
    assert.equal(r.habitaciones.length, 1);
    assert.equal(r.habitaciones[0].numero, '105');
    for (const aviso of ['El número de habitación es obligatorio.', 'Tipo no válido. Usa Sencilla, Doble o Suite.', 'El precio por noche debe ser un número mayor que cero.', 'La habitación 105 ya está registrada.']) {
        assert.ok(r.registro.includes(aviso), `falta el aviso: ${aviso}`);
    }
});

test('busca una habitación existente (2 s) y avisa si no existe', () => {
    const r = ejecutar([...registrar('201', 'Suite', '500'), '3', '201', '3', '999', '6']);
    assert.ok(r.registro.some((l) => l.startsWith('Habitación encontrada:')));
    assert.ok(r.registro.includes('Habitación no encontrada.'));
    assert.deepEqual(r.retardos, [2000, 2000, 2000]);
});

test('cambia el estado: Ocupada guarda al huésped y Libre lo borra (3 s de espera)', () => {
    const r = ejecutar([...registrar('301', 'Doble', '300'), '4', '301', 'ocupada', 'Ana López', '4', '301', 'LIBRE', '6']);
    assert.equal(r.habitaciones[0].estado, 'Libre');
    assert.equal(r.habitaciones[0].huesped, '');
    assert.equal(r.retardos.filter((ms) => ms === 3000).length, 2);

    const ocupada = ejecutar([...registrar('301', 'Doble', '300'), '4', '301', 'ocupada', 'Ana López', '6']);
    assert.equal(ocupada.habitaciones[0].estado, 'Ocupada');
    assert.equal(ocupada.habitaciones[0].huesped, 'Ana López');
});

test('un estado inválido no cambia nada y cancelar el prompt no rompe el programa', () => {
    const r = ejecutar([...registrar('401', 'Sencilla', '90'), '4', '401', 'volando', '4', '401', null, '6']);
    assert.equal(r.habitaciones[0].estado, 'Libre');
    assert.equal(r.registro.filter((l) => l === 'Estado no válido. Usa Libre, Ocupada o Limpieza.').length, 2);
});

test('cambiar el estado de una habitación inexistente lo avisa', () => {
    const r = ejecutar(['4', '777', '6']);
    assert.ok(r.registro.includes('La habitación no existe.'));
});

test('elimina una habitación existente y avisa si no se encuentra', () => {
    const r = ejecutar([...registrar('501', 'Suite', '700'), '5', '501', '5', '501', '6']);
    assert.equal(r.habitaciones.length, 0);
    assert.ok(r.registro.includes('Habitación 501 eliminada.'));
    assert.ok(r.registro.includes('No se encontró la habitación.'));
});

test('listar muestra el aviso de vacío o la tabla', () => {
    const vacio = ejecutar(['2', '6']);
    assert.ok(vacio.registro.includes('No existen registros de habitaciones.'));
    const conDatos = ejecutar([...registrar('601', 'Doble', '200'), '2', '6']);
    assert.ok(conDatos.registro.some((l) => l.startsWith('TABLE:')));
});

test('una opción inválida vuelve a mostrar el menú y cancelar el menú termina el programa', () => {
    const invalida = ejecutar(['9', '6']);
    assert.ok(invalida.registro.includes('Opción no válida.'));
    const cancelado = ejecutar([null]); // antes: bucle infinito
    assert.deepEqual(cancelado.registro, ['Saliendo del sistema...']);
});

test('se cumple la regla del taller: sin async/await ni promesas', () => {
    assert.ok(!/\basync\b|\bawait\b|\bPromise\b|\.then\(/.test(codigo));
});