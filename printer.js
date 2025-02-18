class Printer {
    constructor(printerName) {
        this.printerName = printerName;

        if (typeof window !== 'undefined') {
            // Estamos en el navegador: usar WebSocket nativo
            this.ws = new WebSocket('ws://localhost:9090');

            this.ws.addEventListener('open', () => {
                console.log(`Conectado a la impresora: ${this.printerName}`);
            }, { once: true });

            this.ws.addEventListener('message', (event) => {
                console.log('Mensaje del servidor:', event.data);
            });

            this.ws.addEventListener('error', (error) => {
                console.error('Error WebSocket:', error);
            });

        } else {
            // Estamos en Node.js: usar la librería 'ws'
            const WebSocket = require('ws');
            this.ws = new WebSocket('ws://localhost:9090');

            this.ws.on('open', () => {
                console.log(`Conectado a la impresora: ${this.printerName}`);
            });

            this.ws.on('message', (data) => {
                console.log('Mensaje del servidor:', data.toString());
            });

            this.ws.on('error', (error) => {
                console.error('Error WebSocket:', error);
            });
        }

        // Inicializar la lista de comandos
        this.printList = {
            printerName: this.printerName,
            commands: [] // Aquí se agregarán los comandos
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

    sendCommands() {
        return new Promise((resolve, reject) => {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify(this.printList));
                console.log('Comandos enviados:', JSON.stringify(this.printList));
                resolve();
            } else {
                console.log('Esperando conexión WebSocket...');
    
                const sendData = () => {
                    this.ws.send(JSON.stringify(this.printList));
                    console.log('Comandos enviados:', JSON.stringify(this.printList));
                    resolve();
                };
    
                if (typeof window !== 'undefined' && window.WebSocket) {
                    // Entorno navegador
                    const onOpen = () => {
                        sendData();
                        this.ws.removeEventListener('open', onOpen);
                    };
                    this.ws.addEventListener('open', onOpen);
                } else {
                    // Entorno Node.js
                    this.ws.once('open', sendData);
                }
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
