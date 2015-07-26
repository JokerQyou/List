var app = require('app'),
    path = require('path'),
    Browser = require('browser-window');
    Tray = require('tray');
    Menu = require('menu');
require('crash-reporter').start();

var mainWindow = null,
    appIcon = null;

app.on('window-all-closed', function(){
    // if(process.platform !== 'darwin'){
        // app.quit();
    // }
});

var openMainWindow = function(){
    if(mainWindow === null){
        mainWindow = new Browser({
            height: 500,
            width: 800,
            frame: false,
            transparent: true,
            'standard-window': false
        });
        mainWindow.loadUrl('file://' + path.join(__dirname, 'vue', 'index.html'));
        mainWindow.on('close', function(e){
            if(mainWindow.isVisible()){
                mainWindow.hide();
                return e.preventDefault();
            }
        }).on('blur', function(){
            mainWindow.hide();
        }).center();
    }
    if(!mainWindow.isVisible()){
        mainWindow.show();
    }
};

app.on('ready', function(){
    appIcon = new Tray(path.join(__dirname, 'icon.png'));
    appIcon.setContextMenu(Menu.buildFromTemplate([
        {
            label: '清单',
            click: function(){
                if(mainWindow.isVisible()){
                    mainWindow.hide();
                }else{
                    openMainWindow();
                }
            }
        },
        {
            label: '退出',
            click: function(){
                app.quit();
            }
        }
    ]));
    openMainWindow();
    app.dock.hide();
}).on('before-quit', function(){
    if(mainWindow){
        mainWindow.close();
    }
});
