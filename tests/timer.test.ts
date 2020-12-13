import sleep from '../utils/sleep';
import Timer from '../lib/Timer';

describe('test timer count', () => {
  it('should return 1 second', () => {
    const timer = new Timer();

    timer.start();
    sleep(1);
    timer.stop();

    expect(timer.elapsedTime).toBe(1);
  })
})