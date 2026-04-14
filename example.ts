/**
 * Ejemplo de uso con TypeScript
 * Muestra cómo usar thermal-printer-ws con type safety completo
 * 
 * Para compilar:
 * npx tsc index.ts
 * 
 * Para ejecutar:
 * node dist/index.js
 */

import Printer from './printer';

/**
 * Ejemplo 1: Impresión básica con tipos
 */
async function basicPrintExample(): Promise<void> {
  const printer = new Printer('Impresora TS', 'localhost');

  try {
    printer.initializePrint();
    printer.alignCenter();
    printer.fontA('HOLA TYPESCRIPT');
    printer.newLine();
    printer.fontC('Con type safety');
    printer.cutFull();

    await printer.printDocument();
    console.log('✓ Documento impreso');
  } catch (error) {
    if (error instanceof Error) {
      console.error('✗ Error:', error.message);
    }
  }
}

/**
 * Ejemplo 2: Ticket con estructura fuertemente tipada
 */
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

async function printOrderTicket(
  orderNumber: string,
  tableNumber: number,
  items: OrderItem[]
): Promise<void> {
  const printer = new Printer(`Orden-${orderNumber}`);

  try {
    printer.initializePrint();

    // Encabezado
    printer.alignCenter();
    printer.fontA(`COMANDA #${orderNumber}`);
    printer.newLine();
    printer.fontA(`MESA: ${tableNumber}`);
    printer.newLine();

    // Ítems
    printer.alignLeft();
    items.forEach((item: OrderItem) => {
      printer.fontB(`${item.quantity} ${item.name}`);
      printer.newLine();
    });

    // Total
    const total: number = items.reduce(
      (sum: number, item: OrderItem) => sum + item.quantity * item.price,
      0
    );

    printer.alignCenter();
    printer.fontB(`TOTAL: $${total.toFixed(2)}`);
    printer.newLine();

    printer.separator('_');
    printer.cutFull();

    await printer.printDocument();
    console.log('✓ Comanda impresa correctamente');
  } catch (error) {
    if (error instanceof Error) {
      console.error('✗ Error al imprimir:', error.message);
    }
  }
}

/**
 * Ejemplo 3: Obtener lista de impresoras disponibles
 */
async function listAvailablePrinters(): Promise<void> {
  const printer = new Printer('Explorer');

  try {
    const printers: string[] = await printer.getPrinters();

    console.log('📲 Impresoras disponibles:');
    printers.forEach((name: string, index: number) => {
      console.log(`  ${index + 1}. ${name}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('✗ Error:', error.message);
    }
  }
}

/**
 * Ejemplo 4: Validación de estado de conexión
 */
async function checkPrinterStatus(printerName: string, ip: string = 'localhost'): Promise<boolean> {
  try {
    const printer = new Printer(printerName, ip);

    // Esperar a que se conecte
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isConnected: boolean = printer.checkConnection();

    if (isConnected) {
      console.log(`✓ Impresora "${printerName}" está conectada`);
      return true;
    } else {
      console.log(`✗ Impresora "${printerName}" no está disponible`);
      return false;
    }
  } catch (error) {
    console.error('Error crítico:', error);
    return false;
  }
}

/**
 * Ejemplo 5: Receipt formatizado
 */
interface Product {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
}

interface Receipt {
  receiptNumber: string;
  storeName: string;
  products: Product[];
  paymentMethod: string;
  cashierName: string;
}

async function printReceipt(receipt: Receipt): Promise<void> {
  const printer = new Printer('Receipt-Printer');

  try {
    printer.initializePrint();

    // Encabezado
    printer.alignCenter();
    printer.bold(receipt.storeName);
    printer.fontC('www.tienda.com');
    printer.newLines(1);

    // Número de recibo
    printer.alignCenter();
    printer.fontB(`Recibo: ${receipt.receiptNumber}`);
    printer.newLines(1);

    printer.separator('=');

    // Productos
    printer.alignLeft();
    printer.fontB('ARTÍCULOS');
    printer.fontC('─────────────────────');

    let subtotal: number = 0;

    receipt.products.forEach((product: Product) => {
      const itemTotal: number = product.quantity * product.unitPrice;
      subtotal += itemTotal;

      printer.fontC(product.name);
      printer.newLine();
      printer.fontC(
        `${product.quantity}x $${product.unitPrice.toFixed(2)} = $${itemTotal.toFixed(2)}`
      );
      printer.newLine();

      if (product.discount) {
        printer.fontC(`Descuento: -$${product.discount.toFixed(2)}`);
        printer.newLine();
      }
    });

    // Totales
    printer.fontC('─────────────────────');
    const total: number = subtotal;

    printer.alignRight();
    printer.fontB(`Subtotal: $${subtotal.toFixed(2)}`);
    printer.newLine();
    printer.bold(`TOTAL: $${total.toFixed(2)}`);
    printer.newLine();

    // Método de pago
    printer.alignLeft();
    printer.fontC(`Pago: ${receipt.paymentMethod}`);
    printer.fontC(`Cajero: ${receipt.cashierName}`);
    printer.newLines(2);

    // Pie
    printer.alignCenter();
    printer.fontD(`Fecha: ${new Date().toLocaleString()}`);
    printer.fontC('¡Gracias por su compra!');
    printer.newLines(1);

    printer.cutFull();

    await printer.printDocument();
    console.log('✓ Recibo impreso correctamente');
  } catch (error) {
    if (error instanceof Error) {
      console.error('✗ Error al imprimir recibo:', error.message);
    } else {
      console.error('✗ Error desconocido');
    }
  }
}

/**
 * Ejecutar ejemplos
 */
async function main(): Promise<void> {
  console.log('=== Ejemplos de Thermal Printer con TypeScript ===\n');

  // Ejemplo 1: Impresión básica
  console.log('1. Impresión básica:');
  await basicPrintExample();
  console.log();

  // Ejemplo 2: Ticket con tipos
  console.log('2. Impresión de comanda:');
  const items: OrderItem[] = [
    { name: 'Hamburguesas', quantity: 2, price: 50 },
    { name: 'Pizza Margherita', quantity: 1, price: 80 },
    { name: 'Refrescos', quantity: 3, price: 25 }
  ];
  await printOrderTicket('001', 5, items);
  console.log();

  // Ejemplo 3: Lista de impresoras
  console.log('3. Impresoras disponibles:');
  await listAvailablePrinters();
  console.log();

  // Ejemplo 4: Estado de conexión
  console.log('4. Verificar estado:');
  await checkPrinterStatus('Mi Impresora');
  console.log();

  // Ejemplo 5: Receipt
  console.log('5. Recibo formateado:');
  const receipt: Receipt = {
    receiptNumber: '2025-00001',
    storeName: 'TIENDA EJEMPLO',
    products: [
      { id: '001', name: 'Producto A', quantity: 2, unitPrice: 25.5 },
      { id: '002', name: 'Producto B', quantity: 1, unitPrice: 15.0, discount: 2.5 }
    ],
    paymentMethod: 'Efectivo',
    cashierName: 'Juan Pérez'
  };
  await printReceipt(receipt);
}

// Ejecutar
main().catch(console.error);
