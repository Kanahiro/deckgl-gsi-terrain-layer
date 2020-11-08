# deckgl-gsi-terrain-layer

国土地理院の標高タイルを用いて地形を3D表示するために、deck.glのTerrainLayerをその独特な仕様に合わせて拡張したものです

RGB値の標高への換算(elevationDecoder)以外はTerrainLayerと全く同じ仕様です
https://deck.gl/docs/api-reference/geo-layers/terrain-layer

## usage

```shell

npm install deckgl-gsi-terrain-layer
```


### elevationDecoder

#### TerrainLayerの場合

deck.glオリジナルのTerraiLayerのelevationDecoderは以下のようなパラメータです

```javascript
elevationDecoder: {
    rScaler: 6553.6,
    gScaler: 25.6,
    bScaler: 0.1,
    offset: 0,
};
```

上記はRGBのそれぞれの値に対し、Red1当たりの標高値が6553.6m、Greenが25.6m、Blueが0.1mという事を意味します。
[※Mapboxなどで採用されているMapzen-Terrainの変換パラメータです](https://docs.mapbox.com/help/troubleshooting/access-elevation-data/)

#### GsiTerrainLayerの場合

[国土地理院/標高タイル詳細仕様](https://maps.gsi.go.jp/development/demtile.html)から、無効値の定義などが独特であり、前述のTerrainLayerの様にRGB値で単調増加させればよいとは言えませんが、一部の特殊な値を除いては分解能0.01mでの単調増加です。

したがって、上記で言うrScaler, gScaler, bScalerは固定値でよいため、本リポジトリで公開するGsiTerrainLayerでは、このパラメータを以下のように変更しています。

```javascript
elevationDecoder: {
    scaler: 0.01,
    offset: 0,
};
```

scalerは分解能を表します。実寸なら0.01ですが、強調表示したい場合、たとえば3倍にしたいなら0.03にすればよいです。