# 🎀 Hotel Management System — Taller No.1 🎀

[![CI](https://github.com/allisonrvargas/Taller-1-Allis-y-Sofi/actions/workflows/ci.yml/badge.svg)](https://github.com/allisonrvargas/Taller-1-Allis-y-Sofi/actions/workflows/ci.yml)

[![Licencia: MIT](https://img.shields.io/badge/licencia-MIT-green.svg)](LICENSE)
[![Demo](https://img.shields.io/badge/demo-en%20l%C3%ADnea-a855f7)](https://allisonrvargas.github.io/Taller-1-Allis-y-Sofi/)

<p align="center">
  <img src="https://img.shields.io/badge/Status-Completed-brightgreen?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Course-JavaScript%20Basics-purple?style=for-the-badge" alt="Course">
  <img src="https://img.shields.io/badge/Year-2026-blue?style=for-the-badge" alt="Year">
</p>

---

### ✨ Sobre el Proyecto
Este es nuestro primer taller de **JavaScript**, donde simulamos la lógica detrás de un hotel. Lo más emocionante es que usamos **asincronía real** para que el programa se sienta vivo, ¡esperando al personal del hotel o validando datos como en la vida real! 🚀

---

### 🛠️ ¿Qué usamos?
* 🌸 **Logic:** Arreglos de objetos y funciones.
* ⏳ **Magic:** `setTimeout` y **Callbacks** (¡Nada de promesas por ahora!).
* 💬 **Interface:** Menú interactivo por consola con `prompt`.
* 🎨 **Clean Code:** Estructura modular y organizada.

---

### 🏩 Funcionalidades Principales

| Acción | ¿Qué hace? | Delay |
| :--- | :--- | :---: |
| **Check-in** 📝 | Registra nuevas habitaciones con validación. | 2s |
| **Status** 🔍 | Busca habitaciones específicas por su número. | 2s |
| **Updates** ✨ | Cambia el estado (Libre, Ocupada, Limpieza). | 3s |
| **List** 📋 | Muestra todo el inventario del hotel. | Instant |
| **Remove** 🗑️ | Elimina registros del sistema. | Instant |

---

### 🧸 Reglas de Oro (Restricciones)
Para este reto, nos pusimos en modo **Hardcore Developer** 💻 y decidimos:
- No usar `Async/Await` ni `Promises`.
- Todo el flujo se controla con **Callbacks**.
- Salidas puras por `console.log`.

---

### ▶️ Cómo ejecutarlo

**Demo en línea:** https://allisonrvargas.github.io/Taller-1-Allis-y-Sofi/

O en local: abre `index.html` en el navegador. El menú aparece como ventanas emergentes (`prompt`) y los resultados se escriben en la **consola del navegador** (`F12` → pestaña *Console*).

```text
index.html   página que carga el script
main.js      lógica del hotel: menú, validaciones y callbacks con setTimeout
style.css    estilos de la página
```

---
### 🧪 Pruebas

```bash
npm test
```n
10 pruebas con `node:test` que ejecutan `main.js` con respuestas de `prompt` simuladas y `setTimeout` simulado (sin esperar los 2 y 3 segundos reales): registro con validaciones, búsqueda, cambio de estado, eliminación, listado y cancelación del menú. También comprueban la regla del taller de no usar `async/await` ni promesas.

**Validaciones:** el número es obligatorio y no se puede repetir, el tipo debe ser Sencilla, Doble o Suite, el precio debe ser mayor que cero y el estado debe ser Libre, Ocupada o Limpieza. Si se cancela un cuadro de diálogo (`prompt` devuelve `null`), el programa lo maneja en lugar de fallar o quedarse en un bucle infinito.

---

### 💖 Desarrollado por:
✨ **Angela Arrivillaga** ✨ **Allison Vargas**

<p align="right">
  <i>Hecho con amor para Campuslands 2026 🦆</i>
</p>

---

### 📄 Licencia
MIT
