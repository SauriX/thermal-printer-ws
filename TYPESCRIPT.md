# 📘 Guía de TypeScript - Thermal Printer WebSocket

Soporte completo de TypeScript con type definitions incluidas.

---

## 🚀 Instalación y Configuración

### 1. Instalación de Dependencias

```bash
npm install
```

Esto instala las dependencias necesarias:
- `typescript` - Compilador TypeScript
- `@types/node` - Type definitions para Node.js
- `ts-node` - Ejecutor de TypeScript directo

### 2. Verificar Instalación

```bash
npx tsc --version
```

---

## 📁 Estructura para TypeScript

```
thermal-printer-ws/
├── printer.js           # Código fuente JavaScript
├── printer.d.ts         # Type definitions ⭐
├── example.ts           # Ejemplo en TypeScript
├── tsconfig.json        # Configuración TypeScript
└── dist/                # Salida compilada (generado)
```

---

## 🛠️ Compilación

### Opción 1: Compilar Manualmente

```bash
# Compilar todos los archivos .ts al directorio dist/
npx tsc
```

### Opción 2: Usar Script npm

```bash
npm run build
```

Esto genera:
- `dist/example.js` - Archivo compilado
- `dist/example.d.ts` - Tipos generados (si se habilita)
- `dist/example.js.map` - Source maps para debugging

---

## 📝 Uso en Código TypeScript

### Importar la Clase

```typescript
import Printer from './printer';

const printer: Printer = new Printer('Mi Impresora', 'localhost');
```

### Con Type Safety

```typescript
import Printer from './printer';

async function printTicket(): Promise<void> {
  const printer = new Printer('Caja 1');

  try {
    printer.initializePrint();
    printer.alignCenter();
    printer.fontA('TÍTULO');
    printer.newLine();
    
    await printer.printDocument();
    console.log('✓ Impresión completada');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('✗ Error:', error.message);
    }
  }
}

printTicket();
```

---

## 🎯 Ejemplos con TypeScript

### Ejemplo 1: Interfaz Personalizada

```typescript
import Printer from './printer';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

async function printOrder(items: OrderItem[]): Promise<void> {
  const printer = new Printer('POS-01');

  printer.initializePrint();
  
  items.forEach((item: OrderItem) => {
    printer.fontB(`${item.name}`);
    printer.newLine();
    printer.fontC(`Qty: ${item.quantity} x $${item.price}`);
    printer.newLine();
  });

  printer.cutFull();
  await printer.printDocument();
}

const items: OrderItem[] = [
  { name: 'Producto A', quantity: 2, price: 50 },
  { name: 'Producto B', quantity: 1, price: 75 }
];

printOrder(items).catch(console.error);
```

### Ejemplo 2: Servicio Tipado

```typescript
import Printer from './printer';

class PrinterService {
  private printer: Printer;

  constructor(printerName: string, ip: string = 'localhost') {
    this.printer = new Printer(printerName, ip);
  }

  async isConnected(): Promise<boolean> {
    return this.printer.checkConnection();
  }

  async getPrinters(): Promise<string[]> {
    return this.printer.getPrinters();
  }

  async printText(text: string): Promise<void> {
    this.printer.initializePrint();
    this.printer.alignCenter();
    this.printer.fontA(text);
    this.printer.cutFull();
    
    await this.printer.printDocument();
  }

  async printJson<T extends Record<string, any>>(data: T): Promise<void> {
    this.printer.initializePrint();
    
    Object.entries(data).forEach(([key, value]) => {
      this.printer.fontB(`${key}:`);
      this.printer.fontC(String(value));
      this.printer.newLine();
    });

    this.printer.cutFull();
    await this.printer.printDocument();
  }
}

// Uso
const service = new PrinterService('Mi Impresora');

service.printJson({
  nombre: 'Juan',
  monto: '$100.00',
  fecha: new Date().toLocaleString()
}).catch(console.error);
```

### Ejemplo 3: Generics

```typescript
import Printer from './printer';

async function printFormatted<T>(
  data: T,
  formatter: (item: T) => string
): Promise<void> {
  const printer = new Printer('Generic-Printer');

  printer.initializePrint();
  printer.alignCenter();
  printer.fontA(formatter(data));
  printer.cutFull();

  await printer.printDocument();
}

interface Invoice {
  number: string;
  total: number;
}

const invoice: Invoice = { number: 'INV-001', total: 250.50 };

printFormatted(invoice, (inv) => 
  `FACTURA ${inv.number}\nTotal: $${inv.total}`
).catch(console.error);
```

