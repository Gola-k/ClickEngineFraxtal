!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).TileMapHelper={})}(this,(function(e){"use strict";const t=2147483648,i=1073741824,l=536870912;var s;function n(e){const t=s.isFlippedDiagonally(e),i=s.isFlippedHorizontally(e),l=s.isFlippedVertically(e);let n=0;return t?(n=10,!i&&l?n=2:i&&!l?n=6:i&&l&&(n=14)):(n=0,!i&&l?n=8:i&&!l?n=12:i&&l&&(n=4)),n}function o(e,s,n,o){let r=e;return s&&(r|=t),n&&(r|=i),o&&(r|=l),r}!function(e){e.tileIdMask=536870911,e.getTileId=function(t){return t&e.tileIdMask},e.setFlippedHorizontally=function(e,i){return e&=2147483647,i&&(e|=t),e},e.setFlippedVertically=function(e,t){return e&=-1073741825,t&&(e|=i),e},e.setFlippedDiagonally=function(e,t){return e&=-536870913,t&&(e|=l),e},e.isFlippedHorizontally=function(e){return 0!=(e&t)},e.isFlippedVertically=function(e){return 0!=(e&i)},e.isFlippedDiagonally=function(e){return 0!=(e&l)}}(s||(s={}));class r{constructor(e,t,i,l,s){this.tileWidth=e,this.tileHeight=t,this.dimX=i,this.dimY=l,this._tileSet=s,this._layers=[]}getWidth(){return this.tileWidth*this.dimX}getHeight(){return this.tileHeight*this.dimY}getTileHeight(){return this.tileHeight}getTileWidth(){return this.tileWidth}getDimensionX(){return this.dimX}getDimensionY(){return this.dimY}getTileDefinition(e){return this._tileSet.get(e)}getTileDefinitions(){return this._tileSet.values()}addTileLayer(e){const t=new h(this,e);return this._layers.push(t),t}addObjectLayer(e){const t=new d(this,e);return this._layers.push(t),t}getBackgroundResourceName(){return this._backgroundResourceName}getLayers(){return this._layers}pointIsInsideTile(e,t,i){const l=Math.floor(e/this.tileWidth),s=Math.floor(t/this.tileHeight);for(const e of this._layers){const t=e;if(!t)continue;const n=t.getTileId(l,s);if(void 0===n)return!1;if(this._tileSet.get(n).hasTaggedHitBox(i))return!0}return!1}setBackgroundResourceName(e){this._backgroundResourceName=e}}class a{constructor(e,t){this.visible=!0,this.tileMap=e,this.id=t}setVisible(e){this.visible=e}isVisible(){return this.visible}}class d extends a{constructor(e,t){super(e,t),this.objects=[]}add(e){this.objects.push(e)}}class c{constructor(e,t,i){this.tileId=i,this.x=e,this.y=t}getTileId(){return s.getTileId(this.tileId)}setFlippedHorizontally(e){this.tileId=s.setFlippedHorizontally(this.tileId,e)}setFlippedVertically(e){this.tileId=s.setFlippedVertically(this.tileId,e)}setFlippedDiagonally(e){this.tileId=s.setFlippedDiagonally(this.tileId,e)}isFlippedHorizontally(){return s.isFlippedHorizontally(this.tileId)}isFlippedVertically(){return s.isFlippedVertically(this.tileId)}isFlippedDiagonally(){return s.isFlippedDiagonally(this.tileId)}}class h extends a{constructor(e,t){super(e,t),this._tiles=[],this._tiles.length=this.tileMap.getDimensionY();for(let e=0;e<this._tiles.length;e++)this._tiles[e]=new Int32Array(this.tileMap.getDimensionX());this._alpha=1}getAlpha(){return this._alpha}setAlpha(e){this._alpha=e}setTile(e,t,i){if(!this.tileMap.getTileDefinition(i))return void console.error(`Invalid tile definition index: ${i}`);const l=this._tiles[t];!l||e>=l.length||(l[e]=i+1)}removeTile(e,t){const i=this._tiles[t];!i||e>=i.length||(i[e]=0)}setFlippedHorizontally(e,t,i){const l=this._tiles[t];if(!l||e>=l.length)return;const n=l[e];0!==n&&(l[e]=s.setFlippedHorizontally(n,i))}setFlippedVertically(e,t,i){const l=this._tiles[t];if(!l||e>=l.length)return;const n=l[e];0!==n&&(l[e]=s.setFlippedVertically(n,i))}setFlippedDiagonally(e,t,i){const l=this._tiles[t];if(!l||e>=l.length)return;const n=l[e];0!==n&&(l[e]=s.setFlippedDiagonally(n,i))}isFlippedHorizontally(e,t){const i=this._tiles[t];return!(!i||e>=i.length)&&s.isFlippedHorizontally(i[e])}isFlippedVertically(e,t){const i=this._tiles[t];return!(!i||e>=i.length)&&s.isFlippedVertically(i[e])}isFlippedDiagonally(e,t){const i=this._tiles[t];return!(!i||e>=i.length)&&s.isFlippedDiagonally(i[e])}getTileGID(e,t){const i=this._tiles[t];if(i&&!(e>=i.length)&&0!==i[e])return i[e]-1}getTileId(e,t){const i=this._tiles[t];if(!i||e>=i.length||0===i[e])return;return s.getTileId(i[e]-1)}getDimensionX(){return 0===this._tiles.length?0:this._tiles[0].length}getDimensionY(){return this._tiles.length}getWidth(){return this.tileMap.getWidth()}getHeight(){return this.tileMap.getHeight()}}class u{constructor(e){this.taggedHitBoxes=[],this.animationLength=null!=e?e:0,this.stackedTiles=[]}addHitBox(e,t){let i=this.taggedHitBoxes.find((t=>t.tag===e));i||(i={tag:e,polygons:[]},this.taggedHitBoxes.push(i)),i.polygons.push(t)}hasTaggedHitBox(e){return this.taggedHitBoxes.some((t=>t.tag===e))}getHitBoxes(e){const t=this.taggedHitBoxes.find((t=>t.tag===e));return t&&t.polygons}getAnimationLength(){return this.animationLength}getStackTileId(){return this.stackTileId}getStackedTiles(){return this.stackedTiles}hasStackedTiles(){return this.stackedTiles.length>0}setStackedTiles(e,...t){this.stackedTiles=t,this.stackTileId=e}}class p{constructor(){this._cachedValues=new Map,this._callbacks=new Map}getOrLoad(e,t,i){{const t=this._cachedValues.get(e);if(t)return void i(t)}{const t=this._callbacks.get(e);if(t)return void t.push(i);this._callbacks.set(e,[i])}t((t=>{t&&this._cachedValues.set(e,t);const i=this._callbacks.get(e);this._callbacks.delete(e);for(const e of i)e(t)}))}}class g{constructor(){this._levelBackgroundTextures=new Map,this._textures=new Map}setTexture(e,t){this._textures.set(e,t)}getTexture(e){return this._textures.get(e)}getLevelBackgroundTexture(e){return this._levelBackgroundTextures.get(e)}setLevelBackgroundTexture(e,t){this._levelBackgroundTextures.set(e,t)}}const f=(e,t)=>{const{data:i,compression:l}=t;if(!i)return i;let s=4;const n=[];let o=atob(i).split("").map((function(e){return e.charCodeAt(0)}));try{const t=(e,t)=>e[t]+(e[t+1]<<8)+(e[t+2]<<16)+(e[t+3]<<24)>>>0;if("zlib"===l){const i=new Uint8Array(o),l=e.inflate(i);for(;s<=l.length;)n.push(t(l,s-4)),s+=4}else{if("zstd"===l)return console.error("Zstandard compression is not supported for layers in a Tilemap. Use instead zlib compression or no compression."),null;for(;s<=o.length;)n.push(t(o,s-4)),s+=4}return n}catch(e){return console.error("Failed to decompress and unzip base64 layer.data string",e),null}},y=e=>{const s=e&t,n=e&i,o=e&l;return{id:T(536870911&e),flippedHorizontally:!!s,flippedVertically:!!n,flippedDiagonally:!!o}};function T(e){return 0===e?void 0:e-1}var _,x,k,I,m,w;function b(e,t){let i=e<<16;return i+=t,i}function M(e,t,i,l){var s;if(e[l])return e[l];let n=null;const o=t[l];return(null==o?void 0:o.relPath)?(n=i(o.relPath),"res/error48.png"===(null===(s=n.baseTexture)||void 0===s?void 0:s.cacheId)&&(console.error(`The atlas texture "${o.relPath}" can't be loaded`),n=null)):console.error(`The tileset "${o.identifier}" doesn't seems to contain an atlas texture`),e[l]=n,n}!function(e){e.parseAtlas=function(e,t,i,l){if(!e.tiledversion)return console.warn("The loaded Tiled map does not contain a 'tiledversion' key. Are you sure this file has been exported from Tiled (mapeditor.org)?"),null;if(!e.tilesets.length||"source"in e.tilesets[0])return console.warn("The loaded Tiled map seems not to contain any tileset data (nothing in 'tilesets' key)."),null;const s=e.tilesets[0],{tilewidth:n,tileheight:o,tilecount:r,image:a,columns:d,spacing:c,margin:h}=s,u=void 0===s.firstgid?1:s.firstgid;i||(i=l(a));const p=r/d,f=n*d+c*(d-1)+2*h,y=o*p+c*(p-1)+2*h;if(i.width<f||i.height<y)return console.error(`It seems the atlas file was resized, which is not supported. It should be ${f}x${y} px, but it's actually ${i.width}x${i.height} px.`),null;i.width===f&&i.height===y||console.warn(`It seems the atlas file has unused pixels. It should be ${f}x${y} px, but it's actually ${i.width}x${i.height} px.`);const _=new g;for(let e=0;e<r;e++){const t=h+Math.floor(e%d)*(n+c),l=h+Math.floor(e/d)*(o+c),s=T(u+e);try{const e=new PIXI.Rectangle(t,l,n,o),r=new PIXI.Texture(i,e);_.setTexture(s,r)}catch(e){console.error("An error occurred while creating a PIXI.Texture to be used in a TileMap:",e)}}return _}}(_||(_={})),function(e){e.parseAtlas=function(e,t,i,l){const s=e.levels[t>-1?t:0];if(!s||!s.layerInstances)return null;const n={};for(const t of e.defs.tilesets)n[t.uid]=t;const o=new g,r={},a={};for(let e=s.layerInstances.length-1;e>=0;--e){const t=s.layerInstances[e];if("Entities"===t.__type)continue;const i=t.__tilesetDefUid;if("number"!=typeof i)continue;const d=n[i],c=M(a,n,l,i);if(!c)continue;const h={},u=d.tileGridSize;for(const e of[...t.autoLayerTiles,...t.gridTiles]){if(h[e.t])continue;const t=b(i,e.t);if(r[t])h[e.t]=!0;else{try{const[i,l]=e.src,s=new PIXI.Rectangle(i,l,u,u),n=new PIXI.Texture(c,s);o.setTexture(t,n)}catch(e){console.error("An error occurred while creating a PIXI.Texture to be used in a TileMap:",e)}h[e.t]=!0,r[t]=!0}}}if(s.bgRelPath){const e=l(s.bgRelPath),t=new PIXI.Rectangle(0,0,s.pxWid,s.pxHei),i=new PIXI.Texture(e,t);o.setLevelBackgroundTexture(s.bgRelPath,i)}return o}}(x||(x={})),e.PixiTileMapHelper=void 0,(k=e.PixiTileMapHelper||(e.PixiTileMapHelper={})).parseAtlas=function(e,t,i,l){return"ldtk"===e.kind?x.parseAtlas(e.data,t,i,l):"tiled"===e.kind?_.parseAtlas(e.data,t,i,l):(console.warn("The loaded Tiled map data does not contain a 'tiledversion' or '__header__' key. Are you sure this file has been exported from Tiled (mapeditor.org) or LDtk (ldtk.io)?"),null)},k.updatePixiTileMap=function(e,t,i,l,o){const r=e;if(!r)return;r.clear();const a=t.getBackgroundResourceName();if(a){const e=i.getLevelBackgroundTexture(a);r.tile(e,0,0)}for(const e of t.getLayers())if(!("index"===l&&o!==e.id||"visible"===l&&!e.isVisible()))if(e instanceof d){const t=e;for(const e of t.objects){const l=e.getTileId(),s=i.getTexture(l);if(s){const i=n(l);r.tile(s,e.x,e.y-t.tileMap.getTileHeight(),{rotate:i})}}}else if(e instanceof h){const t=e,l=t.tileMap.getTileWidth(),o=t.tileMap.getTileHeight(),a=t.tileMap.getDimensionX(),d=t.tileMap.getDimensionY(),c=t.getAlpha();for(let e=0;e<d;e++)for(let d=0;d<a;d++){const a=l*d,h=o*e,u=t.getTileGID(d,e);if(void 0===u)continue;const p=s.getTileId(u),g=t.tileMap.getTileDefinition(p);if(g.hasStackedTiles())for(const e of g.getStackedTiles()){const t=s.getTileId(e),l=i.getTexture(t);if(!l)continue;const o=n(e);r.tile(l,a,h,{alpha:c,rotate:o})}else{const t=i.getTexture(p);if(!t){console.warn(`Unknown tile id: ${p} at (${d}, ${e})`);continue}const s=n(u),o=r.tile(t,a,h,{alpha:c,rotate:s});g.getAnimationLength()>0&&o.tileAnimX(l,g.getAnimationLength())}}}},k.updatePixiCollisionMask=function(e,t,i,l,s,n,o,r){if(e){e.clear(),e.lineStyle(l,s,n),e.drawRect(0,0,t.getWidth(),t.getHeight());for(const l of t.getLayers()){const s=t.getTileWidth(),n=t.getTileHeight();if(l instanceof h){const t=l;for(let l=0;l<t.tileMap.getDimensionY();l++)for(let a=0;a<t.tileMap.getDimensionX();a++){const d=s*a,c=n*l,h=t.getTileId(a,l),u=t.isFlippedHorizontally(a,l),p=t.isFlippedVertically(a,l),g=t.isFlippedDiagonally(a,l),f=t.tileMap.getTileDefinition(h);if(!f)continue;const y=f.getHitBoxes(i);if(y)for(const t of y)if(0!==t.length){e.beginFill(o,r);for(let i=0;i<t.length;i++){let l=t[i][0],o=t[i][1];if(g){const e=l;l=o,o=e}u&&(l=s-l),p&&(o=n-o),0===i?e.moveTo(d+l,c+o):e.lineTo(d+l,c+o)}e.closePath(),e.endFill()}}}}}},function(e){e.load=function(e,t){const i=e.levels[t>-1?t:0];if(!i||!i.layerInstances)return null;const l=new Map;let s=0,n=0,a=0;for(let e=i.layerInstances.length-1;e>=0;--e){const t=i.layerInstances[e],o=t.__tilesetDefUid,r={};for(const e of[...t.autoLayerTiles,...t.gridTiles]){if(r[e.t])continue;const t=b(o,e.t);if(l.has(t)){r[e.t]=!0;continue}const i=new u(0);r[e.t]=!0,l.set(t,i)}"IntGrid"!==t.__type&&"AutoLayer"!==t.__type&&"Tiles"!==t.__type||(0===s?(s=t.__gridSize,n=t.__cWid,a=t.__cHei):t.__gridSize!==s&&console.warn("Grid size is different across layers. Only the first layer grid size will be followed."))}const d=new r(s,s,n,a,l),c=new Map;let h=268435455;for(let e=i.layerInstances.length-1;e>=0;--e){const t=i.layerInstances[e],s=t.__gridSize,n=t.__tilesetDefUid,r=d.addTileLayer(e);r.setAlpha(t.__opacity),r.setVisible(t.visible);for(const e of[...t.autoLayerTiles,...t.gridTiles]){const t=Math.floor(e.px[0]/s),i=Math.floor(e.px[1]/s),a=b(n,e.t),d=r.getTileId(t,i);if(void 0===d)r.setTile(t,i,a),r.setFlippedHorizontally(t,i,1===e.f||3===e.f),r.setFlippedVertically(t,i,2===e.f||3===e.f);else{const s=o(a,1===e.f||3===e.f,2===e.f||3===e.f,!1),n=l.get(d);if(null==n?void 0:n.hasStackedTiles()){const e=`${n.getStackedTiles().map((e=>`${e}`)).join(";")};${s}`,o=c.get(e);if(o)r.setTile(t,i,o.getStackTileId());else{const o=new u(0);o.setStackedTiles(h,...n.getStackedTiles(),s),l.set(h,o),h-=1,c.set(e,o),r.setTile(t,i,o.getStackTileId())}}else{const e=r.getTileGID(t,i),n=`${e};${s}`,o=new u(0);o.setStackedTiles(h,e,s),l.set(h,o),h-=1,c.set(n,o),r.setTile(t,i,o.getStackTileId())}}}}return i.bgRelPath&&d.setBackgroundResourceName(i.bgRelPath),d}}(I||(I={})),function(e){e.load=function(e,t){if(!e.tiledversion)return console.warn("The loaded Tiled map does not contain a 'tiledversion' key. Are you sure this file has been exported from Tiled (mapeditor.org)?"),null;const i=new Map;for(const t of e.tilesets){const l=void 0===t.firstgid?1:t.firstgid;if(t.tiles)for(const s of t.tiles){const t=new u(s.animation?s.animation.length:0),n=s.type||s.class;if(s.objectgroup)for(const e of s.objectgroup.objects){const i=e.type||e.class||n;if(!i||0===i.length)continue;let l=null;if(e.polygon){const t=e.rotation*Math.PI/180;let i=Math.cos(t),s=Math.sin(t);-1!==i&&1!==i||(s=0),-1!==s&&1!==s||(i=0),l=e.polygon.map((t=>[e.x+t.x*i-t.y*s,e.y+t.x*s+t.y*i]))}else void 0!==e.x&&void 0!==e.y&&void 0!==e.width&&void 0!==e.height&&(l=[[e.x,e.y],[e.x,e.y+e.height],[e.x+e.width,e.y+e.height],[e.x+e.width,e.y]]);l&&t.addHitBox(i,l)}else if(n){const i=[[0,0],[0,e.tileheight],[e.tilewidth,e.tileheight],[e.tilewidth,0]];t.addHitBox(n,i)}i.set(T(l+s.id),t)}for(let e=0;e<t.tilecount;e++){const t=T(l+e);i.has(t)||i.set(t,new u(0))}}const l=new r(e.tilewidth,e.tileheight,e.width,e.height,i);for(const i of e.layers)if("objectgroup"===i.type){const e=l.addObjectLayer(i.id);e.setVisible(i.visible);for(const t of i.objects){if(!t.visible||!t.gid)continue;const i=y(t.gid),l=new c(t.x,t.y,i.id);e.add(l),l.setFlippedHorizontally(i.flippedHorizontally),l.setFlippedVertically(i.flippedVertically),l.setFlippedDiagonally(i.flippedDiagonally)}}else if("tilelayer"===i.type){let e=0,s=null;if("base64"===i.encoding?(s=f(t,i),s||console.warn("Failed to uncompress layer.data")):s=i.data,s){const t=l.addTileLayer(i.id);t.setAlpha(i.opacity),t.setVisible(i.visible);for(let l=0;l<i.height;l++)for(let n=0;n<i.width;n++){const i=s[e],o=y(i);void 0!==o.id&&(t.setTile(n,l,o.id),t.setFlippedHorizontally(n,l,o.flippedHorizontally),t.setFlippedVertically(n,l,o.flippedVertically),t.setFlippedDiagonally(n,l,o.flippedDiagonally)),e+=1}}}return l}}(m||(m={})),function(e){e.load=function(e,t,i){return"ldtk"===e.kind?I.load(e.data,t):"tiled"===e.kind?m.load(e.data,i):(console.warn("The loaded Tile Map data does not contain a 'tiledversion' or '__header__' key. Are you sure this file has been exported from Tiled (mapeditor.org) or LDtk (ldtk.io)?"),null)}}(w||(w={}));class v{constructor(){this._tileMapCache=new p,this._textureCacheCaches=new p}static getManager(e){return e.tileMapCollisionMaskManager||(e.tileMapCollisionMaskManager=new v),e.tileMapCollisionMaskManager}static identify(e){return e.tiledversion?(console.info("Detected the json file was created in Tiled"),{kind:"tiled",data:e}):e.__header__&&"LDtk"===e.__header__.app?(console.info("Detected the json/ldtk file was created in LDtk"),{kind:"ldtk",data:e}):(console.warn("The loaded Tile Map data does not contain a 'tiledversion' or '__header__' key. Are you sure this file has been exported from Tiled (mapeditor.org) or LDtk (ldtk.io)?"),null)}getOrLoadTileMap(e,t,i,l,s,n){const o=t+"|"+i+"|"+l;this._tileMapCache.getOrLoad(o,(n=>{e(t,i,(e=>{if(!e)return void n(null);const t=w.load(e,l,s);n(t)}))}),n)}getOrLoadTextureCache(t,i,l,s,n,o,r){const a=s+"|"+n+"|"+l+"|"+o;this._textureCacheCaches.getOrLoad(a,(r=>{t(s,n,(t=>{if(!t)return void r(null);const s=l?i(l):null,n=e.PixiTileMapHelper.parseAtlas(t,o,s,i);r(n)}))}),r)}clearCaches(){this._tileMapCache=new p,this._textureCacheCaches=new p}}e.EditableTileMap=r,e.EditableTileMapLayer=h,e.TileDefinition=u,e.TileMapManager=v,e.TileTextureCache=g,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=TileMapHelper.js.map