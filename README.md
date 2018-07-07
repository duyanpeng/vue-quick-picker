# vue-simple-picker
[![Build Status](https://travis-ci.org/duyanpeng/vue-simple-picker.svg?branch=master)](https://travis-ci.org/duyanpeng/vue-simple-picker)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/vue-simple-picker)
![Read the Docs](https://img.shields.io/readthedocs/pip.svg)

基于vue的适用于处理复杂数据的高度定制化的移动端picker插件

## 安装
---
`npm install vue-simple-picker -S`

```
import Vue from 'vue';
import VueSimplePicker from 'vue-simple-picker';
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
参数|类型|说明|备注
:--:|:--:|:--:|:--:
v-bind:data|数组[ {},{} ]|数据|picker展示的数据，如时间，地址等
v-on:change|函数function|回调函数|picker滚动展示的数据变化时触发,返回最新的数据

### data的配置:
参数|类型|说明|备注
:--:|:--:|:--:|:--:
values|数组[ ]|每列的数据|数据可以是字符串，数字，或者对象
default|数字 number|默认选中项的索引|
valueKey|字符串 string|当values数组内的值是对象时，通过该属性指定渲染字段|
textAlign|字符串string|指定文字的对齐方式|可选值'center','left','right',默认'center'


## 版本更新说明
---
版本号|说明|
:--:|:--:|
0.0.4|增加单元测试
0.0.3|增加readme文档
0.0.1|项目初始化

## 联系我
---
QQ:215028726
