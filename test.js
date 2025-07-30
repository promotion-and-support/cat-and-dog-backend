/* eslint-disable max-lines */
/* case 1 */

// const fn1 = async () => console.log('first');
// const fn2 = async () => console.log('second');

// const listeners = [fn1, fn2];

// const promises1 = listeners.map((fn) => fn());
// Promise.all(promises1).then(() => console.log('promises end 1'));

// const promises2 = listeners.map((fn) => fn());
// Promise.all(promises2).then(() => console.log('promises end 2'));

// console.log('END');

/* case 2 */

const { Emitter } = require('./ee.js');

const emitter = new Emitter();

const listen = async () => {
  for await (const data of emitter.toAsyncIterable('event')) {
    console.log('async', data);
  }
};

listen();

emitter.on('event', (data) => console.log('sync', data));

emitter.emit('event', { value: 1 });
emitter.emit('event', { value: 2 });

/* case 3 */
// const { Emitter } = require('./ee.new.js');

// const emitter = new Emitter();

// emitter.once('event', (data) => console.log('once 1', data));
// emitter.once('event', (data) => console.log('once 2', data));

// emitter.emit('event', { value: 1 });
// emitter.emit('event', { value: 2 });

/* case 4 */
// const { Emitter } = require('./ee.new.js');

// const emitter = new Emitter();

// emitter.on('event 1', (data) => {
//   console.log('on 1', data);
//   emitter.emit('event 2', { value: 22 });
// });
// emitter.on('event 2', (data) => console.log('on 2', data));

// emitter.emit('event 1', { value: 1 });
// emitter.emit('event 2', { value: 21 });

/* case 5 */
// const { Emitter } = require('./ee.new.js');

// const emitter = new Emitter();

// emitter.once('event 1', (data) => {
//   console.log('once 1', data);
//   emitter.emit('event 1', { value: 2 });
// });
// emitter.once('event 1', (data) => {
//   console.log('once 2', data);
// });

// emitter.emit('event 1', { value: 1 });

/* case 6 */
// const { Emitter } = require('./ee.js');

// const emitter = new Emitter();

// const handler = (data) => {
//   console.log('on 1', data);
//   emitter.off('event 1', handler);
// };

// emitter.on('event 1', handler);
// emitter.on('event 1', (data) => console.log('on 2', data));

// emitter.emit('event 1', { value: 1 });

// [100, 200].map((v, i, arr) => {
//   console.log({ v });
//   if (i === 0) arr.splice(0, 1);
// });

// const arr = [100, 200];
// let i = 0;
// for (const v of arr) {
//   console.log({ v });
//   if (i++ === 0) arr.splice(0, 1);
// }

/* case 7 */
// const { Emitter } = require('./ee.js');

// const emitter = new Emitter();

// const handler = (data) => console.log(data);

// emitter.on('event 1', handler);
// emitter.once('event 1', handler);

// emitter.off('event 1', handler);

// console.log('BEFOR EMIT');

// emitter.emit('event 1', { value: 1 });

// console.log('AFTER EMIT');
