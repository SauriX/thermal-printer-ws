const WebSocket = require('ws');
class Printer {
    constructor(printerName) {
        this.printerName = printerName;
        this.ws = new WebSocket('ws://localhost:9090');

        // Inicializar el objeto principal que contendrá el JSON
        this.printList = {
            printerName: this.printerName,
            commands: []  // Aquí se agregarán los comandos
        };

        // Esperar a que la conexión se abra
        this.ws.on('open', () => {
            console.log(`Conectado a la impresora: ${this.printerName}`);
        });

        // Manejar respuestas del servidor
        this.ws.on('message', (data) => {
            console.log('Mensaje del servidor:', data);
        });

        // Manejar errores
        this.ws.on('error', (err) => {
            console.error('Error WebSocket:', err);
        });
    }

    // Método para agregar un comando
    addCommand(action, text = null, count = 0, mode = false, imagePath = null) {
        const command = {
            action: action,
            text: text,
            count: count,
            mode: mode,
            imagePath: imagePath
        };

        this.printList.commands.push(command);  // Añadir el comando al array
    }

    // Método para enviar los comandos al servidor
    sendCommands() {
        return new Promise((resolve, reject) => {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify(this.printList));  // Enviar el JSON completo
                console.log('Comandos enviados:', JSON.stringify(this.printList));
                resolve();  // Confirmar que se enviaron los comandos
            } else {
                console.log('Esperando conexión WebSocket...');
                this.ws.once('open', () => {
                    this.ws.send(JSON.stringify(this.printList));  // Enviar el JSON cuando la conexión esté abierta
                    console.log('Comandos enviados:', JSON.stringify(this.printList));
                    resolve();
                });
            }
        });
    }

    // Métodos específicos de impresión, que llaman a addCommand

    printText(text) {
        this.addCommand('text', text);
    }

    printBold(text) {
        this.addCommand('bold', text);
    }

    testPrinter() {
        console.log("Test de impresora");
        this.addCommand('printDocument');
        this.sendCommands();
    }
}

module.exports = Printer;
