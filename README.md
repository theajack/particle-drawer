<!--
 * @Author: tackchen
 * @Date: 2022-08-03 21:24:33
 * @Description: Coding something
-->
# Particle-Drawer

Draw text or pictures with particles.

[Visit](https://theajack.github.io/particle-drawer)

## npm install

```
npm i particle-drawer
```

```ts
const drawer = new ParticleDrawer();
```

Construct parameters

```ts
interface Options {
    container?: string | Element, // The default value is body
    width?: number, // The default value is 500
    height?: number, // The default value is 800
    particleRadius?: number, // Particle radius. The default value is 2
    textFillColor?: string, // The particle fill color when drawing text. The default value is #55555555
    textGap?: number, // The pick-up pixel interval when drawing text. The default value is 5
    imgGap?: number, // The pick-up pixel interval when drawing image. The default value is 10
}
```

### cdn

```html
<script src="https://cdn.jsdelivr.net/npm/particle-drawer"></script>
<script>
const drawer = new ParticleDrawer();
</script>
```

## API

### setSize

Dynamically set the container width and height

```js
drawer.setSize(1000, 1000); // width and height
```

### Set attributes

Dynamically set drawing properties

```js
drawer.fillColor = '#000';
drawer.textGap = 8;
drawer.imgGap = 12;
drawer.particleRadius = 4;
```