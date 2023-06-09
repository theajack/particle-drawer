/*
 * @Author: chenzhongsheng
 * @Date: 2023-06-03 17:48:15
 * @Description: Coding something
 */
export function countRadius (
    width: number,
    height: number,
    offset: number,
): number {
    return (Math.sqrt(
        Math.pow(width, 2) + Math.pow(height, 2)
    ) / 2) + offset;
}

export function random (min: number, max: number): number {
    return (min + Math.round(Math.random() * (max - min)));
}

export function countPosition (radius: number, arc: number) {
    return {
        x: radius * Math.cos(arc),
        y: radius * Math.sin(arc),
    };
}

export function degToArc (deg: number) {
    return deg * Math.PI / 180;
}

export const DPR = window.devicePixelRatio;

export function createImage (file: string|File): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const img = new Image();
        img.src = createSrc(file);
        img.onload = () => {
            resolve(img);
        };
    });
}

function createSrc (file: string|File) {
    return typeof file === 'string' ? file : window.URL.createObjectURL(file);// 获取file文件路径
}

export function createVideo (file: File): Promise<HTMLVideoElement> {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.muted = true;
        video.autoplay = true;
        video.src = createSrc(file);
        video.addEventListener('canplay', () => {
            resolve(video);
        });
    });
}


export function adapteSize ({
    width, height, containerWidth, containerHeight
}:{
    width: number, height: number,
    containerWidth: number, containerHeight: number,
}) {
    // console.log(width, height, containerWidth, containerHeight);
    const cRate = containerWidth / containerHeight;
    const rate = width / height;
    const result = {width, height, left: 0, top: 0};
    if (cRate > rate) {
        result.height = containerHeight;
        result.width = rate * result.height;
        result.left = (containerWidth - result.width) / 2;
    } else {
        result.width = containerWidth;
        result.height = result.width / rate;
        result.top = (containerHeight - result.height) / 2;
    }
    console.log(result);
    return result;
}

export type IDrawType = 'text'|'image'|'gif'|'video';

export function getDrawType (content: string[]|string|File, drawType?: IDrawType): IDrawType {
    if (drawType) return drawType;
    if (typeof content === 'string' || content instanceof Array) return 'text';
    const type = content.type;
    if (['image/jpeg', 'image/png', 'image/jpg'].includes(type)) {
        return 'image';
    }
    if (type === 'image/gif') return 'gif';

    if (['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg'].includes(type)) {
        return 'video';
    }
    throw new Error(`Invalid file type: ${type}`);
}

export function checkType (file: string|File, mimeTypes: string[]) {
    if (typeof file !== 'string' && !mimeTypes.includes(file.type)) {
        throw new Error('Please choose Right file type');
    }
}