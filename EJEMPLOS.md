# 📚 Ejemplos de Uso - Thermal Printer WebSocket

Ejemplos prácticos para diferentes casos de uso.

---

## 1. Ejemplo Básico - Hola Mundo

```javascript
const Printer = require('./printer');

const printer = new Printer('Impresora Test');

async function main() {
    try {
        printer.initializePrint();
        printer.alignCenter();
        printer.fontA('¡HOLA MUNDO!');
        printer.newLine();
        printer.fontC('Desde Thermal Printer');
        printer.cutFull();
        
        await printer.printDocument();
        console.log('✓ Documento impreso');
    } catch (error) {
        console.error('✗ Error:', error.message);
    }
}

main();
```

---

## 2. Ticket de Restaurante (Original)

```javascript
const Printer = require('./printer');

const printer = new Printer(null, "localhost");

async function printOrderTicket() {
    try {
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

        // Finalizar
        printer.separator('_');
        printer.newLine();
        printer.cutFull();

        await printer.printDocument();
        console.log('✓ Comanda impresa');
    } catch (error) {
        console.error('✗ Error:', error);
    }
}

printOrderTicket();
```

---

## 3. Recibo de Tienda

```javascript
const Printer = require('./printer');

const printer = new Printer('POS-01');

async function printReceipt() {
    try {
        printer.initializePrint();

        // Logo/Título
        printer.alignCenter();
        printer.bold('TIENDA EJEMPLO');
        printer.fontC('www.tienda.com | Tel: +1-555-0123');
        printer.newLines(1);

        // Separador
        printer.separator('=');

        // Artículos
        printer.alignLeft();
        printer.fontB('ARTICULOS:');
        printer.fontC('─────────────────────');
        
        const items = [
            { name: 'Producto A', qty: 2, price: 25.50 },
            { name: 'Producto B', qty: 1, price: 15.00 },
            { name: 'Descuento', qty: 1, price: -5.00 }
        ];

        items.forEach(item => {
            printer.fontC(`${item.name}`);
            printer.newLine();
            printer.fontC(`Qty: ${item.qty}  Total: $${item.price.toFixed(2)}`);
            printer.newLine();
        });

        printer.fontC('─────────────────────');
        printer.alignRight();
        printer.fontB(`TOTAL: $${(25.50*2 + 15.00 - 5.00).toFixed(2)}`);
        printer.newLine();

        printer.alignLeft();
        printer.fontC(`Método pago: Efectivo`);
        printer.fontC(`Cambio: $10.00`);
        printer.newLines(2);

        // Nota final
        printer.alignCenter();
        printer.fontD('Fecha: ' + new Date().toLocaleString());
        printer.fontC('¡Gracias por su compra!');
        printer.fontC('Vuelva pronto');
        printer.newLines(1);

        printer.cutFull();

        await printer.printDocument();
        console.log('✓ Recibo impreso correctamente');

    } catch (error) {
        console.error('✗ Error:', error.message);
    }
}

printReceipt();
```

---

## 4. Etiqueta con Código de Barras

```javascript
const Printer = require('./printer');

const printer = new Printer('Label-Printer');

async function printLabel() {
    try {
        printer.initializePrint();

        printer.alignCenter();
        printer.bold('PRODUCTO');
        printer.newLine();

        // Código de barras EAN-13
        printer.ean13('1234567890128');
        printer.newLine();

        printer.fontC('Código: 1234567890128');
        printer.newLines(1);

        printer.fontB('PRECIO: $29.99');
        printer.newLine();

        printer.fontC('Válido hasta: 31/12/2025');
        printer.newLines(2);

        printer.cutPartial();

        await printer.printDocument();
        console.log('✓ Etiqueta impresa');

    } catch (error) {
        console.error('✗ Error:', error.message);
    }
}

printLabel();
```

---

## 5. Obtener Lista de Impresoras

```javascript
const Printer = require('./printer');

async function listPrinters() {
    const printer = new Printer('Detective');

    try {
        const printers = await printer.getPrinters();
        
        console.log('📲 Impresoras disponibles:');
        printers.forEach((name, index) => {
            console.log(`  ${index + 1}. ${name}`);
        });

    } catch (error) {
        console.error('✗ Error:', error.message);
    }
}

listPrinters();
```

---

## 6. Múltiples Impresoras

```javascript
const Printer = require('./printer');

async function printToMultiplePrinters() {
    // Crear instancias para diferentes impresoras
    const printer1 = new Printer('Caja-1', 'localhost');
    const printer2 = new Printer('Caja-2', 'localhost');

    try {
        // Preparar documento para printer1
        printer1.initializePrint();
        printer1.alignCenter();
        printer1.fontA('TICKET CAJA 1');
        printer1.newLine();
        printer1.fontB('Monto: $100.00');
        printer1.cutFull();

        // Preparar documento para printer2
        printer2.initializePrint();
        printer2.alignCenter();
        printer2.fontA('TICKET CAJA 2');
        printer2.newLine();
        printer2.fontB('Monto: $150.00');
        printer2.cutFull();

        // Enviar ambos en paralelo
        await Promise.all([
            printer1.printDocument(),
            printer2.printDocument()
        ]);

        console.log('✓ Documentos impresos en ambas cajas');

    } catch (error) {
        console.error('✗ Error:', error.message);
    }
}

printToMultiplePrinters();
```

