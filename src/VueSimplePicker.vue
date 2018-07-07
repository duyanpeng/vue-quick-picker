<!-- picker -->
<template>
  <div class="vsim-picker" :style="{fontFamily:defaultStyle.fontFamily || 'inherit',color:defaultStyle.color || '#808080',fontSize:defaultStyle.fontSize || '16px'}">
    <div class="vsim-picker-content" ref="parent">
      <ul class="vsim-picker-list" v-for="(list,index) in data" :key="index" @touchstart="onTouchStart($event,index)" @touchmove="onTouchMove($event,index)" @touchend="onTouchEnd($event,index)" :style="{textAlign: list.textAlign || 'center',flex:list.flex || 1}">
        <li class="vsim-picker-item" v-for="(item,number) in list.values" :key="number">{{list.valueKey ? item[list.valueKey]:item}}</li>
      </ul>
    </div>
    <div class="vsim-picker-line-top"></div>
    <div class="vsim-picker-line-bottom"></div>
  </div>
</template>

<script>
export default {
  name: "VuePicker",
  props: {
    data: {
      default: function() {
        return [];
      },
      type:Array
    },
    // 默认样式
    defaultStyle: {
      default: function() {
        return {
          fontSize: "16px",
          fontFamily: "inherit",
          color: "#808080"
        };
      },
      type:Object
    },
    // 是否展示滚轮样式
    wheelStyle: {
      default: true,
      type:Boolean
    }
  },
  data() {
    return {
      timer: "",
      value: []
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
    // 通过索引找到对应数据
    computeValue(value) {
      return value.map((item, index) => {
        return this.data[index].values[item];
      });
    },
    // 给选中的picker加active类名
    addClass(order, index, num = 2) {
      this.$nextTick(() => {
        [...this.$refs.parent.children[order].children].forEach(item => {
          item.className = "vsim-picker-item";
        });
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
      });
    },
    // 加载picker到默认选项
    pickerInit() {
      console.log(this.data)
      this.$nextTick(() => {
        [...this.$refs.parent.children].forEach((element, index) => {
          this.endMove(
            element,
            this.data[index].default,
            2 * parseFloat(this.defaultStyle.fontSize) || 32,
            0,
            index
          );
        });
      });
    },
    // 动画
    transformStyle(target, moveDistance, transition, timer = 200) {
      target.style["-webkit-transform"] =
        "translate3d(0," + moveDistance + "px,0)";
      if (transition) {
        target.style.transitionDuration = timer + "ms";
      }
    },
    onTouchStart(e, index) {
      e.preventDefault();
      const target = e.target.parentElement;
      const touch = e.touches[0];
      const touchY = touch.screenY;
      const screenY = touch.screenY;
      target.setAttribute("address-start", touchY);
      const timestamp = new Date().getTime(); // 当前时间戳
      target.setAttribute("start-time", timestamp);
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
    onTouchMove(e, index) {
      e.preventDefault();
      const target = e.target.parentElement;
      const touch = e.touches[0];

      const touchY = touch.screenY;
      // 获取移动距离
      const moveDistance = touchY - target.getAttribute("pos-start");
      target.setAttribute("pos-end", touchY);
      target.setAttribute("address-end", touchY);
      // 移动
      this.transformStyle(target, moveDistance);
    },
    onTouchEnd(e, order) {
      e.preventDefault();
      const step = 2 * parseFloat(this.defaultStyle.fontSize) || 32;
      const target = e.target.parentElement;
      const touchY = target.getAttribute("pos-end");
      const moveDistance = touchY - target.getAttribute("pos-start");
      let index = Math.abs(Math.round(moveDistance / step)); // 格子数

      // 记录移动的距离
      const absDistance =
        parseFloat(target.getAttribute("address-start")) -
        parseFloat(target.getAttribute("address-end"));
      const timestamp = new Date().getTime();
      // 记录间隔时间
      const timespace =
        timestamp - parseFloat(target.getAttribute("start-time"));
      const rate = Math.round(absDistance) / timespace; // 变化比值
      this.timer = rate * this.data[order].values.length / 5;
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
        this.$emit("change", this.computeValue(this.value));
      }
    }
  }
};
</script>

<style scoped>
.vsim-picker {
  position: relative;
  font-size: 16px;
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
  transform: scaleY(0.5);
}

.vsim-picker-line-bottom {
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
  /* font-size: 16px; */
}

.vsim-picker-item {
  height: 2em;
  line-height: 2em;
}
.vsim-picker-item-next {
  transform: scaleY(0.9);
}
.vsim-picker-item-far {
  transform: scaleY(0.8);
}
.vsim-picker-item-active {
  transform: scaleY(1);
  color: #474747;
}
</style>