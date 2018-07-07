import Vue from 'vue';
import VueSimplePicker from '../src/VueSimplePicker.vue';
const expect = chai.expect;

Vue.config.productionTip = false
Vue.config.devtools = false

describe('VueSimplePicker', () => {
    it('存在', () => {
        expect(VueSimplePicker).to.be.ok
    })
    it('data参数正常', () => {
        const Constructor = Vue.extend(VueSimplePicker);
        const vm = new Constructor({
            propsData: {
                data: [
                    {
                        default: 0,
                        values: [2016, 2017, 2018]
                    },
                    {
                        default: 0,
                        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                    },
                    {
                        default: 0,
                        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
                    },
                ]
            }
        }).$mount()
        const el = vm.$el.querySelector('li')
        expect(el.innerText).to.equal('2016')
    })
    it('change事件执行', () => {
        const Constructor = Vue.extend(VueSimplePicker);
        let
            data = [
                {
                    default: 0,
                    values: [2016, 2017, 2018]
                },
                {
                    default: 0,
                    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                },
                {
                    default: 0,
                    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
                },
            ]

        const vm = new Constructor({
            propsData: {
                data: data
            }
        }).$mount()
        const callBack = sinon.fake();
        vm.$on('change', callBack)

        vm.data = [
            {
                default: 1,
                values: [2016, 2017, 2018]
            },
            {
                default: 2,
                values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
            },
            {
                default: 1,
                values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
            },
        ]

        vm.pickerInit()
        // TODO:还没想好怎么测
        // expect(callBack).to.have.been.called
    })
})