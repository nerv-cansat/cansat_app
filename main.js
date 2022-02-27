const electron = require('electron')
    // Module to control application life.
const app = electron.app
    // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const { ipcMain } = require('electron');
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let tempWindow;
let pressureWindow;
let voltageWindow;
let rssiWindow;
let co2Window;
let pm25Window;
let humidityWindow;
let gasWindow;


function initTempWindow(){
    tempWindow = new BrowserWindow({
        width: 1300,
        height: 600,
        show: false,
        backgroundColor: '#191a1c',
        title: "Temperature",
        icon: __dirname + '/nerv.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // workaround to allow use with Electron 12+
        }
    })
    // and load the index.html of the app.
    tempWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'plot.html'),
        protocol: 'file:',
        slashes: true
    }))
}

function initPressureWindow(){
    pressureWindow = new BrowserWindow({
        width: 1300,
        height: 600,
        show: false,
        backgroundColor: '#191a1c',
        title: "Pressure",
        icon: __dirname + '/nerv.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // workaround to allow use with Electron 12+
        }
    })
    // and load the index.html of the app.
    pressureWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'plot.html'),
        protocol: 'file:',
        slashes: true
    }))
}

function initVoltageWindow(){
    voltageWindow = new BrowserWindow({
        width: 1300,
        height: 600,
        show: false,
        backgroundColor: '#191a1c',
        title: "Voltage",
        icon: __dirname + '/nerv.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // workaround to allow use with Electron 12+
        }
    })
    // and load the index.html of the app.
    voltageWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'plot.html'),
        protocol: 'file:',
        slashes: true
    }))
}

function initRSSIWindow(){
    rssiWindow = new BrowserWindow({
        width: 1300,
        height: 600,
        show: false,
        backgroundColor: '#191a1c',
        title: "RSSI",
        icon: __dirname + '/nerv.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // workaround to allow use with Electron 12+
        }
    })
    // and load the index.html of the app.
    rssiWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'plot.html'),
        protocol: 'file:',
        slashes: true
    }))
}

function initCO2Window(){
    co2Window = new BrowserWindow({
        width: 1300,
        height: 600,
        show: false,
        backgroundColor: '#191a1c',
        title: "CO2",
        icon: __dirname + '/nerv.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // workaround to allow use with Electron 12+
        }
    })
    // and load the index.html of the app.
    co2Window.loadURL(url.format({
        pathname: path.join(__dirname, 'plot.html'),
        protocol: 'file:',
        slashes: true
    }))
}

function initPM25Window(){
    pm25Window = new BrowserWindow({
        width: 1300,
        height: 600,
        show: false,
        backgroundColor: '#191a1c',
        title: "PM 10",
        icon: __dirname + '/nerv.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // workaround to allow use with Electron 12+
        }
    })
    // and load the index.html of the app.
    pm25Window.loadURL(url.format({
        pathname: path.join(__dirname, 'plot.html'),
        protocol: 'file:',
        slashes: true
    }))
}

function initHumidityWindow(){
    humidityWindow = new BrowserWindow({
        width: 1300,
        height: 600,
        show: false,
        backgroundColor: '#191a1c',
        title: "Humidity",
        icon: __dirname + '/nerv.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // workaround to allow use with Electron 12+
        }
    })
    // and load the index.html of the app.
    humidityWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'plot.html'),
        protocol: 'file:',
        slashes: true
    }))
}

function initGasWindow(){
    gasWindow = new BrowserWindow({
        width: 1300,
        height: 600,
        show: false,
        backgroundColor: '#191a1c',
        title: "Gasses",
        icon: __dirname + '/nerv.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false // workaround to allow use with Electron 12+
        }
    })
    // and load the index.html of the app.
    gasWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'plot.html'),
        protocol: 'file:',
        slashes: true
    }))
}

let mainWindow;





function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1300,
        height: 600,
        backgroundColor: '#191a1c',
        title: "CanSat receiver",
        icon: __dirname + '/nerv.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // workaround to allow use with Electron 12+
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    initTempWindow();
    initPressureWindow();
    initVoltageWindow();
    initRSSIWindow();
    initCO2Window();
    initPM25Window();
    initHumidityWindow();
    initGasWindow();

    ipcMain.on('temp-show', (event, arg)=>{
            initTempWindow();
            tempWindow.show();
        
    })
    ipcMain.on('pressure-show', (event, arg)=>{
            initPressureWindow();
            pressureWindow.show();
        
    })
    ipcMain.on('voltage-show', (event, arg)=>{
            initVoltageWindow();
            voltageWindow.show();
        
    })
    ipcMain.on('rssi-show', (event, arg)=>{
            initRSSIWindow();
            rssiWindow.show();
    })

    ipcMain.on('co2-show', (event, arg)=>{
            initCO2Window();
            co2Window.show();
    })
    ipcMain.on('pm25-show', (event, arg)=>{
        initPM25Window();
        pm25Window.show();
    })
    ipcMain.on('humidity-show', (event, arg)=>{
        initHumidityWindow();
        humidityWindow.show();
    })
    ipcMain.on('gas-show', (event, arg)=>{
        initGasWindow();
        gasWindow.show();
    })

    ipcMain.on('temp', (event,arg)=>{    
        if(!(tempWindow.isDestroyed())) tempWindow.webContents.send('info',arg);
    });
    ipcMain.on('pressure', (event,arg)=>{    
        if(!(pressureWindow.isDestroyed())) pressureWindow.webContents.send('info',arg);
    });
    ipcMain.on('voltage', (event,arg)=>{    
        if(!(voltageWindow.isDestroyed())) voltageWindow.webContents.send('info',arg);
    });
    ipcMain.on('rssi', (event,arg)=>{    
        if(!(rssiWindow.isDestroyed())) rssiWindow.webContents.send('info',arg);
    });
    ipcMain.on('co2', (event,arg)=>{    
        if(!(co2Window.isDestroyed())) co2Window.webContents.send('info',arg);
    });
    ipcMain.on('pm25', (event,arg)=>{    
        if(!(pm25Window.isDestroyed())) pm25Window.webContents.send('info',arg);
    });
    ipcMain.on('humidity', (event,arg)=>{    
        if(!(humidityWindow.isDestroyed())) humidityWindow.webContents.send('info',arg);
    });
    ipcMain.on('gas', (event,arg)=>{    
        if(!(gasWindow.isDestroyed())) gasWindow.webContents.send('info',arg);
    });
    // Open the DevTools.
    //mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
        process.exit();

        

    })
    tempWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        tempWindow = null;
    })
    pressureWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        pressureWindow = null;
    })
    voltageWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        voltageWindow = null;
    })
    rssiWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        rssiWindow = null;
    })
    co2Window.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        co2Window = null;
    })
    pm25Window.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        pm25Window = null;
    })
    humidityWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        humidityWindow = null;
    })
    gasWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        gasWindow = null;
    })
}


// This is required to be set to false beginning in Electron v9 otherwise
// the SerialPort module can not be loaded in Renderer processes like we are doing
// in this example. The linked Github issues says this will be deprecated starting in v10,
// however it appears to still be changed and working in v11.2.0
// Relevant discussion: https://github.com/electron/electron/issues/18397
app.allowRendererProcessReuse=false

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    app.quit();
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
