/**
 * Type definitions for thermal-printer-ws
 * Cliente de impresora térmica vía WebSocket
 */

/**
 * Interface para un comando de impresión
 */
interface PrintCommand {
  action: string;
  text?: string | null;
  count?: number;
  mode?: boolean;
  imagePath?: string | null;
}

/**
 * Interface para la lista de impresión
 */
interface PrintList {
  printerName: string;
  commands: PrintCommand[];
}

/**
 * Interface para el mensaje de respuesta de impresoras
 */
interface PrintersResponse {
  printers: string[];
}

/**
 * Cliente de impresora térmica
 * Soporta navegador y Node.js
 */
declare class Printer {
  /**
   * Nombre de la impresora
   */
  printerName: string;

  /**
   * IP del servidor WebSocket
   */
  ip: string;

  /**
   * Estado de conexión
   */
  isConnected: boolean;

  /**
   * Lista de comandos a enviar
   */
  printList: PrintList;

  /**
   * WebSocket connection
   */
  ws: any;

  /**
   * Constructor de la clase Printer
   * @param printerName - Nombre de la impresora (puede ser null/undefined)
   * @param ip - IP del servidor WebSocket (default: "localhost")
   * @throws {Error} Si la IP no es válida
   */
  constructor(printerName?: string | null, ip?: string);

  /**
   * Agrega un comando a la lista de impresión
   * @param action - Tipo de acción a ejecutar
   * @param text - Texto del comando (opcional)
   * @param count - Contador/número para el comando (opcional)
   * @param mode - Modo booleano para el comando (opcional)
   * @param imagePath - Ruta de imagen (opcional)
   */
  addCommand(
    action: string,
    text?: string | null,
    count?: number,
    mode?: boolean,
    imagePath?: string | null
  ): void;

  /**
   * Limpia la lista de comandos manualmente
   */
  resetCommands(): void;

  /**
   * Retorna la cantidad de comandos en la lista
   */
  getCommandCount(): number;

  /**
   * Verifica si la conexión WebSocket está activa
   */
  checkConnection(): boolean;

  /**
   * Envía los comandos acumulados al servidor
   * @returns Promise que se resuelve cuando se envían los comandos
   */
  sendCommands(): Promise<void>;

  /**
   * Obtiene la lista de impresoras disponibles
   * @returns Promise con array de nombres de impresoras
   */
  getPrinters(): Promise<string[]>;

  /**
   * Inicializa un nuevo documento de impresión
   */
  initializePrint(): void;

  /**
   * Envía todos los comandos y limpia la lista automáticamente
   * @returns Promise que se resuelve cuando se completa la impresión
   */
  printDocument(): Promise<void>;

  /**
   * Realiza una prueba de impresora
   */
  testPrinter(): void;

  /**
   * Imprime texto simple
   */
  printText(text: string): void;

  // === CORTE ===

  /**
   * Corte completo de papel
   */
  cutFull(): void;

  /**
   * Corte parcial de papel
   */
  cutPartial(): void;

  // === ALINEACIÓN ===

  /**
   * Alinea el contenido a la izquierda
   */
  alignLeft(): void;

  /**
   * Alinea el contenido al centro
   */
  alignCenter(): void;

  /**
   * Alinea el contenido a la derecha
   */
  alignRight(): void;

  // === FUENTES ===

  /**
   * Selecciona fuente A
   */
  fontA(text: string): void;

  /**
   * Selecciona fuente B (pequeña)
   */
  fontB(text: string): void;

  /**
   * Selecciona fuente C (muy pequeña)
   */
  fontC(text: string): void;

  /**
   * Selecciona fuente D
   */
  fontD(text: string): void;

  /**
   * Selecciona fuente E
   */
  fontE(text: string): void;

  /**
   * Selecciona fuente especial A
   */
  fontEspecialA(text: string): void;

  /**
   * Selecciona fuente especial B
   */
  fontEspecialB(text: string): void;

  // === ESTILOS ===

  /**
   * Texto en negrita
   */
  bold(text: string): void;

  /**
   * Texto subrayado
   */
  underLine(text: string): void;

  /**
   * Modo expandido
   */
  expanded(mode: boolean): void;

  /**
   * Modo condensado
   */
  condensed(mode: boolean): void;

  /**
   * Ancho doble (2x)
   */
  doubleWidth2(): void;

  /**
   * Ancho doble (3x)
   */
  doubleWidth3(): void;

  /**
   * Ancho normal
   */
  normalWidth(): void;

  // === ESPACIADO ===

  /**
   * Nueva línea simple
   */
  newLine(): void;

  /**
   * N nuevas líneas
   */
  newLines(count: number): void;

  /**
   * Altura de línea personalizada
   */
  lineHeight(count: number): void;

  /**
   * Separador/línea
   */
  separator(text?: string): void;

  // === CÓDIGOS DE BARRAS ===

  /**
   * Código 123
   */
  code123(text: string): void;

  /**
   * Código 39
   */
  code39(text: string): void;

  /**
   * Código EAN-13
   */
  ean13(text: string): void;

  // === OTROS ===

  /**
   * Abre el cajón de dinero
   */
  openDrawer(): void;
}

export = Printer;
