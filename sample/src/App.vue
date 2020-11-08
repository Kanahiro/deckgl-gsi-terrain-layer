<template>
    <div id="app">
        <GsiTerrainLayer />
    </div>
</template>

<script>
import GsiTerrainLayer from './components/GsiTerrainLayer.vue';

export default {
    name: 'App',
    components: {
        GsiTerrainLayer,
    },
};
</script>

<style>
#app {
    height: 1000px;
    width: 1000px;
}
</style>
