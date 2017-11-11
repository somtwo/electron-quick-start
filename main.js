const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const onWindows = process.platform === 'win32';

if (onWindows) {
	// Ignore dpi scaling
	app.commandLine.appendSwitch('high-dpi-support', 'true');
	app.commandLine.appendSwitch('force-device-scale-factor', 1.0);
}

let mainWindow

function createWindow () {
  // This window will be an incorrect size (I'm seeing 800 x 620)
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
		useContentSize: true,
		resizable: false,
    show: false
  });

  mainWindow.setMenu(null);

  if(onWindows) {
    // Uncomment the next line and it will be a different (incorrect) size
    //mainWindow.setSize(800, 600);
  }

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.once('ready-to-show', () => {
		mainWindow.show()
	});

  mainWindow.webContents.openDevTools({
    mode: 'detach'
  });

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
