/*
 * @Author: chenzhongsheng
 * @Date: 2023-06-06 09:05:00
 * @Description: Coding something
 */

import {css, style} from 'alins-style';
import {button, div, input, span, $, IReactItem, click, change, mounted, textarea} from 'alins';
import {ParticleDrawer} from '../../src/index';

let interval: any;
function clearTimer () {
    clearInterval(interval);
}
function registTimer (fn: ()=>void, time = 1000) {
    clearTimer();
    interval = setInterval(fn, time);
}

css('body')(
    style.padding(0).margin(0).overflow('hidden'),
    ['.input-item',
        style(`
        margin: 10px 0;
        `),
        ['&.func-box', style.borderTop('1px solid #ddd').paddingTop(10)],
        ['.input-title', style(`
            display: inline-block;
            width: 120px;
            text-align: right;
            padding-right: 10px;
            vertical-align: text-top;
        `)],
        ['.input-el', style(`
            height: 20px;
            padding-left: 5px;
            vertical-align: text-top;
        `)],
    ],
    [
        '.btn', style({
            backgroundColor: 'rgb(28,195,255)',
            padding: '4px 6px',
            outline: 'none',
            border: 'none',
            borderRadius: 3,
            fontSize: 14,
            color: 'white',
            cursor: 'pointer',
        }),
        ['&.large', style.padding('8px 10px').fontSize(16)]
    ]
).mount();

// const input = document.getElementById('input') as HTMLInputElement;

// input?.addEventListener('change', () => {
//     const file = (input as any).files[0];
//     // console.log();
//     // drawer.draw(file);
// });

export function renderUI (drawer: ParticleDrawer) {

    const showPanel = $(true);

    div(
        '.container',
        style.position('fixed').right(10).top(10),
        [
            button.show(() => !showPanel.value)('.btn.large:Open Panel',
                click(() => {showPanel.value = !showPanel.value;})
            ),
            panel(drawer, showPanel),
        ]
    ).mount();
}

function panel (drawer: ParticleDrawer, showPanel: IReactItem) {


    return div.show(showPanel)('.panel',
        style({
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: '#eeee',
            width: 300,
            padding: 10,
        }),

        attributeBox('textFillColor', drawer),
        attributeBox('fontSize', drawer),
        attributeBox('lineGap', drawer),
        attributeBox('textGap', drawer),
        attributeBox('imgGap', drawer),
        attributeBox('particleRadius', drawer),
        contentBox(drawer),
        imageBox(drawer),

        funcArea(drawer),
        

        span('.close:×',
            style({
                color: '#f00',
                fontSize: 25,
                position: 'absolute',
                right: 10,
                top: 0,
                display: 'block',
                cursor: 'pointer',
            }),
            click(() => showPanel.value = false)
        ),
    );
}


function attributeBox (title: string, drawer: ParticleDrawer) {
    // @ts-ignore;
    const text = drawer[title];
    return div('.input-item',
        span('.input-title', title),
        input(`.input-el[value=${text}]`, change(e => {
            const v = e.target.value;
            // @ts-ignore;
            drawer[title] = typeof text === 'string' ? v : parseInt(v);
        }))
    );
}

function contentBox (draw: ParticleDrawer) {
    const content = $('Hello World!\nBe Happy!');
    return div('.input-item.func-box',
        span('.input-title[placeholder=Input Something]:Draw Content'),
        textarea.model(content)(`.input-el]`, style({
            width: 140,
            resize: 'vertical',
            height: 50
        })),
        btnBox('Draw Text', () => {
            clearTimer();
            let v = content.value as any;
            if (v.includes('\n')) {
                v = v.split('\n');
            }
            draw.draw(v);
        })
    );
}

function imageBox (draw: ParticleDrawer) {
    let inputEl: HTMLInputElement;
    const fileName = $('Draw Image');
    return div('.input-item.func-box',
        span('.input-title:Choose Image'),
        button('.btn', fileName, click(() => {
            inputEl.value = '';
            fileName.value = 'Draw Image';
            inputEl.click();
        })),
        input('.input-el[type=file]',
            style.visibility('hidden').position('absolute'),
            mounted(el => {
                // @ts-ignore
                inputEl = el;
            }),
            change(e => {
                const file = e.target.files[0];
                if (!file) {return;}
                fileName.value = file.name;
                clearTimer();
                try {
                    draw.draw(file);
                } catch (e) {
                    alert('Please choose a image');
                }
            })
        ),
    );
}

function funcArea (drawer: ParticleDrawer) {
    return div('.input-item.func-box',
        style.textAlign('center').marginTop(10),
        button(`.btn:Clock`, click(() => {
            const fn = () => {drawer.draw(new Date().toLocaleString().substring(9));};
            fn();
            registTimer(fn, 1000);
        }))
    );
}

function btnBox (text: string, onclick: ()=>void) {
    return div(
        style.textAlign('center').marginTop(10),
        button(`.btn:${text}`, click(onclick))
    );
}