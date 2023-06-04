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

export function createImage (file: File, width: number, height: number): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const imgSrc = window.URL.createObjectURL(file);// 获取file文件路径
        const img = new Image();
        img.width = width;
        img.height = height;
        img.src = imgSrc;
        img.onload = () => {
            resolve(img);
        };
    });
}