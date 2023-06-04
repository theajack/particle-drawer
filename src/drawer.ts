import {Particle} from './particle';
import {countRadius, createImage, DPR} from './utils';

/*
 * @Author: chenzhongsheng
 * @Date: 2023-06-03 17:33:31
 * @Description: Coding something
 */
export class ParticleDrawer {

    width: number;
    height: number;

    offscreenCanvas: HTMLCanvasElement;
    offscreenCtx: CanvasRenderingContext2D;

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    radius: number;


    particles: Particle[] = [];

    fillColor = '#55555555';

    textGap = 5;
    imgGap = 10;
    private _particleRadius = 2;
    get particleRadius () {return this._particleRadius;};
    set particleRadius (value: number) {
        this._particleRadius = value;
        this.particles.forEach(p => {p.radius = value;});
    }

    constructor ({
        container = document.body,
        width = 500,
        height = 800,
        particleRadius,
    }: {
        container?: string | Element,
        width?: number,
        height?: number,
        particleRadius?: number,
    }) {
        if (typeof container === 'string') {
            const el = document.querySelector(container);
            if (!el) throw new Error(`Cannot find container ${el}`);
            container = el;
        }
        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCtx = this.offscreenCanvas.getContext('2d', {
            willReadFrequently: true,
        }) as CanvasRenderingContext2D;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        if (particleRadius) this.particleRadius = particleRadius;
        container.appendChild(this.canvas);

        this.ctx.fillStyle = this.fillColor;

        this.setSize(width, height);


        this.loop();

        this.particles.push(new Particle(this));
    }

    private loop () {
        this.clear();
        this.particles.forEach(p => p.draw());
        requestAnimationFrame(() => {this.loop();});
    }

    setSize (width: number, height: number) {
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        this.width = width;
        this.height = height;
        this.canvas.width = this.offscreenCanvas.width = width * DPR;
        this.canvas.height = this.offscreenCanvas.height = height * DPR;
        this.radius = countRadius(width, height, this.particleRadius);

        this.offscreenCtx.fillStyle = '#000';
        // this.offscreenCtx.font = `${200}px 'Microsoft YaHei'`;
        this.offscreenCtx.font = `${200}px 'monospace'`;
        this.offscreenCtx.textBaseline = 'middle';
    }

    private clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    async draw (content: string|File) {
        const ctx = this.offscreenCtx;
        ctx.clearRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);
        const isText = typeof content === 'string';
        isText ? this.drawText(content) : await this.drawImage(content);
        const points = this.getPoints(isText);
        points.forEach((point, index) => {
            this.getParticle(index).moveTo({
                x: point.x / DPR,
                y: point.y / DPR,
                color: point.color
            });
        });
        this.sleepUnusedParticles(points.length);
    }

    private sleepUnusedParticles (pointLength: number) {
        const n = this.particles.length;
        if (pointLength < n) {
            for (let i = pointLength; i < n; i++) {
                this.particles[i].sleep();
            }
        }
    }

    private drawText (content: string) {
        const ctx = this.offscreenCtx;
        const textData = ctx.measureText(content);
        ctx.fillText(content, ((this.width * DPR - textData.width) / 2), (this.height / 2) * DPR);
    }
    private async drawImage (file: File) {
        const ctx = this.offscreenCtx;
        const {width, height} = this.offscreenCanvas;
        const img = await createImage(file, width, height);
        ctx.drawImage(img, 0, 0, width, height);
    }

    private getParticle (index: number) {
        if (!this.particles[index]) {
            this.particles[index] = new Particle(this);
        }
        return this.particles[index];
    }

    private getPoints (isText: boolean) {
        const {width, height, data} = this.offscreenCtx.getImageData(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);
        // console.log(width, height);
        const gap = (isText ? this.textGap : this.imgGap) * DPR;
        const points: {x:number, y:number, color?: string}[] = [];
        for (let x = 0; x < width; x += gap) {
            for (let y = 0; y < height; y += gap) {
                const index = (x + y * width) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const a = data[index + 3];

                if (isText) {
                    if (r === 0 && g === 0 && b === 0 && a === 255) {
                        points.push({x, y});
                    }
                } else {
                    if (a !== 0) {
                        points.push({x, y, color: `rgba(${r},${g},${b},${a})`});
                    }
                }
            }
        }
        return points;
    }
}