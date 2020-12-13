"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor() {
        this.startTime = 0;
        this.endTime = 0;
        this.elapsedTime = 0;
    }
    start() {
        this.startTime = Date.now();
    }
    stop() {
        this.endTime = Date.now();
        // Calc elapsed time
        this.elapsedTime = this.endTime - this.startTime;
    }
}
exports.default = Timer;
