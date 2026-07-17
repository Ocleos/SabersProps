import { toApiResult, unwrapApiResult } from '~src/utils/apiResult.utils';

describe('toApiResult', () => {
  it('returns a success result when there is no error', () => {
    expect(toApiResult({ id: '1' }, null)).toEqual({
      data: { id: '1' },
      error: null,
      status: 'success',
    });
  });

  it('returns an error result carrying the error message when there is an error', () => {
    expect(toApiResult(null, { message: 'boom' })).toEqual({
      data: null,
      error: { message: 'boom' },
      status: 'error',
    });
  });
});

describe('unwrapApiResult', () => {
  it('returns the data of a success result', () => {
    expect(unwrapApiResult(toApiResult({ id: '1' }, null))).toEqual({ id: '1' });
  });

  it('throws an Error carrying the message of an error result', () => {
    expect(() => unwrapApiResult(toApiResult(null, { message: 'boom' }))).toThrow('boom');
  });
});
