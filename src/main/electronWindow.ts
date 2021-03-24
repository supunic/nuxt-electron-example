export class ElectronWindow {
  private static instance: ElectronWindow

  static getInstance() {
    if (ElectronWindow.instance) return ElectronWindow.instance
    ElectronWindow.instance = new ElectronWindow()
    return ElectronWindow.instance
  }

  constructor(
    private window: any = null,
    private _width: Number = 1400,
    private _height: Number = 1000,
    private _preferences: Object = {},
    private _printOptions: Object = {},
  ) {}

  get width() {
    if (!this._width) {
      throw new Error('There is no width.')
    }
    return this._width
  }

  set width(value) {
    if (!value) {
      throw new Error('There is no width.')
    }
    this._width = value
  }

  get height() {
    if (!this._height) {
      throw new Error('There is no height.')
    }
    return this._height
  }

  set height(value) {
    if (!value) {
      throw new Error('There is no height.')
    }
    this._height = value
  }

  get preferences() {
    if (!this._preferences) {
      throw new Error('There is no preferences.')
    }
    return this._preferences
  }

  set preferences(value) {
    if (!value) {
      throw new Error('There is no preferences.')
    }
    this._preferences = value
  }

  get printOptions() {
    if (!this._printOptions) {
      throw new Error('There is no printOptions.')
    }
    return this._printOptions
  }

  set printOptions(value) {
    if (!value) {
      throw new Error('There is no printOptions.')
    }
    this._printOptions = value
  }

  public setWindow(BrowserWindow: any) {
    this.window = new BrowserWindow({
      width: this._width,
      height: this._height,
      webPreferences: this._preferences,
    })
    this.window.on('closed', () => (this.window = null))
  }

  public installVueDevtools(installExtension: any, VUEJS_DEVTOOLS: any) {
    installExtension(VUEJS_DEVTOOLS)
      .then((name: any) => {
        console.log(`Added Extension:  ${name}`)
        // this.window.webContents.openDevTools()
      })
      .catch((err: any) => console.log('An error occurred: ', err))
  }

  public load(url: String) {
    this.window.loadURL(url)
  }

  public print() {
    this.window.webContents.on('did-finish-load', () => {
      this.window.webContents.print(this._printOptions, (success: Boolean, errorType: String) => {
        console.log(success)
        if (!success) console.log(errorType)
      })
    })
  }
}
