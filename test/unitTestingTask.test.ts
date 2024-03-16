import unitTestingTask from '../unitTestingTask';

describe('unitTestingTask test suite', () => {
  it('should work', () => {
    const actual = unitTestingTask('2024', 'YYYY');

    const expected = '2024';

    expect(actual).toBe(expected);
  });
});
