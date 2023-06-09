<!--
 * @Author: chenzhongsheng
 * @Date: 2023-06-05 07:56:20
 * @Description: Coding something
-->
# [Particle-Drawer](http://github.com/theajack/particle-drawer)

用粒子绘制文本或图片。

[访问]https://theajack.github.io/particle-drawer） | [English](http://github.com/theajack/particle-drawer/blob/master/README.md)

## npm 安装

```
npm i particle-drawer
```

```ts
const drawer = new ParticleDrawer();
drawer.draw('Hello World!');
```

构造参数

```ts
interface Options {
    container?: string | Element, // 默认值为 body
    width?: number, // 默认值为 500
    height?: number, // 默认值为 800
    particleRadius?: number, //粒子半径。默认值为 2
    textFillColor?: string, // 绘制文本时的粒子填充颜色。默认值为 #55555555
    textGap?: number, // 绘制文本时的拾取像素间隔。默认值为 5
    imgGap?: number, // 绘制图像时的拾取像素间隔。默认值为 10
    fontSize?: number,
    lineGap?: number,
}
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/particle-drawer"></script>
<script>
const drawer = new ParticleDrawer();
</script>
```

## 接口

### draw

往容器绘制文本或图片

```ts
async function draw (content: string|string[]|File, isImage?: boolean): void;
```

```js
drawer.draw('Hello World!'); // single line text
drawer.draw(['Hello', 'World!']); // multi line text
drawer.draw(file); // draw image file
drawer.draw(src, true); // draw image src
```

TIP: 你可以利用分帧来绘制gif或video 

### setSize

动态设置容器宽度和高度

```js
drawer.setSize(1000, 1000); // width and height
```

### 设置属性

动态设置图形属性

```js
drawer.particleRadius = 4;
drawer.textFillColor = '#000';
drawer.textGap = 8;
drawer.imgGap = 12;
drawer.fontSize = 50;
drawer.lineGap = 10;
```