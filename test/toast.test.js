const expect = chai.expect;
import Vue from 'vue'
import Toast from '../src/toast'

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Toast', () => {
    it('存在.', () => {
        expect(Toast).to.be.ok
    });

    describe('props', function () {

        it('接受 autoClose 参数', function (done) {
            let div = document.createElement('div');
            document.body.appendChild(div);
            const Constructor = Vue.extend(Toast);
            const vm = new Constructor({
                propsData: {
                    autoClose: 1,
                }
            }).$mount(div);
            vm.$on('close', () => {
                // 只要一关闭就直接测试
                expect(document.body.contains(vm.$el)).to.eq(false);
                done()
            });
        });

        it('接受 closeButton', function (done) {
            const callback = sinon.fake();
            const Constructor = Vue.extend(Toast);
            const vm = new Constructor({
                propsData: {
                    closeButton: {
                        text: '关闭吧',
                        callback,
                    },
                }
            }).$mount();
            // console.log(vm.$el.outerHTML);
            let closeButton = vm.$el.querySelector('.close');
            // console.log(closeButton);
            // console.log(closeButton.textContent.trim())
            expect(closeButton.textContent.trim()).to.eq('关闭吧');
            setTimeout(() => {
                closeButton.click();
                expect(callback).to.have.been.called;
                done()
            }, 200);
        });

        it('接受 enableHtml 参数', () => {
            const Constructor = Vue.extend(Toast);
            const vm = new Constructor({
                propsData: {
                    enableHtml: true,
                }
            });
            vm.$slots.default = ['<strong id="test">你好</strong>'];
            vm.$mount();
            let strong = vm.$el.querySelector('#test');
            expect(strong).to.exist
        });

        it('接受 position ', function () {
            const Constructor = Vue.extend(Toast);
            const vm = new Constructor({
                propsData: {
                    position: 'bottom',
                }
            }).$mount();
            expect(vm.$el.classList.contains('position-bottom')).to.eq(true)

        });
    })
});
