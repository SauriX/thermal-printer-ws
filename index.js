const Printer = require('./printer');

// Crear una instancia de la impresora
const printer = new Printer("XP-58");



// Inicializar la impresora
printer.initializePrint();

// Encabezado
printer.alignCenter();
printer.fontA('COMANDA #183270');  // Número de la comanda
printer.newLine();

printer.fontA('MESA: 12');  // Detalle de la mesa
printer.newLine();

// Productos
printer.alignLeft();
printer.fontB('2 Hamburguesas');
printer.newLine();
printer.fontB('1 Pizza Margherita');
printer.newLine();

// Comentarios
printer.alignLeft();
printer.fontC('* Sin cebolla');
printer.newLine();
printer.fontC('* Con extra de queso');
printer.newLine();

// Total
printer.alignCenter();
printer.fontB('TOTAL: $200.00');
printer.newLine();

// Separador
printer.separator('_');
printer.newLine();

// Fecha y Auxiliar
printer.fontD('Fecha: 2025-02-18 15:30');
printer.newLine();
printer.fontD('Aux: Juan Pérez');
printer.newLine();

// Finalizar impresión
printer.separator('_');
printer.newLine();

// Cortar el papel
printer.cutFull();

printer.printDocument();