---

## 🔍 Type Definitions Disponibles

### Clase Printer

```typescript
interface Printer {
  // Propiedades
  printerName: string;
  ip: string;
  isConnected: boolean;
  printList: PrintList;

  // Métodos de control
  addCommand(action: string, ...args: any[]): void;
  resetCommands(): void;
  getCommandCount(): number;
  checkConnection(): boolean;
  sendCommands(): Promise<void>;
  getPrinters(): Promise<string[]>;
  initializePrint(): void;
  printDocument(): Promise<void>;

  // Métodos de alineación
  alignLeft(): void;
  alignCenter(): void;
  alignRight(): void;

  // ... más methods
}
```

### Interfaces Auxiliares

```typescript
interface PrintCommand {
  action: string;
  text?: string | null;
  count?: number;
  mode?: boolean;
  imagePath?: string | null;
}

interface PrintList {
  printerName: string;
  commands: PrintCommand[];
}

interface PrintersResponse {
  printers: string[];
}
```

---

## ⚙️ Configuración TypeScript (tsconfig.json)

El proyecto incluye un `tsconfig.json` optimizado con:

```json
{
  "compilerOptions": {
    "target": "ES2020",           // JavaScript moderno
    "module": "commonjs",         // CommonJS para Node.js
    "strict": true,               // Strict mode activado
    "esModuleInterop": true,      // Mejor interop con módulos
    "declaration": true,          // Generar .d.ts
    "sourceMap": true             // Source maps para debugging
  }
}
```

### Opciones Destacadas:

- **`strict: true`** - Activar todas las verificaciones de tipo
- **`target: ES2020`** - Sintaxis JavaScript moderna
- **`module: commonjs`** - Compatible con Node.js
- **`declaration: true`** - Generar tipos automáticamente
- **`sourceMap: true`** - Debugging en VS Code

---

## 🧪 Ejecución de Ejemplos

### Ejecutar Ejemplo JavaScript

```bash
npm run example
# o
node index.js
```

### Ejecutar Ejemplo TypeScript (con ts-node)

```bash
npm run example:ts
# o
npx ts-node example.ts
```

### Compilar y Ejecutar TypeScript

```bash
# Compilar
npm run build

# Ejecutar el compilado
node dist/example.js
```

---

## 📊 Editor Support

### VS Code (Recomendado)

VS Code reconoce automáticamente los tipos desde `printer.d.ts`:

1. Abre `example.ts`
2. Escribe: `const printer = new Printer()`
3. Verás autocompletado con tipos completos
4. Hover sobre métodos para ver documentación

### WebStorm / IntelliJ IDEA

Soporta TypeScript nativo:
1. Instala las dependencias: `npm install`
2. WebStorm reconocerá tipos automáticamente

---

## 🐛 Debugging en TypeScript

### Opción 1: VS Code Debugger

Crea `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "ts-node",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/ts-node",
      "args": ["${workspaceFolder}/example.ts"],
      "smartStep": true,
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

Luego: `F5` para ejecutar con debugging

### Opción 2: Console Logging

```typescript
const printer = new Printer('Debug');

console.log('Estado:', printer.isConnected);
console.log('Comandos:', printer.getCommandCount());
console.log('Conexión:', printer.checkConnection());
```

---

## ✅ Type Checking Sin Compilar

Verificar tipos sin compilar:

```bash
# Verificar tipos
npx tsc --noEmit

# Con watch mode
npx tsc --watch --noEmit
```

---

## 🚀 Crear Librería TypeScript

Si quieres publicar como librería:

### package.json

```json
{
  "name": "thermal-printer-ws",
  "types": "printer.d.ts",
  "main": "printer.js",
  "files": [
    "printer.js",
    "printer.d.ts"
  ]
}
```

### Publicar a npm

```bash
npm login
npm publish
```

---

## 🔗 Recursos Útiles

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
- [TypeScript in VS Code](https://code.visualstudio.com/docs/languages/typescript)
- [ts-node documentation](https://typestrong.org/ts-node/)

---

## 📋 Checklist de Configuración

- ✅ `npm install` - Instalar dependencias
- ✅ `tsconfig.json` - Configuración TypeScript
- ✅ `printer.d.ts` - Type definitions
- ✅ `example.ts` - Ejemplo en TypeScript
- ✅ Soporte en VS Code - Autocompletado automático
- ✅ Scripts en package.json - Compilación fácil

---

¡Disfruta escribiendo código TypeScript con thermal-printer-ws! 🎉
