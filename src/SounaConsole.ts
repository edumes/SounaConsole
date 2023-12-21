class Console {
    private loadingInterval: NodeJS.Timer | any = null;
    private colors: Record<string, string> = {
        reset: '\x1b[0m',
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
        bgBlack: '\x1b[40m',
        bgRed: '\x1b[41m',
        bgGreen: '\x1b[42m',
        bgYellow: '\x1b[43m',
        bgBlue: '\x1b[44m',
        bgMagenta: '\x1b[45m',
        bgCyan: '\x1b[46m',
        bgWhite: '\x1b[47m',
    };

    private customSetting: string;
    private errorCallback: ((error: Error) => void) | null = null;
    private timestampDisplayed: boolean = false;

    constructor(customSetting: string = 'default') {
        this.customSetting = customSetting;
    }

    private clearConsole(): void {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
    }

    private getCurrentTime(): string {
        const now = new Date();
        const year = now.getFullYear().toString().padStart(4, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    private displayTimestamp(showTimestamp: boolean, timestampColor: string): string {
        return showTimestamp && !this.timestampDisplayed
            ? `[${timestampColor}${this.getCurrentTime()}${this.colors.reset}] `
            : '';
    }

    private logInternal(
        message: string,
        color: string,
        options: { loading?: boolean; showTimestamp?: boolean } = {}
    ): void {
        const { loading = false, showTimestamp = true } = options;
        const selectedColor = this.colors[color] || this.colors.reset;
        const timestampColor = this.colors.blue;

        if (loading) {
            this.handleLoading(message, selectedColor, timestampColor, showTimestamp);
        } else {
            this.handleLog(message, selectedColor, timestampColor, showTimestamp);
        }
    }

    private handleLoading(
        message: string,
        selectedColor: string,
        timestampColor: string,
        showTimestamp: boolean
    ): void {
        let loadingText = '';
        const timestamp = this.displayTimestamp(showTimestamp, timestampColor);

        this.loadingInterval = setInterval(() => {
            this.clearConsole();
            loadingText = loadingText.length < 3 ? loadingText + '.' : '.';
            process.stdout.write(
                `${timestamp}${selectedColor}${message}${this.colors.reset}${loadingText}`
            );
            this.timestampDisplayed = true;
        }, 500);
    }

    private handleLog(
        message: string,
        selectedColor: string,
        timestampColor: string,
        showTimestamp: boolean
    ): void {
        if (this.loadingInterval) {
            clearInterval(this.loadingInterval!);
            this.loadingInterval = null;
        }
        this.clearConsole();
        const timestamp = this.displayTimestamp(showTimestamp, timestampColor);
        process.stdout.write(
            `${timestamp}${selectedColor}${message}${this.colors.reset}\n`
        );

        this.handleErrorCallback();

        this.timestampDisplayed = showTimestamp && !this.timestampDisplayed;
    }

    private handleErrorCallback(): void {
        if (this.errorCallback) {
            try {
                if (Math.random() < 0.2) {
                    throw new Error('Error');
                }
            } catch (error) {
                this.errorCallback(error as Error);
            }
        }
    }

    public log(
        message: string,
        options: { color?: string; loading?: boolean; showTimestamp?: boolean } = {}
    ): void {
        const { color = 'reset', ...otherOptions } = options;
        this.logInternal(message, color, otherOptions);
    }

    public loading(
        message: string,
        durationSeconds: number,
        options: { color?: string; showTimestamp?: boolean | any } = {}
    ): void {
        const { color, showTimestamp } = options;
        const timestamp = this.displayTimestamp(showTimestamp, this.colors.blue);

        this.logInternal(`${message}${timestamp}`, color || 'reset', {
            loading: true,
            showTimestamp,
        });

        setTimeout(() => {
            if (this.loadingInterval) {
                clearInterval(this.loadingInterval);
                this.loadingInterval = null;
                this.log('', { color, showTimestamp });
            }
        }, durationSeconds * 1000);
    }

    public setCustomSetting(setting: string): void {
        this.customSetting = setting;
    }

    public setErrorCallback(callback: (error: Error) => void): void {
        this.errorCallback = callback;
    }

    public getCustomSetting(): string {
        return this.customSetting;
    }

    public success(
        message: string,
        options: { loading?: boolean; showTimestamp?: boolean } = {}
    ): void {
        this.logInternal(message, 'green', options);
    }

    public error(
        message: string,
        options: { loading?: boolean; showTimestamp?: boolean } = {}
    ): void {
        this.logInternal(message, 'red', options);
    }

    public warning(
        message: string,
        options: { loading?: boolean; showTimestamp?: boolean } = {}
    ): void {
        this.logInternal(message, 'yellow', options);
    }

    public info(
        message: string,
        options: { loading?: boolean; showTimestamp?: boolean } = {}
    ): void {
        this.logInternal(message, 'blue', options);
    }
}

const SounaConsole = new Console();

setTimeout(() => {
    process.exit();
}, 5000);

export { SounaConsole };