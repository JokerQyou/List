var app = require('app');
var browser = require('browser-window');
require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('ready', function(){
    mainWindow = new browser({height: 600, width: 800});
    mainWindow.loadUrl('http://weibo.com');
    mainWindow.on('closed', function(){
        mainWindow = null;
    })
});
