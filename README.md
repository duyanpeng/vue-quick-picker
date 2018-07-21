# vue-simple-picker
[![Build Status](https://travis-ci.org/duyanpeng/vue-simple-picker.svg?branch=master)](https://travis-ci.org/duyanpeng/vue-simple-picker)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/vue-simple-picker)
![Read the Docs](https://img.shields.io/readthedocs/pip.svg)

基于vue的适用于处理复杂数据的高度定制化的移动端picker插件

## 安装
---
`npm install vue-simple-picker -S`

```
// 使用vue-cli webpack时在main.js中引入
import Vue from 'vue';

import VueSimplePicker from 'vue-simple-picker';

Vue.use(VueSimplePicker)
```
```
// 直接引用打包之后的版本，不推荐使用，推荐使用上面的方法引入
import Vue from 'vue';
// 注意引用的是 vue-simple-picker下的index.js
import VueSimplePicker from 'vue-simple-picker/dist/index.js';
import 'vue-simple-picker/dist/index.css';  // 引入插件相关的css

Vue.use(VueSimplePicker)
```
## 使用
---
```html
<template>
    <div>
        <vs-picker :data="data" @change="handleChange"></vs-picker>
    </div>
</template>
```
```javascript
export default {
    data(){
        return {
            data:[
                {
                    default:0,
                    values:[2016,2017,2018]
                },
                {
                    default:0,
                    values:[1,2,3,4,5,6,7,8,9,10,11,12]
                },
                {
                    default:0,
                    values:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
                },
            ]
        }
    },
    methods:{
        handleChange(value){
            console.log(value); // [2016,1,1]
        }
    }
}
```

## 配置
---
参数|类型|说明|备注
:--:|:--:|:--:|:--:
v-bind:data|数组[ {},{} ]|数据|picker展示的数据，如时间，地址等
v-on:change|函数function|回调函数|picker滚动展示的数据变化时触发,返回最新的数据
defaultStyle|对象{}|滚动条目的展现样式|{fontFamily:'inherit',fontSize:'16px',color:'#808080'}提供的配置项
wheelStyle|布尔true/false|是否展示3D样式|默认是true
ref.refresh|函数|切换数据重置default值时需要调用告诉picker初始化|
---
### data的配置:
参数|类型|说明|备注
:--:|:--:|:--:|:--:
values|数组[ ]|每列的数据|数据可以是字符串，数字，或者对象
default|数字 number|默认选中项的索引|
valueKey|字符串 string|当values数组内的值是对象时，通过该属性指定渲染字段|
textAlign|字符串string|指定文字的对齐方式|可选值'center','left','right',默认'center'
flex|数字number|占宽度的比例|默认：1
---
### 选中条目样式覆盖方法:
![shuoming](/static/shuoming.jpg)
当前组件类名(或id名)  >>> .vsim-picker-item-active
例如:
```css
// 使选中的条目为黑色
.parent >>> .vsim-picker-item-active{
    color:black;
    font-size:20px;
}

// 使选中的条目上下两条缩小产生3D效果(wheelStyle为true时生效)
.parent >>> .vsim-picker-item-next{
    transform: scaleY(0.9);
}

// 使picker边界上下两条缩小产生3D效果(wheelStyle为true时生效)
.parent >>> .vsim-picker-item-far{
    transform: scaleY(0.8);
}

```

## 版本更新说明
---
版本号|说明|
:--:|:--:|
0.0.5|增加样式拓展功能
0.0.4|增加单元测试
0.0.3|增加readme文档
0.0.1|项目初始化

## 联系我
---
QQ:215028726
