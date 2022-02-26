// @ts-ignore
import { GsiTerrainLayer } from '../index.js';
import { Deck } from '@deck.gl/core';

const TERRAIN_IMAGE =
    'https://cyberjapandata.gsi.go.jp/xyz/dem_png/{z}/{x}/{y}.png';
const SURFACE_IMAGE =
    'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg';
const ELEVATION_DECODER = {
    scaler: 0.01,
    offset: 0,
};

const deck = new Deck({
    initialViewState: {
        longitude: 138.73,
        latitude: 35.36,
        zoom: 12,
        pitch: 70,
        maxPitch: 80,
    },
    controller: true,
    layers: [
        new GsiTerrainLayer({
            id: 'gsi-terrain',
            minZoom: 0,
            maxZoom: 14,
            elevationDecoder: ELEVATION_DECODER,
            elevationData: TERRAIN_IMAGE,
            texture: SURFACE_IMAGE,
        }),
    ],
});
