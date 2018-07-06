import Vue from 'vue'
import VueSimplePicker from './VueSimplePicker.vue'

Vue.component('vs-picker', VueSimplePicker)

new Vue({
    el: '#app',
    data: {
        data: [
            {
                flex: 1,
                values: [2016,2018,2018,2019],
                default: new Date().getYear() + 1900 - 2016,
                className: "slot1",
                textAlign: "center"
            },
            {
                flex: 1,
                values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                className: "slot3",
                default: new Date().getMonth(),
                textAlign: "center"
            },
            {
                flex: 1,
                default: new Date().getDate() - 1,
                  values: [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    20,
                    21,
                    22,
                    23,
                    24,
                    25,
                    26,
                    27,
                    28,
                    29,
                    30,
                    31
                  ],
                className: "slot3",
                textAlign: "center"
            }
        ]
    }
})