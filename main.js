const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

let win;


function createWindow () {
  // Crea la ventana del navegador.
   win = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    }
  })

  // y carga el  index.html de la aplicación.
  win.on('closed', () => {
      app.quit()
  });

  win.loadFile('index.html')

};


app.whenReady().then(createWindow)

const templateMenu = [
    {
        label: 'File',
        submenu: [
             
            {
                label: 'Exit',
                accelerator: 'Ctrl + Q',
                click(){
                    app.quit();
                }
            },
            {
                label: 'Passwords',
                accelerator: 'Ctrl + N',
                click(){
                    confirmTxt();
                }
            },
            {
                label: 'DevTools',
                accelerator: 'Ctrl + D',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
            
            
        ]
    }
]

const mainMenu = Menu.buildFromTemplate(templateMenu);
Menu.setApplicationMenu(mainMenu);

let newTxt;

ipcMain.on('new:file', (e, newFile) => {
    win.webContents.send('new:file', newFile)
    newTxt.close();
});


function confirmTxt() {
    newTxt = new BrowserWindow({
        width: 400,
        height: 700,
        title: 'Confirm password',
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
          }
    })
    //newTxt.setMenu(null);
    newTxt.loadFile('confirmTxt.html')
};



