export default class Timer {
  startTime = 0;
  endTime = 0;
  elapsedTime = 0;

  start() {
    this.startTime = Date.now();
  }
  stop() {
    this.endTime = Date.now();

    // Calc elapsed time
    this.elapsedTime = Number(((this.endTime - this.startTime)/1000).toFixed(1));
  }
}