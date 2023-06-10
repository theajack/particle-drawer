/*
 * @Author: tackchen
 * @Date: 2022-08-03 20:32:39
 * @Description: Coding something
 */

// import {ParticleDrawer} from '../../npm';
import {IDrawerOptions, ParticleDrawer} from '../../src/index';
import {renderUI} from './ui';

function isMobile () {
    const mobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    return mobile != null;
}

const options: IDrawerOptions = {
    width: window.innerWidth,
    height: window.innerHeight,
    textFillColor: '#222',
    moveTime: 700,
};

if (isMobile()) {
    options.fontSize = 40;
    options.textGap = 2;
    options.imgGap = 3;
    options.particleRadius = 1;
}

const drawer = new ParticleDrawer(options);


(window as any).drawer = drawer;

let timer: any = null;
window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        drawer.setSize(window.innerWidth, window.innerHeight);
    }, 500);
});

renderUI(drawer);

setTimeout(() => {
    drawer.draw(['This is', 'Particle-Drawer']);
}, 1000);

// console.log(window.innerHeight, window.innerWidth, window.devicePixelRatio);