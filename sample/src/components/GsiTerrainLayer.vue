<template>
    <div id="gsiTerrainLayer"></div>
</template>

<script>
import { GsiTerrainLayer } from 'deckgl-gsi-terrain-layer';
import { MapboxLayer } from '@deck.gl/mapbox';
import { Deck } from '@deck.gl/core';
import mapboxgl from 'mapbox-gl';

const TERRAIN_IMAGE =
    'https://cyberjapandata.gsi.go.jp/xyz/dem_png/{z}/{x}/{y}.png';
const SURFACE_IMAGE =
    'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg';
const ELEVATION_DECODER = {
    scaler: 0.01,
    offset: 0,
};

let map;

export default {
    name: 'gsiTerrain',
    data() {
        return {};
    },
    async mounted() {
        this.render();
    },
    methods: {
        render() {
            map = new mapboxgl.Map({
                container: 'gsiTerrainLayer',
                style: {
                    version: 8,
                    sources: {},
                    layers: [],
                },
                center: [138.73, 35.36],
                zoom: 12,
                maxZoom: 20,
                pitch: 60,
            });

            const layer = new GsiTerrainLayer({
                id: 'gsiTerrain',
                minZoom: 0,
                maxZoom: 14,
                elevationDecoder: ELEVATION_DECODER,
                elevationData: TERRAIN_IMAGE,
                texture: SURFACE_IMAGE,
            });

            const deck = new Deck({
                gl: map.painter.context.gl,
                controller: true,
                layers: [layer],
            });

            map.on('load', () => {
                map.addLayer(new MapboxLayer({ id: 'gsiTerrain', deck }));
            });
        },
    },
};
</script>

<style scoped>
#gsiTerrainLayer {
    height: 100%;
    width: 100%;
}
</style>
