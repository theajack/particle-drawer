<!--
 * @Author: tackchen
 * @Date: 2022-08-03 21:24:33
 * @Description: Coding something
-->
# [Particle-Drawer](http://github.com/theajack/particle-drawer)

Draw text or pictures with particles.

[Visit](https://theajack.github.io/particle-drawer) | [中文](https://github.com/theajack/particle-drawer/blob/master/README.cn.md)

## npm install

```
npm i particle-drawer
```

```ts
const drawer = new ParticleDrawer();
drawer.draw('Hello World!');
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
    fontSize?: number,
    lineGap?: number,
    moveTime?: number,
    fontFamily?: string,
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

### draw

Draw text or pictures into a container

```ts
async function draw (content: string|string[]|File, isImage?: boolean): void;
```

```js
drawer.draw('Hello World!'); // single line text
drawer.draw(['Hello', 'World!']); // multi line text
drawer.draw(file); // draw image file
drawer.draw(src, true); // draw image src
```

TIP: You can use framing to draw gifs or videos 

### setSize

Dynamically set the container width and height

```js
drawer.setSize(1000, 1000); // width and height
```

### Set attributes

Dynamically set drawing properties

```js
drawer.particleRadius = 4;
drawer.textFillColor = '#000';
drawer.textGap = 8;
drawer.imgGap = 12;
drawer.fontSize = 50;
drawer.lineGap = 10;
drawer.moveTime = 500;
drawer.fontFamily = 'monospace';
```