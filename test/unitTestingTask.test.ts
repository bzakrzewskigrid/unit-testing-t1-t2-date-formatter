import unitTestingTask from '../unitTestingTask';

describe('unitTestingTask test suite', () => {
  let sut = unitTestingTask;

  let date: Date;
  let dateToString: string;

  date = new Date('2020-01-13');
  date.setHours(15);
  date.setMinutes(5);
  date.setSeconds(18);
  date.setMilliseconds(511);
  dateToString = date.toString();

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

  it.each([
    {
      format: 'ISODate',
      expected: '2020-01-13',
    },
    {
      format: 'ISOTime',
      expected: '03:05:18',
    },
    {
      format: 'ISODateTime',
      expected: '2020-01-13T03:05:18',
    },
    {
      format: 'ISODateTimeTZ',
      expected: '2020-01-13T03:05:18+00:00',
    },
  ])(`'${dateToString}' formatted with basic format: '$format' should be correct`, ({ format, expected }) => {
    const actual = sut(format, dateToString);
    expect(actual).toBe(expected);
  });

  it('should return correctly formatted date when it it am', () => {
    date.setHours(10);
    dateToString = date.toString();
    const actual = sut('A', dateToString);
    expect(actual).toBe('AM');
  });

  // todo
  it.skip('should format date correctly when language is changed', () => {
    // sut._languages = {};
    // sut.lang('en', '');
    // sut.lang('be', '');

    // console.log(sut);
    // console.log(sut.lang);
    const actual = sut('MMMM', dateToString);
    expect(actual).toBe('TEST');
  });

  // todo
  it('should format date with newly registered formatter', () => {
    unitTestingTask.register('longDate', 'd MMMM');
    const actual = sut('longDate', dateToString);
    expect(actual).toBe('13 January');
  });

  it('should throw an error when format is empty', () => {
    expect(() => {
      sut('', dateToString);
    }).toThrow('Argument `format` must be a string');
  });

  it('should throw an error when format is not string', () => {
    expect(() => {
      sut(123, dateToString);
    }).toThrow('Argument `format` must be a string');
  });

  it('should throw an error when date is incorrect', () => {
    expect(() => {
      sut('YYYY', true);
    }).toThrow('Argument `date` must be instance of Date or Unix Timestamp or ISODate String');
  });
});
