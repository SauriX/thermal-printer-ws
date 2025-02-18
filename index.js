const Printer = require('./printer');

// Crear una instancia de la impresora
const impresora = new Printer("XP-58");

// Usar los métodos para agregar comandos
impresora.printText("Hola Mundo");
impresora.printBold("Texto en negrita");
impresora.testPrinter();