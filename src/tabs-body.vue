<template>
    <div class="tabs-body">
        <slot></slot>
    </div>

</template>

<script>
    export default {
        name: "GuLuTabsBody",
        inject: ['eventBus'],
        created() {

        }

    }
</script>

<style scoped lang="scss">
    .tabs-body {

    }
</style>