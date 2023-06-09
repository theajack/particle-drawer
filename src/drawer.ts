import {Particle} from './particle';
import {adapteSize, countRadius, createImage, DPR, getDrawType} from './utils';

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

    textFillColor = '#55555555';

    textGap = 5;
    imgGap = 10;
    private _particleRadius = 2;
    get particleRadius () {return this._particleRadius;};
    set particleRadius (value: number) {
        this._particleRadius = value;
        this.particles.forEach(p => {p.radius = value;});
    }

    private _fontSize = 100;
    get fontSize () {return this._fontSize;};
    set fontSize (value: number) {
        this._fontSize = value;
        this.offscreenCtx.font = `${value * DPR}px 'monospace'`;
    }

    lineGap = 10;

    constructor ({
        container = document.body,
        width = 500,
        height = 800,
        particleRadius,
        textGap,
        imgGap,
        textFillColor,
        fontSize,
        lineGap,
    }: {
        container?: string | Element,
        width?: number,
        height?: number,
        particleRadius?: number,
        textGap?: number,
        textFillColor?: string,
        imgGap?: number,
        fontSize?: number,
        lineGap?: number,
    } = {}) {
        if (typeof container === 'string') {
            const el = document.querySelector(container);
            if (!el) throw new Error(`Cannot find container ${el}`);
            container = el;
        }

        if (particleRadius) this.particleRadius = particleRadius;
        if (textGap) this.textGap = textGap;
        if (imgGap) this.imgGap = imgGap;
        if (textFillColor) this.textFillColor = textFillColor;
        if (fontSize) this._fontSize = fontSize;
        if (lineGap) this.lineGap = lineGap;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        container.appendChild(this.canvas);

        this._initOffscreenCanvas();

        this.setSize(width, height);

        this.loop();

        this.particles.push(new Particle(this));
    }

    private _initOffscreenCanvas () {
        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCtx = this.offscreenCanvas.getContext('2d', {
            willReadFrequently: true,
        }) as CanvasRenderingContext2D;

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
        this.fontSize = this._fontSize;
        this.offscreenCtx.textBaseline = 'middle';
    }

    private clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    async draw (content: string|string[]|File, isImage?: boolean) {
        const ctx = this.offscreenCtx;
        ctx.clearRect(0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);
        const type = getDrawType(content, isImage);
        switch (type) {
            case 'text':
                this.drawText(content as string|string[]);
                this.movePoints(true); break;
            case 'image':
                await this.drawImage(content as string|File);
                this.movePoints(); break;
        }
    }

    private movePoints (isText: boolean = false) {
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

    // private async drawVideo () {
        
    // }
    // private async drawGif () {
        
    // }

    private sleepUnusedParticles (pointLength: number) {
        const n = this.particles.length;
        if (pointLength < n) {
            for (let i = pointLength; i < n; i++) {
                this.particles[i].sleep();
            }
        }
    }

    private drawText (content: string|string[]) {
        this.ctx.fillStyle = this.textFillColor;
        const ctx = this.offscreenCtx;
        if (typeof content === 'string') {
            content = [content];
        }

        const lintHeight = (this._fontSize + this.lineGap) * DPR;

        // ! 最后+lineHegit 是因为绘制方式是 textBaseline=middle
        const startY = ((this.height * DPR) - (content.length * lintHeight) - this.lineGap * DPR + lintHeight) / 2;
        const drawArray = content.map((text, i) => {
            const {width} = ctx.measureText(text);
            return {
                text: text,
                x: (this.width * DPR - width) / 2,
                y: startY + (lintHeight * i),
            };
        });

        drawArray.forEach(({text, x, y}) => {
            ctx.fillText(text, x, y);
        });
    }
    private async drawImage (file: string|File) {
        if (typeof file !== 'string' && !['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
            throw new Error('Please choose a image');
        }
        const ctx = this.offscreenCtx;
        const img = await createImage(file);
        const {left, top, width, height} = adapteSize({
            width: img.width,
            height: img.height,
            containerWidth: this.canvas.width,
            containerHeight: this.canvas.height,
        });
        ctx.drawImage(img, left, top, width, height);
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