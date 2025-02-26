export const isChanged = <T extends object>(keys: (keyof T)[], first: T | undefined, second: T) => {
  if (!keys.length || !first) {
    return true;
  }
  return keys.some((p) => !Object.is(first[p], second[p]));
};

export const STYLE = {
  whiteBlack: 'color: white; background: black',
  grayOrange: 'color: greay; background: orange',
};
export const toConsole = (instance: object, ...args: any[]) => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }
  if (!args.length) {
    return;
  }
  const instanceOf = instance.constructor.name;
  if (typeof args[0] === 'function') {
    args[0] = (args[0] as () => any).name;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  console.log('%c %s %c %s', STYLE.whiteBlack, instanceOf, STYLE.grayOrange, ...args);
};

export const delay = (timeout: number) => {
  return new Promise((rv) => {
    setTimeout(rv, timeout);
  });
};
