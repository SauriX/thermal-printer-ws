const Printer = require('./printer');

/**
 * Ejemplo de uso: Impresión de comanda de restaurante
 * Demuestra las mejoras implementadas:
 * - Manejo de promesas con try-catch
 * - Limpieza automática de comandos
 * - Manejo robusto de errores
 */

const printer = new Printer("Caja Principal", "localhost");

async function printOrderTicket() {
    try {
        // Verificar conexión
        console.log(`Estado de conexión: ${printer.checkConnection() ? 'Conectado' : 'Desconectado'}`);

        // Inicializar documento
        printer.initializePrint();

        // Encabezado
        printer.alignCenter();
        printer.fontA('COMANDA #183270');
        printer.newLine();

        printer.fontA('MESA: 12');
        printer.newLine();

        // Productos
        printer.alignLeft();
        printer.fontB('2 Hamburguesas');
        printer.newLine();
        printer.fontB('1 Pizza Margherita');
        printer.newLine();

        // Comentarios especiales
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

        // Mostrar cantidad de comandos antes de enviar
        console.log(`📋 Comandos en cola: ${printer.getCommandCount()}`);

        // Enviar documento (automáticamente limpia la lista después)
        await printer.printDocument();
        
        console.log('✓ Comanda impresa exitosamente');
        console.log(`📋 Comandos después de envío: ${printer.getCommandCount()}`);

    } catch (error) {
        console.error('✗ Error al imprimir:', error.message);
    }
}

/**
 * Ejemplo: Obtener lista de impresoras disponibles
 */
async function checkAvailablePrinters() {
    try {
        const printers = await printer.getPrinters();
        console.log('📲 Impresoras disponibles:', printers);
    } catch (error) {
        console.error('✗ Error al obtener impresoras:', error.message);
    }
}

// Ejecutar ejemplo
async function main() {
    // Esperar a que se establezca la conexión
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Imprimir comanda
    await printOrderTicket();
    
    // Verificar impresoras disponibles
    console.log('\n--- Verificando impresoras disponibles ---\n');
    await checkAvailablePrinters();
}

main().catch(console.error);
