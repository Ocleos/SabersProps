export enum State {
  NONE = 0,
  PRODUCTION = 1,
  DESIGN = 2,
  MISSING_PIECES = 3,
  READY = 4,
  IN_PROGRESS = 5,
  DONE = 6,
  ON_SALE = 7,
  SOLD = 8,
}

export const getColorForState = (state: State, shade: number, alpha?: number) => {
  let color = '';

  switch (state) {
    case State.PRODUCTION:
    case State.DESIGN:
      color = 'danger';
      break;
    case State.MISSING_PIECES:
    case State.READY:
    case State.IN_PROGRESS:
      color = 'warning';
      break;
    case State.DONE:
      color = 'success';
      break;
    case State.ON_SALE:
    case State.SOLD:
      color = 'info';
      break;
  }

  const alphaColor = alpha ? `.${alpha}` : '';
  return `${color}.${shade}${alphaColor}`;
};
