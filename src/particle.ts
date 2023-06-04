/*
 * @Author: chenzhongsheng
 * @Date: 2023-06-03 17:45:14
 * @Description: Coding something
 */
import {ParticleDrawer} from './drawer';
import {countPosition, degToArc, DPR, random} from './utils';

export class Particle {
    x: number;
    y: number;

    radius: number;

    drawer: ParticleDrawer;

    color: string;

    // times = Math.round(500 / 16.6667);

    time = 500;

    isActive = false;

    tick: (()=>void)|null;

    constructor (drawer: ParticleDrawer) {
        this.drawer = drawer;
        this.radius = drawer.particleRadius;
        this.initPos();
    }

    private getInvisiblePos () {
        const arc = degToArc(random(1, 360));

        const {x, y} = countPosition(this.drawer.radius, arc);
        
        return {
            x: this.drawer.width / 2 + x,
            y: this.drawer.height / 2 + y,
        };
    }

    initPos () {
        const {x, y} = this.getInvisiblePos();
        this.setPos(x, y);
    }

    setPos (x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    moveTo ({
        x, y, color, onend
    }: {
        x: number,
        y: number,
        color?: string,
        onend?: ()=>void
    }) {
        this.color = color || this.drawer.fillColor;
        this.isActive = true;
        const sx = this.x;
        const sy = this.y;
        const xspeed = (x - this.x) / this.time;
        const yspeed = (y - this.y) / this.time;
        const startTime = Date.now();
        this.tick = () => {
            const t = Date.now() - startTime;
            if (t >= this.time) {
                this.setPos(x, y);
                this.tick = null;
                onend?.();
            } else {
                this.setPos(
                    sx + xspeed * t,
                    sy + yspeed * t,
                );
            }
        };
    }
    
    randomPos () {
        this.moveTo({
            x: random(0, this.drawer.width),
            y: random(0, this.drawer.height)
        });
    }

    sleep () {
        if (!this.isActive) return;
        const {x, y} = this.getInvisiblePos();
        this.moveTo({
            x, y,
            onend: () => {
                this.isActive = false;
            }
        });
    }

    draw () {
        if (!this.isActive) return;
        this.tick?.();
        const ctx = this.drawer.ctx;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x * DPR, this.y * DPR, this.radius * DPR, 0, Math.PI * 2);
        ctx.fill();
    }
}