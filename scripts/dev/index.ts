/*
 * @Author: tackchen
 * @Date: 2022-08-03 20:32:39
 * @Description: Coding something
 */

import {ParticleDrawer} from '../../src/index';
import {css, style} from 'alins-style';

css('body')(
    style.padding(0).margin(0),
).mount();


const drawer = new ParticleDrawer({
    width: window.innerWidth,
    height: window.innerHeight,
});

const input = document.getElementById('input') as HTMLInputElement;

input?.addEventListener('change', () => {
    const file = (input as any).files[0];
    // console.log();
    drawer.draw(file);
});

(window as any).drawer = drawer;

let timer: any = null;
window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        drawer.setSize(window.innerWidth, window.innerHeight);
    }, 500);
});