/*
 * @Author: chenzhongsheng
 * @Date: 2023-06-06 09:05:00
 * @Description: Coding something
 */

import {css, style} from 'alins-style';
import {button, div, input, span, $, IReactItem, click, change, textarea, mounted} from 'alins';
import {ParticleDrawer} from '../../src/index';

css('body')(
    style.padding(0).margin(0).overflow('hidden'),
    ['.input-item',
        style(`
        margin: 10px 0;
        `),
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
    ['.btn', style({
        backgroundColor: 'rgb(28,195,255)',
        padding: '8px 10px',
        outline: 'none',
        border: 'none',
        borderRadius: 3,
        fontSize: 16,
        color: 'white',
        cursor: 'pointer',
    })]
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
            button.show(() => !showPanel.value)('.btn:Open Panel',
                click(() => {showPanel.value = !showPanel.value;})
            ),
            panel(drawer, showPanel),
        ]
    ).mount();
}

function panel (drawer: ParticleDrawer, showPanel: IReactItem) {

    const content = $('');

    return div.show(showPanel)('.panel',
        style({
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: '#eeee',
            width: 300,
            padding: 10,
        }),

        attributeBox('fillColor', drawer),
        attributeBox('textGap', drawer),
        attributeBox('imgGap', drawer),
        attributeBox('particleRadius', drawer),
        contentBox(content),
        imageBox(file => {
            console.log(file);
        }),

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

function contentBox (model: IReactItem) {
    return div('.input-item',
        span('.input-title[placeholder=Input Something]:Draw Content'),
        input.model(model)(`.input-el]`)
    );
}

function imageBox (onchange: (file: File)=>void) {
    let inputEl: HTMLInputElement;
    const fileName = $('Click to Choose');
    return div('.input-item',
        span('.input-title:Choose Image'),
        button('.btn', fileName, click((e) => {
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
                if (!file) throw new Error('No File choosed');
                onchange(file);
            })
        )
    );
}