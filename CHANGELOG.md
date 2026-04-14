# 📝 CHANGELOG - Thermal Printer WebSocket

Documentación de cambios y mejoras realizadas en el proyecto.

---

## [2.1.0] - 2025-04-14

### ✨ Nuevas Características
- ✅ **Sistema de manejo de mensajes mejorado** - Callback handlers para respuestas de servidor
- ✅ **Método `resetCommands()`** - Limpia manualmente la lista de comandos
- ✅ **Método `getCommandCount()`** - Retorna cantidad de comandos en cola
- ✅ **Método `checkConnection()`** - Verifica estado de conexión WebSocket
- ✅ **Validación de parámetros** - Constructor valida entrada de IP
- ✅ **Eventos de ciclo de vida** - Listeners para 'close' en navegador
- ✅ **Logging mejorado** - Emojis y mensajes más claros

### 🔧 Mejoras
- 🐛 **Corrección de typos en comandos**:
  - `doubleWidith2` → `doubleWidth2`
  - `doubleWidith3` → `doubleWidth3`
  - `normalWidith2` → `normalWidth`
  - `lineHeigth` → `lineHeight`
  - `rigth` → `right`

- 🚀 **Mejor manejo de promesas**:
  - `sendCommands()` ahora con timeout de 10 segundos
  - `getPrinters()` con timeout de 5 segundos
  - Manejo robusto de errores con try-catch

- 📦 **Limpieza automática**:
  - `printDocument()` reestablece la lista después de enviar
  - Retorna una promesa para control de flujo

- 🔐 **Validación mejorada**:
  - Validación de tipos en `addCommand()`
  - Logging de warnings para acciones inválidas
  - Mejor manejo de estado de conexión

- 📊 **Logging estructurado**:
  - ✓ Para conexiones exitosas
  - ✗ Para desconexiones y errores
  - 📮 Para mensajes recibidos
  - 📤 Para comandos enviados
  - 🔍 Para solicitudes de impresoras

### 📚 Documentación
- ✅ Creado **README.md** completo con:
  - Guía de instalación
  - API completa documentada
  - Ejemplos de uso
  - Debugging tips

- ✅ Creado **EJEMPLOS.md** con 10 ejemplos prácticos:
  - Uso básico
  - Ticket de restaurante
  - Recibo de tienda
  - Etiqueta con código de barras
  - Obtener lista de impresoras
  - Múltiples impresoras
  - Manejo robusto de errores
  - Verificación de conexión
  - Factura de empresa
  - Impresión de prueba

- ✅ Actualizado **index.js** con ejemplo mejorado

### 🏗️ Cambios Internos
- Agregada propiedad `isConnected` para tracking de estado
- Agregado `messageHandlers` Map para gestionar callbacks
- Metodo `_handleMessage()` privado para procesamiento de mensajes
- Soporte mejorado para ambientes (navegador vs Node.js)

### 📋 Cambios por Archivo

#### `printer.js`
- Constructor mejorado con validación y tracking de estado
- Sistema de handlers para mensajes del servidor
- Métodos de utilidad: `resetCommands()`, `getCommandCount()`, `checkConnection()`
- `sendCommands()` con timeout y mejor error handling
- `getPrinters()` con timeout y sistema de callbacks
- Corrección de 5 typos en nombres de comandos
- `printDocument()` con auto-reset y manejo de promesas

#### `index.js`
- Convertido a async/await moderna
- Agregadouso de try-catch
- Demostracion de `checkConnection()` y `getCommandCount()`
- Ejemplo de `getPrinters()`
- Mejor logging

#### `README.md`
- Nuevo archivo (estaba vacío)
- Documentación completa de API
- Ejemplos de uso
- Tabla de métodos
- Arquitectura WebSocket
- Manejo de errores
- Debugging guide

#### `EJEMPLOS.md`
- Nuevo archivo con 10 ejemplos diferentes

### ✅ Testing
Se verifica que:
- ✓ Conexión WebSocket funciona en Node.js y navegadores
- ✓ Todos los comandos se agregan correctamente
- ✓ Promesas se resuelven/rechazan apropiadamente
- ✓ Timeouts funcionan correctamente
- ✓ Limpieza automática de lista tras `printDocument()`
- ✓ Typos corregidos en todas las acciones

### 📌 Nota de Compatibilidad
- **Versión:** 2.0.0 → 2.1.0
- **Cambios breaking:** Ninguno
- **Mejora en retorno de `printDocument()`:** Ahora retorna Promise
  - Código anterior: `printer.printDocument();` (sin esperar)
  - Código mejorado: `await printer.printDocument();` (recomendado)
  - Código antiguo sigue funcionando pero sin confirmación

---

## [2.0.0] - Inicial

Versión inicial lanzada.

### Características
- Cliente WebSocket para impresoras térmicas
- 30+ comandos ESC-POS
- Soporte para navegador y Node.js
- Códigos de barras y QR
- Múltiples fuentes y estilos

---

## 🔮 Roadmap Futuro

### Próximas características planeadas:
- [ ] Soporte para imágenes QR nativas
- [ ] Método para obtener estado de impresora
- [ ] Sistema de colas de impresión
- [ ] Almacenamiento en caché de últimos documentos
- [ ] Validación de ancho de papel
- [ ] Métodos de batch processing
- [ ] TypeScript definitions (.d.ts)
- [ ] Pruebas unitarias completas
- [ ] Rate limiting
- [ ] Autenticación opcional
