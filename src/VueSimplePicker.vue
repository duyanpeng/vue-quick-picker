<!-- picker -->
<template>
  <div class="vsim-picker" :style="{fontFamily:defaultStyle.fontFamily || 'inherit',color:defaultStyle.color || '#808080',fontSize:defaultStyle.fontSize || '16px'}">
    <div class="vsim-picker-line-top"></div>
    <div class="vsim-picker-content" ref="parent">
      <ul class="vsim-picker-list" v-for="(list,index) in data" :key="index" @touchstart.stop="onTouchStart($event,index)" @touchmove.stop="onTouchMove($event,index)" @touchend.stop="onTouchEnd($event,index)" :style="{textAlign: list.textAlign || 'center',flex:list.flex || 1}">
        <li class="vsim-picker-item" v-for="(item,number)  in list.values" :data-index="number" :key="number">{{list.valueKey ? item[list.valueKey]:item}}</li>
      </ul>
    </div>
    <div class="vsim-picker-line-bottom"></div>
  </div>
</template>

<script>
export default {
  name: "VueQuickPicker",
  props: {
    data: {
      default: function() {
        return [];
      },
      type: [Array, Object]
    },
    // 默认样式
    defaultStyle: {
      default: function() {
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
  data() {
    return {
      timer: "",
      value: [],
      lastValue: [] // 记录上一次的value值判断是否触发change事件
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.pickerInit();
  },
  watch: {
    data: {
      handler: function(nextProp, oldProp) {
       
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
    movePurpose(order, index, e) {
      this.endMove(
        e,
        parseInt(index),
        2 * parseFloat(this.defaultStyle.fontSize) || 36,
        0,
        order
      );
    },
    // 通过索引找到对应数据
    computeValue(value) {
      return value.map((item, index) => {
        return this.data[index].values[item];
      });
    },
    // 给选中的picker加active类名
    addClass(order, index, num = 2) {
      this.$nextTick(() => {
        // 初始化时，children[index-1]会报错
        try {
          if (this.wheelStyle) {
            if (this.$refs.parent.children[order].children[index + 1])
              this.$refs.parent.children[order].children[index + 1].className =
                "vsim-picker-item vsim-picker-item-next";

            if (this.$refs.parent.children[order].children[index - 1])
              this.$refs.parent.children[order].children[index - 1].className =
                "vsim-picker-item vsim-picker-item-next";

            if (this.$refs.parent.children[order].children[index + 2])
              this.$refs.parent.children[order].children[index + 2].className =
                "vsim-picker-item vsim-picker-item-far";

            if (this.$refs.parent.children[order].children[index - 2])
              this.$refs.parent.children[order].children[index - 2].className =
                "vsim-picker-item vsim-picker-item-far";
          }

          this.$refs.parent.children[order].children[index].className =
            "vsim-picker-item vsim-picker-item-active";
        } catch (e) {
        //  console.warn(e.message, "vue-simple-picker");
        }
      });
    },
    // 设置picker的值
    setPickerValue(index, defaultValue) {
      this.endMove(
        this.$refs.parent.children[index],
        defaultValue,
        2 * parseFloat(this.defaultStyle.fontSize) || 36,
        0,
        index
      );
    },
    // 加载picker到默认选项
    pickerInit(which = false) {
      this.$nextTick(() => {
        if (which) {
          this.endMove(
            this.$refs.parent.children[which],
            this.data[which].default,
            2 * parseFloat(this.defaultStyle.fontSize) || 36,
            0,
            which
          );
          return
        }
        [...this.$refs.parent.children].forEach((element, index) => {
          this.endMove(
            element,
            this.data[index].default,
            2 * parseFloat(this.defaultStyle.fontSize) || 36,
            0,
            index
          );
        });
      });
    },
    // 初始值刷新
    refresh(count = false) {
      this.pickerInit(count);
    },
    // 动画
    transformStyle(target, moveDistance, transition, timer = 200) {
      target.style["-webkit-transform"] =
        "translate3d(0," + moveDistance + "px,0)";
      target.style["transform"] = "translate3d(0," + moveDistance + "px,0)";
      if (transition) {
        target.style.transitionDuration = timer + "ms";
      }
    },
    // 触摸开始
    onTouchStart(e, index) {
      e.preventDefault();

      // 当触摸li时,确定target对象
      let target = e.target;
      if (e.target.tagName === "LI") {
        target = e.target.parentElement;
      } else {
        return;
      }

      // 清空选中的active样式
      [...this.$refs.parent.children[index].children].forEach(item => {
        item.className = "vsim-picker-item";
      });
      
      const touch = e.touches[0];
      const touchY = touch.screenY;
      // 记录开始触摸时距屏幕顶端距离
      target.setAttribute("address-start", touchY);

      target.setAttribute("ismove", false); // 是否触发

      // 记录开始触摸时间
      const timestamp = new Date().getTime();
      target.setAttribute("start-time", timestamp);

      // 判断是否是第一次触摸
      if (!target.getAttribute("mov-distance")) {
        // 存储当前位置
        target.setAttribute("pos-start", touchY);
      } else {
        target.setAttribute(
          "pos-start",
          touchY - parseFloat(target.getAttribute("mov-distance"))
        );
      }
      target.style.transitionDuration = "0ms";
    },
    // 手指移动中
    onTouchMove(e, index) {
      e.preventDefault();
      let target = e.target;
      if (e.target.tagName === "LI") {
        target = e.target.parentElement;
      } else {
        return;
      }

      const touch = e.touches[0];

      const touchY = touch.screenY;
      // 获取移动距离
      const moveDistance = touchY - target.getAttribute("pos-start");
      target.setAttribute("pos-end", touchY);
      target.setAttribute("address-end", touchY);
      target.setAttribute("ismove", true); // 是否触发
      // 移动
      this.transformStyle(target, moveDistance);
    },
    // 手指离开
    onTouchEnd(e, order) {
      e.preventDefault();
      const step = 2 * parseFloat(this.defaultStyle.fontSize) || 36;
      let target = e.target;

      if (e.target.tagName === "LI") {
        target = e.target.parentElement;
      } else {
        return;
      }

      const touchY = target.getAttribute("pos-end");
      const moveDistance = touchY - target.getAttribute("pos-start");

      // 判断应该移动多少个li
      let index = Math.abs(Math.round(moveDistance / step));

      // 记录移动的距离
      const absDistance =
        parseFloat(target.getAttribute("address-start")) -
        parseFloat(
          target.getAttribute("address-end") ||
            target.getAttribute("address-start")
        );

      const timestamp = new Date().getTime();
      // 记录间隔时间
      const timespace =
        timestamp - parseFloat(target.getAttribute("start-time"));
      if (
        this.canClick &&
        (Math.abs(absDistance) <= 15 ||
          target.getAttribute("ismove") == "false") &&
        timespace <= 90
      ) {
        this.movePurpose(order, e.target.getAttribute("data-index"), target);
        return;
      }
      // 计算速度 = 距离/时间
      const rate = absDistance / timespace;
      // console.log(rate,'rate')
      this.timer = rate * 6;

      if (Math.abs(this.timer) <= 2) {
        this.timer = 0;
      }
      // 惯性滚动距离及速度
      index = Math.round(index + this.timer);
      let speed = 200;
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
    endMove(target, index = 0, step, moveDistance = 0, order = 0, speed = 200) {
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
        if (JSON.stringify(this.lastValue) === JSON.stringify(this.value)) {
        } else {
          this.$emit("change", this.computeValue(this.value));
          this.lastValue = JSON.parse(JSON.stringify(this.value));
        }
      }
    }
  }
};
</script>

<style scoped>
.vsim-picker {
  position: relative;
  height: 10em;
  overflow: hidden;
}
.vsim-picker-content {
  display: flex;
  height: 10em;
  overflow: hidden;
}

.vsim-picker-line-top {
  position: absolute;
  width: 100%;
  height: 1px;
  top: 4em;
  left: 0;
  background: #e2e2e2;
  overflow: hidden;
  transform: scaleY(0.5);
}

.vsim-picker-line-bottom {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 1px;
  top: 6em;
  left: 0;
  background: #e2e2e2;
  transform: scaleY(0.5);
}

.vsim-picker-list {
  margin-top: 4em;
  flex: 1;
}

.vsim-picker-item {
  height: 2em;
  line-height: 2em;
}
.vsim-picker-item-next {
  transform: scaleY(0.9) translateZ(0);
}
.vsim-picker-item-far {
  transform: scaleY(0.8) translateZ(0);
}
.vsim-picker-item-active {
  transform: scaleY(1) translateZ(0);
  color: #474747;
}
</style>