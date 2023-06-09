/*
 * @Author: chenzhongsheng
 * @Date: 2023-06-09 21:47:14
 * @Description: Coding something
 */
export class DrawInterval {
    private interval: any = null;

    time: number;

    fn: any;

    constructor (time = 1000) {
        this.time = time;
    }

    setTime (time: number) {
        this.time = time;
        
        if (this.fn) {
            this.start(this.fn);
        }
    }

    start (fn: any) {
        this.clear();
        fn();
        this.interval = setInterval(fn, this.time);
        this.fn = fn;
    }

    clear () {
        clearInterval(this.interval);
        this.interval = null;
        this.fn = null;
    }
}