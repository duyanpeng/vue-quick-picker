// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: "VueQuickPicker",
  props: {
    data: {
      default: function _default() {
        return [];
      },
      type: [Array, Object]
    },
    // 默认样式
    defaultStyle: {
      default: function _default() {
        return {
          fontSize: "18px",
          fontFamily: "inherit",
          color: "#808080"
        };
      },
      type: Object
    },
    // 是否展示滚轮样式
    wheelStyle: {
      default: true,
      type: Boolean
    },
    // 是否点击滚动
    canClick: {
      default: true,
      type: Boolean
    }
  },
  data: function data() {
    return {
      timer: "",
      value: [],
      lastValue: [] // 记录上一次的value值判断是否触发change事件
    };
  },


  components: {},

  computed: {},

  mounted: function mounted() {
    this.pickerInit();
  },

  watch: {
    data: {
      handler: function handler(nextProp, oldProp) {
        if (JSON.stringify(nextProp) === JSON.stringify(oldProp)) {
          return;
        }
        this.value = [];
        this.pickerInit();
      },
      deep: true
    }
  },
  methods: {
    movePurpose: function movePurpose(order, index, e) {
      this.endMove(e, parseInt(index), 2 * parseFloat(this.defaultStyle.fontSize) || 36, 0, order);
    },

    // 通过索引找到对应数据
    computeValue: function computeValue(value) {
      var _this = this;

      return value.map(function (item, index) {
        return _this.data[index].values[item];
      });
    },

    // 给选中的picker加active类名
    addClass: function addClass(order, index) {
      var _this2 = this;

      var num = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

      this.$nextTick(function () {
        // 初始化时，children[index-1]会报错
        try {
          if (_this2.wheelStyle) {
            if (_this2.$refs.parent.children[order].children[index + 1]) _this2.$refs.parent.children[order].children[index + 1].className = "vsim-picker-item vsim-picker-item-next";

            if (_this2.$refs.parent.children[order].children[index - 1]) _this2.$refs.parent.children[order].children[index - 1].className = "vsim-picker-item vsim-picker-item-next";

            if (_this2.$refs.parent.children[order].children[index + 2]) _this2.$refs.parent.children[order].children[index + 2].className = "vsim-picker-item vsim-picker-item-far";

            if (_this2.$refs.parent.children[order].children[index - 2]) _this2.$refs.parent.children[order].children[index - 2].className = "vsim-picker-item vsim-picker-item-far";
          }

          _this2.$refs.parent.children[order].children[index].className = "vsim-picker-item vsim-picker-item-active";
        } catch (e) {
          // console.warn(e.message, "vue-simple-picker");
        }
      });
    },

    // 设置picker的值
    setPickerValue: function setPickerValue(index, defaultValue) {
      this.endMove(this.$refs.parent.children[index], defaultValue, 2 * parseFloat(this.defaultStyle.fontSize) || 36, 0, index);
    },

    // 加载picker到默认选项
    pickerInit: function pickerInit() {
      var _this3 = this;

      var which = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.$nextTick(function () {
        if (which) {
          _this3.endMove(_this3.$refs.parent.children[which], _this3.data[which].default, 2 * parseFloat(_this3.defaultStyle.fontSize) || 36, 0, which);
          return;
        }
        [].concat(_toConsumableArray(_this3.$refs.parent.children)).forEach(function (element, index) {
          _this3.endMove(element, _this3.data[index].default, 2 * parseFloat(_this3.defaultStyle.fontSize) || 36, 0, index);
        });
      });
    },

    // 初始值刷新
    refresh: function refresh() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.pickerInit(count);
    },


    // 动画
    /**
     * target:目标元素
     * moveDistance:滚动距离
     * transition:是否开启动画
     * timer:动画时间
     */
    transformStyle: function transformStyle(target, moveDistance, transition) {
      var timer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;

      target.style["-webkit-transform"] = "translate3d(0," + moveDistance + "px,0)";
      target.style["transform"] = "translate3d(0," + moveDistance + "px,0)";
      if (transition) {
        target.style.transitionDuration = timer + "ms";
      }
    },


    // 触摸开始
    onTouchStart: function onTouchStart(e, index) {
      e.preventDefault();

      // 当触摸li时,确定target对象
      var target = e.target;
      if (e.target.tagName === "LI") {
        target = e.target.parentElement;
      } else {
        return;
      }

      // 清空选中的active样式
      [].concat(_toConsumableArray(this.$refs.parent.children[index].children)).forEach(function (item) {
        item.className = "vsim-picker-item";
      });

      var touch = e.touches[0];
      var touchY = touch.screenY;
      // 记录开始触摸时距屏幕顶端距离
      target.setAttribute("address-start", touchY);

      target.setAttribute("ismove", false); // 是否触发

      // 记录开始触摸时间
      var timestamp = new Date().getTime();
      target.setAttribute("start-time", timestamp);

      // 判断是否是第一次触摸
      if (!target.getAttribute("mov-distance")) {
        // 存储当前位置
        target.setAttribute("pos-start", touchY);
      } else {
        target.setAttribute("pos-start", touchY - parseFloat(target.getAttribute("mov-distance")));
      }
      target.style.transitionDuration = "0ms";
    },

    // 手指移动中
    onTouchMove: function onTouchMove(e, index) {
      e.preventDefault();
      var target = e.target;
      if (e.target.tagName === "LI") {
        target = e.target.parentElement;
      } else {
        return;
      }

      var touch = e.touches[0];

      var touchY = touch.screenY;
      // 获取移动距离
      var moveDistance = touchY - target.getAttribute("pos-start");
      target.setAttribute("pos-end", touchY);
      target.setAttribute("address-end", touchY);
      target.setAttribute("ismove", true); // 是否触发
      // 移动
      this.transformStyle(target, moveDistance);
    },

    // 手指离开
    onTouchEnd: function onTouchEnd(e, order) {
      e.preventDefault();
      var step = 2 * parseFloat(this.defaultStyle.fontSize) || 36;
      var target = e.target;
      if (e.target.tagName === "LI") {
        target = e.target.parentElement;
      } else {
        return;
      }

      var touchY = target.getAttribute("pos-end");
      var moveDistance = touchY - target.getAttribute("pos-start");

      // 判断应该移动多少个li
      var index = Math.abs(Math.round(moveDistance / step));

      // 记录移动的距离
      var absDistance = parseFloat(target.getAttribute("address-start")) - parseFloat(target.getAttribute("address-end") || target.getAttribute("address-start"));

      var timestamp = new Date().getTime();
      // 记录间隔时间
      var timespace = timestamp - parseFloat(target.getAttribute("start-time"));
      if (this.canClick && (Math.abs(absDistance) <= 15 || target.getAttribute("ismove") == "false") && timespace <= 90) {
        this.movePurpose(order, e.target.getAttribute("data-index"), target);
        return;
      }
      // 计算速度 = 距离/时间
      var rate = absDistance / timespace;
      // console.log(rate,'rate')
      this.timer = rate * 6;

      if (Math.abs(this.timer) <= 2) {
        this.timer = 0;
      }
      // 惯性滚动距离及速度
      index = Math.round(index + this.timer);
      var speed = 200;
      if (Math.abs(Math.floor(this.timer)) >= 2) {
        speed = 600;
      }
      if (Math.abs(Math.floor(this.timer)) >= 4) {
        speed = 600;
      }
      if (Math.abs(Math.floor(this.timer)) > 6) {
        speed = 800;
      }
      if (index < 0) {
        index = 0;
      }
      // 边界情况
      if (index > this.data[order].values.length - 1) {
        index = this.data[order].values.length - 1;
      }
      this.endMove(target, index, step, moveDistance, order, speed);
    },

    // 控制最后的滚动
    endMove: function endMove(target) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var step = arguments[2];
      var moveDistance = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var order = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var speed = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 200;

      target.setAttribute("mov-distance", -index * step);
      this.transformStyle(target, -index * step, true, speed);
      // 上边界判断
      if (moveDistance > 0 * step) {
        index = 0;
        this.transformStyle(target, index * step);
        target.setAttribute("mov-distance", index * step);
      }
      // 下边界判断
      if (moveDistance < -(this.data[order].values.length - 1) * step) {
        index = this.data[order].values.length - 1;
        this.transformStyle(target, -index * step);
        target.setAttribute("mov-distance", -index * step);
      }
      this.value[order] = index;
      this.addClass(order, index);
      if (this.value.length === this.data.length) {
        // 避免重复触发change事件
        if (JSON.stringify(this.lastValue) === JSON.stringify(this.value)) {} else {
          this.$emit("change", this.computeValue(this.value), JSON.parse(JSON.stringify(this.value)));
          this.lastValue = JSON.parse(JSON.stringify(this.value));
        }
      }
    }
  }
};
        var $f73c2b = exports.default || module.exports;
      
      if (typeof $f73c2b === 'function') {
        $f73c2b = $f73c2b.options;
      }
    
        /* template */
        Object.assign($f73c2b, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vsim-picker",style:({fontFamily:_vm.defaultStyle.fontFamily || 'inherit',color:_vm.defaultStyle.color || '#808080',fontSize:_vm.defaultStyle.fontSize || '16px'})},[_c('div',{staticClass:"vsim-picker-line-top"}),_vm._v(" "),_c('div',{ref:"parent",staticClass:"vsim-picker-content"},_vm._l((_vm.data),function(list,index){return _c('ul',{key:index,staticClass:"vsim-picker-list",style:({textAlign: list.textAlign || 'center',flex:list.flex || 1}),on:{"touchstart":function($event){$event.stopPropagation();_vm.onTouchStart($event,index)},"touchmove":function($event){$event.stopPropagation();_vm.onTouchMove($event,index)},"touchend":function($event){$event.stopPropagation();_vm.onTouchEnd($event,index)}}},_vm._l((list.values),function(item,number){return _c('li',{key:number,staticClass:"vsim-picker-item",attrs:{"data-index":number}},[_vm._v(_vm._s(list.valueKey ? item[list.valueKey]:item))])}))})),_vm._v(" "),_c('div',{staticClass:"vsim-picker-line-bottom"})])}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-f73c2b",
            functional: undefined
          };
        })());
      
},{}],1:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _VueSimplePicker = require('./src/VueSimplePicker.vue');

var _VueSimplePicker2 = _interopRequireDefault(_VueSimplePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Vue) {
    Vue.component('quick-picker', _VueSimplePicker2.default);
};
},{"./src/VueSimplePicker.vue":3}]},{},[1], null)
//# sourceMappingURL=/index.map