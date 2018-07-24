import Vue from 'vue'
import VueSimplePicker from './VueSimplePicker.vue'

Vue.component('vs-picker', VueSimplePicker)
// 输入初始年份，生成到当前年数组
function initYearValue(year) {
    let arr = [];
    let length = new Date().getYear() + 1900;
    for (let i = year; i <= length; i++) {
        arr.push(i);
    }
    return arr;
}
// 输入最大月份，生成月份数组
function initLimitMonth(month) {
    let arr = [];
    for (let i = 1; i <= parseFloat(month); i++) {
        arr.push(i);
    }
    return arr;
}
// 输入最大日期，生成日期数组
function initLimitDay(day) {
    let arr = [];
    for (let i = 1; i <= parseFloat(day); i++) {
        arr.push(i);
    }
    return arr;
}

new Vue({
    el: '#app',
    data: {
        value: [],
        data: [
            {
                values: initYearValue(2015),
                default: new Date().getYear() + 1900 - 2015,
            },
            {
                values: initLimitMonth(12),
                default: new Date().getMonth(),
            },
            {
                default: new Date().getDate() - 1,
                values: initLimitDay(31),
            }
        ]
    },
    methods: {
        // 获得时间回调
        handleChange(values = []) {
            // 当前年月日
            const nYear = new Date().getYear() + 1900;
            const nMonth = new Date().getMonth() + 1;
            const nDay = new Date().getDate();
            // 年或月改变都要重新计算该月的最大天数
            if (values[0] !== this.value[0] || values[1] !== this.value[1]) {
                this.refreshDay(values[0], values[1], values[2])
            }
            if (values[0] !== nYear) {
                this.refreshMonth()
            }
            // 当年等于当前年时，限制最大月
            if (values[0] === nYear) {
                this.refreshMonth(values[1])
            }
            // 当年月等于当前日期时，限制最多只能选择当前日期
            if (values[0] === nYear && values[1] === nMonth) {
                this.refreshDay(values[0], values[1], values[2], new Date().getDate())
            }
            this.value = values;

        },
        // 根据年月 返回当月最大天数，如31天30天或2月的28天或29天等情况
        getMonthDay(year, month) {
            var dayNum = new Date(year, month, 0); //获取当月的最后一天
            let day = dayNum.getDate();
            return day;
        },
        // 重新生成最大天数
        refreshDay(year, month, day, limitDay = false) {
            // 最后一天
            const lastDay = limitDay ? limitDay : this.getMonthDay(year, month);
            const dayValues = initLimitDay(lastDay);
            const dayItem = {
                values: dayValues,
                // 如果已经选中了大于该月最后一天的天数，则滚动到该月最后一天
                default: day > lastDay - 1 ? lastDay - 1 : day - 1,
            }
            this.$set(this.data, 2, dayItem);
            // default改变重新刷新picker参数传index
            this.$refs.picker.refresh(2);
        },
        // 重新生成最大月
        refreshMonth(month) {
            if (!month) {
                this.data[1].values = initLimitMonth(12)
                return
            }
            const monthItem = {
                values: initLimitMonth(new Date().getMonth() + 1),
                // 如果已经选中了大于该月最后一天的天数，则滚动到该月最后一天
                default: month > new Date().getMonth() + 1 ? new Date().getMonth() : month - 1,
            }
            this.$set(this.data, 1, monthItem);
            // default改变重新刷新picker参数传index
            this.$refs.picker.refresh(1);
        }

    },
    mounted() {

    }
})