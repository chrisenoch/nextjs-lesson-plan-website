export function delay(cb: () => void, duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(cb()), duration);
  });
}

export function simpleDelay(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
