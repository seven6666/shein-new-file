const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const schemasPath = path.join(__dirname, './index.js')
const schemasPathtest = path.join(__dirname, './test.txt')

module.exports = vscode.commands.registerCommand('shein-cv.helloWorld', function () {
  vscode.window.showInformationMessage('开始生成文件夹!');
  console.log('---',schemasPathtest)
   //读取模板文件tmpform.vue
  //  fs.readFile(schemasPath, 'utf8',
  //  function (err, data) {
  //      if (err) {
  //       console.log('----',err)
  //          throw err
  //      } else {
  //     console.log('----',data)
  //      }
  //  })
  fs.writeFile(schemasPathtest, '你好~','utf8',
   function (err, data) {
    if (err) {
     console.log('----',err)
        throw err
    } else {
   console.log('----',data)
    }
});
  // vscode.window.showWarningMessage('第一个警告信息')
  // vscode.window.showErrorMessage('第一个错误信息!');
});