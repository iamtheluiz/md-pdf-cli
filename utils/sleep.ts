export default function sleep(seconds: number) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, seconds*1000);
}