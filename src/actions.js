
export const INCREMENT = 'INCREMENT';
export function increment() {
  return {
    type: INCREMENT
  }
}

export function incrementAsync() {
  return dispatch =>
    setTimeout(() => dispatch(increment()), 2000);
}
