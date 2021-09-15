const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const schemasPath = path.join(vscode.workspace.rootPath, './src/component')
const writeFileTpl = require('./writeFileTpl.js');

module.exports = vscode.commands.registerCommand('shein-cv.helloWorld', async () =>{
  // vscode.window.showInformationMessage('开始生成文件夹!');
  let pathName = await vscode.window.showInputBox({
    placeHolder: '例如:outbound/xxxxx',
    prompt: '输入需要component路径下的文件夹地址,例如:outbound/xxxxx',
  });
  let tpl = await vscode.window.showQuickPick([
    {
      label: '1.标准的查询页面模版',
      value: 'template-searchPage',
    },
    {
      label: '2.列表详情页面模版',
      value: 'template-detailPage'
    },
  ], {
    placeHolder: '请选择模版',
  });

  if(pathName){
    let pathNameArr = pathName.split('/')
    for (let i = 0; i < pathNameArr.length; i++) {
      let _arr = pathNameArr.slice(0,i)
      let _path = _arr.length ? schemasPath +'/'+_arr.join('/'):schemasPath;
      let readDir = fs.readdirSync(_path);
        let isDir = false;
        readDir.forEach((list)=>{
          if (list === pathNameArr[i]){
            console.log(pathNameArr[i])
            isDir = true
          }
        }) 
        if(!isDir){
            fs.mkdirSync(_path+'/'+pathNameArr[i], { recursive: false })
            console.log('\x1B[32m%s\x1B[0m', `已生成${pathNameArr[i]}文件夹`)
        }
    }
    // TODO 判断是否生成文件
    // 模版
    const SearchPage = require('./template/'+ tpl.value+'/index.js')
    const SearchPagexConfig = require('./template/'+ tpl.value+'/config.json')
    // 创建对应文件
    writeFileTpl(pathName,SearchPage,SearchPagexConfig)
  }
  // let dirName = await vscode.window.showInputBox({
  //   placeHolder: '输入需要生成的文件夹名字',
  //   prompt: '输入需要生成的文件夹名字',
  // });
  // console.log('---', dirName)
  // console.log('---', vscode.workspace.name)
  // console.log('---', vscode.workspace.rootPath)
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
  // fs.mkdir(schemasPath, { recursive: false },
  // (err) => {
  //     if (err) throw err
  //     else {
  //         console.log('\x1B[32m%s\x1B[0m', `已生成文件夹`)
  //     }
  // })
//   fs.writeFile(schemasPathtest, '你好~','utf8',
//    function (err, data) {
//     if (err) {
//      console.log('----',err)
//         throw err
//     } else {
//    console.log('----',data)
//     }
// });
  // vscode.window.showWarningMessage('第一个警告信息')
  // vscode.window.showErrorMessage('第一个错误信息!');
});