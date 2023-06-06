<!--
 * @Author: chenzhongsheng
 * @Date: 2023-06-05 07:56:20
 * @Description: Coding something
-->
<!-- * @Author：钉子 * @Date：2022-08-03 21：24：33 * @Description：编码一些东西 -->
# Particle-Drawer

用粒子绘制文本或图片。

[Visit]https://theajack.github.io/particle-drawer）

## npm 安装

```
npm i particle-drawer
```

```ts
const drawer = new ParticleDrawer();
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

### 设置大小

动态设置容器宽度和高度

```js
drawer.setSize(1000, 1000); // width and height
```

### 设置属性

动态设置图形属性

```js
drawer.fillColor = '#000';
drawer.textGap = 8;
drawer.imgGap = 12;
drawer.particleRadius = 4;
```