/*
 * @Author: tackchen
 * @Date: 2022-08-03 21:07:04
 * @Description: Coding something
 */

const {build} = require('../rollup.base');


async function main () {
    await build({
        input: '@scripts/dev/index.ts',
        output: '@docs/index.min.js'
    });
}

main();

