const fs = require('fs');
const vscode = require('vscode');
const path = require('path');

module.exports = (pathName, SearchPage, SearchPagexConfig)=>{
    for(let fileName in SearchPagexConfig){
        if(typeof SearchPagexConfig[fileName] === 'object') {
            const mkdirSchemasPath = path.join(vscode.workspace.rootPath, './src/component/'+pathName+'/'+fileName)
            fs.mkdirSync(mkdirSchemasPath, { recursive: false })
            for(let jsxlist in SearchPagexConfig[fileName]){ 
                const jsxSchemasPath = mkdirSchemasPath+'/'+jsxlist+'.'+SearchPagexConfig[fileName][jsxlist]
                fs.writeFile(jsxSchemasPath, SearchPage[jsxlist](),'utf8',
                function (err) {
                    if (err) {
                        throw err
                    } else {
                        console.log('\x1B[32m%s\x1B[0m', `已生成${fileName}/${jsxlist}的文件`)
                    }
                });
            }
        }else{
            const schemasPath = path.join(vscode.workspace.rootPath, './src/component/'+pathName+'/'+fileName+'.'+SearchPagexConfig[fileName])
            fs.writeFile(schemasPath, SearchPage[fileName](),'utf8',
            function (err) {
                if (err) {
                    throw err
                } else {
                    console.log('\x1B[32m%s\x1B[0m', `已生成${fileName}的文件`)
                }
            });
        }
    }
}
