<template>
    <div class="tabs">
        <slot></slot>
    </div>

</template>

<script>
    import Vue from 'vue'

    export default {
        name: "GuLuTabs",
        props: {
            selected: {
                type: String,
                required: true, // 必须输入 selected 这个值，如果没有输入也会在控制台显式报错
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator(value) {
                    // return ['horizontal', 'vertical'].includes(value)
                    return ['horizontal', 'vertical'].indexOf(value) > -1;
                }
            }
        },
        data() {
            return {
                eventBus: new Vue
            }
        },
        provide() {
            // 事件中心，订阅发布
            return {
                eventBus: this.eventBus
            }
        },
        mounted() {
            // 只能获取子组件不能获取子元素，所以长度 为0 就是没有子组件
            if (this.$children.length === 0) {
                console && console.warn &&
                console.warn('tabs 的子组件应该是tabs-head和 tabs-body,但你没有写子组件')
            }
            // 找儿子，儿子里找孙子，孙子里哪个是
            this.$children.forEach((vm) => {
                if (vm.$options.name === 'GuLuTabsHead') {
                    vm.$children.forEach((childVm) => {
                        if (childVm.$options.name === 'GuLuTabsItem' && childVm.name === this.selected) {
                            this.eventBus.$emit('update:selected', this.selected, childVm);
                        }
                    })
                }

            })
        },
        created() {
            this.$emit('update:selected', '这是一个 this.$emit 出来的数据');
            this.eventBus.$emit('update:selected', 'this.eventBus.$emit 出来的数据');
            // this.$emit('update:selected','xxx')
        }
    }
</script>

<style scoped lang="scss">
    .tabs {

    }

</style>