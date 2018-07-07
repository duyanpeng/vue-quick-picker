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
  name: "VuePicker",
  props: {
    data: {
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      timer: "",
      value: []
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
        if (_this2.$refs.parent.children[order].children[index + 1]) _this2.$refs.parent.children[order].children[index + 1].className = "vsim-picker-item vsim-picker-item-scale9";

        if (_this2.$refs.parent.children[order].children[index - 1]) _this2.$refs.parent.children[order].children[index - 1].className = "vsim-picker-item vsim-picker-item-scale9";

        if (_this2.$refs.parent.children[order].children[index + 2]) _this2.$refs.parent.children[order].children[index + 2].className = "vsim-picker-item vsim-picker-item-scale8";

        if (_this2.$refs.parent.children[order].children[index - 2]) _this2.$refs.parent.children[order].children[index - 2].className = "vsim-picker-item vsim-picker-item-scale8";

        _this2.$refs.parent.children[order].children[index].className = "vsim-picker-item vsim-picker-item-active";
      });
    },

    // 加载picker到默认选项
    pickerInit: function pickerInit() {
      var _this3 = this;

      this.$nextTick(function () {
        [].concat(_toConsumableArray(_this3.$refs.parent.children)).forEach(function (element, index) {
          _this3.endMove(element, _this3.data[index].default, 32, 0, index);
        });
      });
    },

    // 动画
    transformStyle: function transformStyle(target, moveDistance, transition) {
      var timer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;

      target.style["-webkit-transform"] = "translate3d(0," + moveDistance + "px,0)";
      if (transition) {
        target.style.transitionDuration = timer + "ms";
      }
    },
    onTouchStart: function onTouchStart(e, index) {
      e.preventDefault();
      var target = e.target.parentElement;
      var touch = e.touches[0];
      var touchY = touch.screenY;
      var screenY = touch.screenY;
      target.setAttribute("address-start", touchY);
      var timestamp = new Date().getTime(); // 当前时间戳
      target.setAttribute("start-time", timestamp);
      if (!target.getAttribute("mov-distance")) {
        // 存储当前位置
        target.setAttribute("pos-start", touchY);
      } else {
        target.setAttribute("pos-start", touchY - parseFloat(target.getAttribute("mov-distance")));
      }
      target.style.transitionDuration = "0ms";
    },
    onTouchMove: function onTouchMove(e, index) {
      e.preventDefault();
      var target = e.target.parentElement;
      var touch = e.touches[0];

      var touchY = touch.screenY;
      // 获取移动距离
      var moveDistance = touchY - target.getAttribute("pos-start");
      target.setAttribute("pos-end", touchY);
      target.setAttribute("address-end", touchY);
      // 移动
      this.transformStyle(target, moveDistance);
    },
    onTouchEnd: function onTouchEnd(e, order) {
      e.preventDefault();
      var step = 32;
      var target = e.target.parentElement;
      var touchY = target.getAttribute("pos-end");
      var moveDistance = touchY - target.getAttribute("pos-start");
      var index = Math.abs(Math.round(moveDistance / step)); // 格子数

      // 记录移动的距离
      var absDistance = parseFloat(target.getAttribute("address-start")) - parseFloat(target.getAttribute("address-end"));
      var timestamp = new Date().getTime();
      // 记录间隔时间
      var timespace = timestamp - parseFloat(target.getAttribute("start-time"));
      var rate = Math.round(absDistance) / timespace; // 变化比值
      this.timer = rate * this.data[order].values.length / 5;
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
        this.$emit("change", this.computeValue(this.value));
      }
    }
  }
};
        var $124d14 = exports.default || module.exports;
      
      if (typeof $124d14 === 'function') {
        $124d14 = $124d14.options;
      }
    
        /* template */
        Object.assign($124d14, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vsim-picker"},[_c('div',{ref:"parent",staticClass:"vsim-picker-content"},_vm._l((_vm.data),function(list,index){return _c('ul',{key:index,staticClass:"vsim-picker-list",style:({textAlign: list.textAlign || 'center'}),on:{"touchstart":function($event){_vm.onTouchStart($event,index)},"touchmove":function($event){_vm.onTouchMove($event,index)},"touchend":function($event){_vm.onTouchEnd($event,index)}}},_vm._l((list.values),function(item,number){return _c('li',{key:number,staticClass:"vsim-picker-item"},[_vm._v(_vm._s(list.valueKey ? item[list.valueKey]:item))])}))})),_vm._v(" "),_c('div',{staticClass:"vsim-picker-line-top"}),_vm._v(" "),_c('div',{staticClass:"vsim-picker-line-bottom"})])}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-124d14",
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
    Vue.component('vs-picker', _VueSimplePicker2.default);
};
},{"./src/VueSimplePicker.vue":3}]},{},[1], null)
//# sourceMappingURL=/index.map