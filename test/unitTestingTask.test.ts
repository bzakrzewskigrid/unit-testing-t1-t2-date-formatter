import unitTestingTask from '../unitTestingTask';

describe('unitTestingTask test suite', () => {
  let sut = unitTestingTask;

  let date = new Date('2020-01-13');
  date.setHours(15);
  date.setMinutes(5);
  date.setSeconds(18);
  date.setMilliseconds(511);

  console.log(date.getMilliseconds());
  let dateToString = date.toString();

  it.each([
    {
      format: 'YYYY',
      expected: '2020',
    },
    {
      format: 'YY',
      expected: '20',
    },
    {
      format: 'MMMM',
      expected: 'January',
    },
    {
      format: 'MMM',
      expected: 'Jan',
    },
    {
      format: 'MM',
      expected: '01',
    },
    {
      format: 'M',
      expected: '1',
    },
    {
      format: 'DDD',
      expected: 'Monday',
    },
    {
      format: 'DD',
      expected: 'Mon',
    },
    {
      format: 'D',
      expected: 'Mo',
    },
    {
      format: 'dd',
      expected: '13',
    },
    {
      format: 'd',
      expected: '13',
    },
    {
      format: 'HH',
      expected: '15',
    },
    {
      format: 'H',
      expected: '15',
    },
    {
      format: 'hh',
      expected: '03',
    },
    {
      format: 'h',
      expected: '3',
    },
    {
      format: 'mm',
      expected: '05',
    },
    {
      format: 'm',
      expected: '5',
    },
    {
      format: 'ss',
      expected: '18',
    },
    {
      format: 's',
      expected: '18',
    },
    {
      format: 'ff',
      expected: '000',
    },
    {
      format: 'f',
      expected: '0',
    },
    {
      format: 'A',
      expected: 'PM',
    },
    {
      format: 'a',
      expected: 'pm',
    },
    {
      format: 'ZZ',
      expected: '+0000',
    },
    {
      format: 'Z',
      expected: '+00:00',
    },
  ])(`'${dateToString}' formatted with allowed format: '$format' should be correct`, ({ format, expected }) => {
    const actual = sut(format, dateToString);
    expect(actual).toBe(expected);
  });
});