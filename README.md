# shein-cv

<!-- code_chunk_output -->

* [特性](#特性)
* [安装](#安装)
* [使用方式](#使用方式)
  * [本插件核心功能](#本插件核心功能)
    * [步骤](#步骤)
    * [特别说明](#特别说明)
    * [命令描述](#命令描述)
* [计划支持的项目类型](#计划支持的项目类型)


这是一个VSCode方便用户创建创建模版文件夹和文件的扩展

这个扩展旨在使VSCode快速创建对应的项目模版,简化复制粘贴的操作
## 演示
![演示](https://github.com/seven6666/shein-new-file/blob/main/img/handle.gif?raw=true)
## 特性

***

* 在工作区的任意位置创建各种模版文件夹，文件内容基于模板和用户输入生成
* 完全键盘操作
* 自定义路径选择器，更好的交互与UI
* 利用自定义路径选择器，实现文件或目录的拷贝、复制和重命名等常见文件系统操作
* 模版不断迭代 目前支持两种模版
     1.标准的查询页面模版
     2.列表详情页面模版

<!-- /code_chunk_output -->

## 安装

***

运行VSCode快速打开面板（<kbd>Ctrl+P</kbd>），粘贴如下命令并按回车确认

```
ext install shein-cv
```

## 运行
步骤
本扩展使用一般分为3个步骤，分别是：激活命令、输入生成的路径、 选择文件模板

**第一步：** 使用命令面板菜单激活（<kbd>shift+command+P</kbd>）搜索wms

![工作区添加目录](https://github.com/seven6666/shein-new-file/blob/main/img/open-workspace.png?raw=true)




**第二步：** 输入生成在src/component 下的路径

* 例如 想在src/component/outbound 下新建一下文件夹xxx目录
* 就可以输入 outbound/xxx  回车就可以

![路径](https://github.com/seven6666/shein-new-file/blob/main/img/custom-path-selector.jpg?raw=true)




**第三步：** 选择生成对应的模版

![模版](https://github.com/seven6666/shein-new-file/blob/main/img/template.jpg?raw=true)

* 1.标准的查询页面模版对应
* 2.列表详情页面模版




<!-- # 打包命令
vsce package -->