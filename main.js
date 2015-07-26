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
};

app.on('ready', function(){
    appIcon = new Tray(path.join(__dirname, 'icon.png'));
    appIcon.on('clicked', function(){
        if(mainWindow){
            mainWindow.show();
        }else{
            openMainWindow();
        }
    });
    openMainWindow();
});
