const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 600,
        backgroundColor: '#191a1c',
        title: "CanSat odbiornik",
        icon: __dirname + '/nerv.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, 
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.on('closed', function() {

        mainWindow = null
    })
}

app.allowRendererProcessReuse=false


app.on('ready', createWindow)

app.on('window-all-closed', function() {
    app.quit()
})

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow()
    }
})
