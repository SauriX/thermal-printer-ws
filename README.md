# 🖨️ Thermal Printer WebSocket Client

Cliente Node.js/Browser para comunicarse con un servidor de impresión térmica basado en WebSockets.

[![npm version](https://img.shields.io/npm/v/thermal-printer-ws.svg)](https://www.npmjs.com/package/thermal-printer-ws)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Características

- ✅ **Compatible con Node.js y navegadores** (WebSocket nativo)
- ✅ **30+ comandos ESC-POS** para control total de impresoras térmicas
- ✅ **Códigos de barras** (CODE123, CODE39, EAN13)
- ✅ **Códigos QR e imágenes**
- ✅ **Control de dispositivos periféricos** (cajón de dinero)
- ✅ **Múltiples fuentes y estilos de texto**
- ✅ **Pruebas automáticas de impresora**
- ✅ **Manejo robusto de errores con timeouts**

---

## 📦 Instalación

```bash
npm install thermal-printer-ws
```

---

## 🚀 Uso Rápido

### Node.js

```javascript
const Printer = require('thermal-printer-ws');

// Crear instancia
const printer = new Printer('Mi Impresora', 'localhost');

async function printReceipt() {
    try {
        printer.initializePrint();
        printer.alignCenter();
        printer.fontA('COMANDA #001');
        printer.newLine();
        
        printer.alignLeft();
        printer.fontB('2 Hamburguesas');
        printer.newLine();
        
        printer.alignCenter();
        printer.fontB('TOTAL: $200.00');
        printer.newLine();
        
        printer.separator('_');
        printer.cutFull();
        
        // Enviar y limpiar lista automáticamente
        await printer.printDocument();
        console.log('✓ Impresión completada');
    } catch (error) {
        console.error('✗ Error:', error.message);
    }
}

printReceipt();
```

### Navegador

```html
<script src="/path/to/printer.js"></script>

<script>
    const printer = new Printer('Impresora Local');
    
    printer.initializePrint();
    printer.alignCenter();
    printer.fontA('Título del Documento');
    printer.newLine();
    printer.fontC('Contenido');
    printer.cutFull();
    
    printer.printDocument().then(() => {
        alert('Documento impreso correctamente');
    });
</script>
```

---

## 📋 API Completa

### Constructor

```javascript
const printer = new Printer(printerName, ip);
```

| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `printerName` | string | "Impresora Térmica" | Nombre de la impresora |
| `ip` | string | "localhost" | IP del servidor WebSocket |

### Métodos de Control

| Método | Descripción |
|--------|-------------|
| `initializePrint()` | **Debe llamarse primero** para inicializar el documento |
| `printDocument()` | Envía todos los comandos y limpia la lista (Promise) |
| `testPrinter()` | Realiza prueba de impresión |
| `resetCommands()` | Limpia la lista de comandos manualmente |
| `getCommandCount()` | Retorna cantidad de comandos en cola |
| `checkConnection()` | Verifica si WebSocket está conectado |

### Métodos de Alineación

```javascript
printer.alignLeft();      // Alinear a la izquierda
printer.alignCenter();    // Alinear al centro
printer.alignRight();     // Alinear a la derecha
```

### Métodos de Fuentes

```javascript
printer.fontA(text);        // Fuente A (defecto)
printer.fontB(text);        // Fuente B (pequeña)
printer.fontC(text);        // Fuente C (extra pequeña)
printer.fontD(text);        // Fuente D
printer.fontE(text);        // Fuente E
printer.fontEspecialA(text); // Fuente especial A
printer.fontEspecialB(text); // Fuente especial B
```

### Métodos de Estilos

```javascript
printer.bold(text);           // Texto en negrita
printer.underLine(text);      // Texto subrayado
printer.expanded(true/false); // Modo expandido
printer.condensed(true/false);// Modo condensado
printer.doubleWidth2();       // Ancho doble
printer.doubleWidth3();       // Ancho triple
printer.normalWidth();        // Ancho normal
```

### Métodos de Espaciado

```javascript
printer.newLine();        // Nueva línea simple
printer.newLines(count);  // N nuevas líneas
printer.lineHeight(count);// Altura de línea personalizada
printer.separator(char);  // Separador (ej: separator('_'))
```

### Métodos de Corte

```javascript
printer.cutFull();    // Corte completo de papel
printer.cutPartial(); // Corte parcial
```

### Códigos de Barras

```javascript
printer.code123(text);  // Código 123
printer.code39(text);   // Código 39
printer.ean13(text);    // EAN-13
```

### Otros

```javascript
printer.openDrawer();     // Abre cajón de dinero
printer.printText(text);  // Texto simple

// Obtener lista de impresoras disponibles
printer.getPrinters()
    .then(printers => console.log(printers))
    .catch(error => console.error(error));
```

---

## 🔄 Arquitectura WebSocket

### Conexión

```
Cliente → ws://[ip]:9090/ → Servidor
```

### Formato de Datos Enviados

```json
{
  "printerName": "Mi Impresora",
  "commands": [
    {
      "action": "initializePrint",
      "text": null,
      "count": 0,
      "mode": false,
      "imagePath": null
    },
    {
      "action": "fontA",
      "text": "Título"
    }
  ]
}
```

### Respuesta del Servidor (getPrinters)

```json
{
  "printers": ["Impresora 1", "Impresora 2"]
}
```

---

## 📝 Ejemplo Completo: Ticket de Compra

```javascript
const Printer = require('thermal-printer-ws');

async function printTicket() {
    const printer = new Printer('Caja 1', 'localhost');
    
    try {
        printer.initializePrint();
        
        // Encabezado
        printer.alignCenter();
        printer.fontA('TIENDA MI NEGOCIO');
        printer.newLine();
        printer.fontC('www.minegocio.com');
        printer.newLine();
        
        // Separador
        printer.separator('=');
        printer.newLine();
        
        // Contenido del ticket
        printer.alignLeft();
        printer.bold('ARTÍCULOS:');
        printer.newLine();
        
        printer.fontB('Producto 1...................$50.00');
        printer.newLine();
        printer.fontB('Producto 2...................$30.00');
        printer.newLine();
        
        // Total
        printer.alignCenter();
        printer.separator('-');
        printer.fontA('TOTAL: $80.00');
        printer.newLine();
        
        // Fecha
        printer.fontD(`Fecha: ${new Date().toLocaleString()}`);
        printer.newLine();
        
        // Pie de página
        printer.alignCenter();
        printer.fontC('¡Gracias por su compra!');
        printer.newLine();
        
        // Corte
        printer.cutFull();
        
        // Enviar
        await printer.printDocument();
        console.log('✓ Ticket impreso correctamente');
        
    } catch (error) {
        console.error('✗ Error:', error.message);
    }
}

printTicket();
```

---

## ⚠️ Manejo de Errores

```javascript
printer.sendCommands()
    .then(() => {
        console.log('✓ Comandos enviados exitosamente');
    })
    .catch(error => {
        console.error('✗ Error:', error.message);
        // error.message puede contener:
        // - "Timeout al enviar comandos (10s)"
        // - "Error al enviar: [detalles]"
    });
```

---

## 🐛 Debugging

### Verificar conexión

```javascript
console.log(printer.checkConnection()); // true/false
console.log(printer.getCommandCount());  // cantidad de comandos
```

### Ver comandos en cola

```javascript
console.log(printer.printList.commands);
```

### Usar con logging detallado

El cliente registra automáticamente:
- ✓ Conexiones exitosas
- ✗ Desconexiones y errores
- 📮 Comandos agregados
- 📤 Comandos enviados
- 📨 Mensajes recibidos

---

## 🔗 Requisitos Servidor

Este cliente requiere un servidor WebSocket en puerto **9090** que entienda el protocolo ESC-POS. 

Servidores compatibles:
- **ThermalPrinterApp** (.NET) - Documentado en `CLIENT_INTEGRATION_GUIDE.md`
- Cualquier servidor que implemente el protocolo ESC-POS

---

## 📄 Licencia

MIT © [SauriX](https://github.com/SauriX/thermal-printer-ws)

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -am 'Agrega mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

---

## 📞 Soporte

Para problemas o preguntas:
- 📧 Abre un issue en [GitHub](https://github.com/SauriX/thermal-printer-ws/issues)
- 🐛 Describe el problema con detalles
- 📋 Incluye los logs de consola si es posible