---

## 7. Manejo de Errores Robusto

```javascript
const Printer = require('./printer');

async function robustPrint() {
    const printer = new Printer('RobustPrinter', 'localhost');
    const maxRetries = 3;
    let attempts = 0;

    async function attemptPrint() {
        try {
            printer.initializePrint();
            printer.alignCenter();
            printer.fontA('INTENTO: ' + (attempts + 1));
            printer.newLine();
            printer.cutFull();

            await printer.printDocument();
            console.log('✓ Impresión exitosa en intento ' + (attempts + 1));
            return true;

        } catch (error) {
            attempts++;
            
            if (attempts < maxRetries) {
                console.warn(`⚠ Intento ${attempts} falló: ${error.message}`);
                console.log(`📌 Reintentando en 2 segundos...`);
                
                // Esperar 2 segundos antes de reintentar
                await new Promise(resolve => setTimeout(resolve, 2000));
                return attemptPrint();
                
            } else {
                console.error(`✗ Falló después de ${maxRetries} intentos`);
                throw error;
            }
        }
    }

    return attemptPrint();
}

robustPrint().catch(err => console.error('Error final:', err));
```

---

## 8. Verificar Estado de Conexión

```javascript
const Printer = require('./printer');

const printer = new Printer('StatusChecker');

// Verificar conexión después de 2 segundos
setTimeout(() => {
    if (printer.checkConnection()) {
        console.log('✓ Conectado al servidor');
    } else {
        console.log('✗ No hay conexión al servidor');
    }
}, 2000);

// Consultar impresoras disponibles
setTimeout(async () => {
    try {
        const printers = await printer.getPrinters();
        console.log('Impresoras encontradas:', printers.length);
    } catch (error) {
        console.log('No se pudo obtener lista de impresoras');
    }
}, 3000);
```

---

## 9. Ejemplo: Factura de Empresa

```javascript
const Printer = require('./printer');

const printer = new Printer('Factura-Device');

async function printInvoice() {
    try {
        printer.initializePrint();

        // Membrete
        printer.alignCenter();
        printer.bold('EMPRESA S.A.');
        printer.fontC('RIF: J-12345678-9');
        printer.fontC('Dirección: Calle Principal 123');
        printer.newLines(1);

        // Número de factura
        printer.alignCenter();
        printer.fontA('FACTURA');
        printer.fontB('Nº 2025-00001');
        printer.newLines(1);

        // Separador
        printer.separator('=');

        // Cliente y datos
        printer.alignLeft();
        printer.fontB('CLIENTE:');
        printer.fontC('Nombre: Juan García');
        printer.fontC('RIF: V-12345678');
        printer.newLine();

        // Tabla de productos
        printer.alignLeft();
        printer.bold('DESCRIPCION              CANT  PRECIO  SUBTOTAL');
        printer.fontC('─────────────────────────────────────────────────');

        const items = [
            { desc: 'Producto 1', qty: 2, price: 100 },
            { desc: 'Producto 2', qty: 1, price: 250 },
            { desc: 'Producto 3', qty: 3, price: 75 }
        ];

        let total = 0;
        items.forEach(item => {
            const subtotal = item.qty * item.price;
            total += subtotal;
            printer.fontC(
                `${item.desc.padEnd(20)} ${item.qty.toString().padStart(5)} ` +
                `${item.price.toString().padStart(6)} ${subtotal.toString().padStart(7)}`
            );
            printer.newLine();
        });

        printer.fontC('─────────────────────────────────────────────────');
        
        // Totales
        const iva = total * 0.16;
        const totalWithIva = total + iva;

        printer.alignRight();
        printer.fontB(`Subtotal: $${total.toFixed(2)}`);
        printer.fontB(`IVA (16%): $${iva.toFixed(2)}`);
        printer.bold(`TOTAL: $${totalWithIva.toFixed(2)}`);

        printer.newLines(2);

        // Pie de página
        printer.alignCenter();
        printer.fontC('Forma de pago: Transferencia');
        printer.fontD(`Fecha: ${new Date().toLocaleString()}`);
        printer.newLine();
        printer.fontC('¡Gracias por su negocio!');

        printer.newLines(2);
        printer.cutFull();

        await printer.printDocument();
        console.log('✓ Factura impresa exitosamente');

    } catch (error) {
        console.error('✗ Error al imprimir factura:', error.message);
    }
}

printInvoice();
```

---

## 10. Impresión de Prueba

```javascript
const Printer = require('./printer');

const printer = new Printer('Test-Printer');

async function testPrinter() {
    try {
        // Enviar comando de prueba al servidor
        printer.testPrinter();
        
        await printer.sendCommands();
        console.log('✓ Prueba de impresora ejecutada');
        
    } catch (error) {
        console.error('✗ Error en prueba:', error.message);
    }
}

testPrinter();
```

---

## 🎯 Tips y Buenas Prácticas

1. **Siempre iniciar con `initializePrint()`**
2. **Agrupar comandos antes de llamar a `printDocument()`**
3. **Usar `try-catch` para manejar errores de conexión**
4. **Verificar `checkConnection()` antes de operaciones críticas**
5. **Usar `await` con `printDocument()` para esperar confirmación**
6. **Resetear lista manualmente si no usas `printDocument()`**
7. **Incluir información de depuración en logs de producción**

---
