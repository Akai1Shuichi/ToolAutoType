const { app, BrowserWindow, clipboard } = require('electron');
const path = require('path');
const server = require('./index');
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');

  // Khởi chạy child process để chạy server Express
  server.listen(3000, () => {
    console.log('Server is on port 3000 !!!');
  });
  // Mở DevTools cho cửa sổ chính
  // win.webContents.openDevTools();

  // // Lắng nghe sự kiện context menu
  // win.webContents.on('context-menu', (e, params) => {
  //   const { x, y } = params;
  //   const copiedData = clipboard.readText();
  //   console.log(copiedData);

  //   // Kiểm tra xem có dữ liệu trong clipboard hay không
  //   if (copiedData) {
  //     // Đặt dữ liệu vào thẻ input hoặc vị trí mong muốn
  //     win.webContents.executeJavaScript(
  //       `
  //       document.querySelector('.name__input').value = "${copiedData}";
  //     `,
  //       true
  //     );
  //   }
  // });
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
