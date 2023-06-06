/*
 * @Author: tackchen
 * @Date: 2022-08-03 20:32:39
 * @Description: Coding something
 */

import {ParticleDrawer} from '../../src/index';
import {renderUI} from './ui';

const drawer = new ParticleDrawer({
    width: window.innerWidth,
    height: window.innerHeight,
});


(window as any).drawer = drawer;

let timer: any = null;
window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        drawer.setSize(window.innerWidth, window.innerHeight);
    }, 500);
});

renderUI(drawer);