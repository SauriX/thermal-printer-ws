class Printer {
    constructor(printerName) {
        this.printerName = printerName;
        if (typeof window !== 'undefined' && window.WebSocket) {
            // Si estás en el navegador, usa la API WebSocket nativa
            this.ws = new WebSocket('ws://localhost:9090');
        } else {
            // Si estás en Node.js, usa la librería ws
            const WebSocket = require('ws');
            this.ws = new WebSocket('ws://localhost:9090');
        }

        this.printList = {
            printerName: this.printerName,
            commands: [] // Aquí se agregarán los comandos
        };

        // Manejar la conexión abierta
        this.ws.onopen = () => {
            console.log(`Conectado a la impresora: ${this.printerName}`);
        };

        // Manejar mensajes del servidor
        this.ws.onmessage = (event) => {
            console.log('Mensaje del servidor:', event.data);
        };

        // Manejar errores
        this.ws.onerror = (error) => {
            console.error('Error WebSocket:', error);
        };
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

    // Funciones correspondientes a cada acción
    printText(text) {
        this.addCommand('text', text);
    }

    cutPartial() {
        this.addCommand('partial');
    }

    cutFull() {
        this.addCommand('full');
    }

    printDocument() {
        this.addCommand('printDocument');
        this.sendCommands();
    }

    testPrinter() {
        this.addCommand('testPrinter');
    }

    code123(text) {
        this.addCommand('code123', text);
    }

    code39(text) {
        this.addCommand('code39', text);
    }

    ean13(text) {
        this.addCommand('ean13', text);
    }

    openDrawer() {
        this.addCommand('openDrawer');
    }

    separator(text) {
        this.addCommand('separator', text || '');
    }

    bold(text) {
        this.addCommand('bold', text);
    }

    underLine(text) {
        this.addCommand('underLine', text);
    }

    expanded(mode) {
        this.addCommand('expanded', null, 0, mode);
    }

    condensed(mode) {
        this.addCommand('condensed', null, 0, mode);
    }

    doubleWidth2() {
        this.addCommand('doubleWidith2');
    }

    doubleWidth3() {
        this.addCommand('doubleWidith3');
    }

    normalWidth() {
        this.addCommand('normalWidith2');
    }

    alignRight() {
        this.addCommand('rigth');
    }

    alignCenter() {
        this.addCommand('center');
    }

    alignLeft() {
        this.addCommand('left');
    }

    fontA(text) {
        this.addCommand('fontA', text);
    }

    fontB(text) {
        this.addCommand('fontB', text);
    }

    fontC(text) {
        this.addCommand('fontC', text);
    }

    fontD(text) {
        this.addCommand('fontD', text);
    }

    fontE(text) {
        this.addCommand('fontE', text);
    }

    fontEspecialA(text) {
        this.addCommand('fontEspecialA', text);
    }

    fontEspecialB(text) {
        this.addCommand('fontEspecialB', text);
    }

    initializePrint() {
        this.addCommand('initializePrint');
    }

    lineHeight(count) {
        this.addCommand('lineHeigth', null, count);
    }

    newLines(count) {
        this.addCommand('newLines', null, count);
    }

    newLine() {
        this.addCommand('newLine');
    }
}


module.exports = Printer;
