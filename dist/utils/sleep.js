"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sleep(seconds) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, seconds * 1000);
}
exports.default = sleep;
