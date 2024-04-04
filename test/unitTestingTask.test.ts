import unitTestingTask from '../unitTestingTask';

describe('unitTestingTask test suite', () => {
  let formatDate: unitTestingTask;

  let date: Date;
  let dateString: string;

  beforeEach(() => {
    jest.isolateModules(() => {
      formatDate = require('../unitTestingTask');
    });

    date = new Date('2020-11-16T15:12:43.511Z');
    dateString = date.toString();
  });

  describe('correct values', () => {
    it.each([
      { token: 'YYYY', expected: '2020' },
      { token: 'YY', expected: '20' },
      { token: 'MMMM', expected: 'November' },
      { token: 'MMM', expected: 'Nov' },
      { token: 'MM', expected: '11' },
      { token: 'M', expected: '11' },
      { token: 'DDD', expected: 'Monday' },
      { token: 'DD', expected: 'Mon' },
      { token: 'D', expected: 'Mo' },
      { token: 'dd', expected: '16' },
      { token: 'd', expected: '16' },
      { token: 'HH', expected: '15' },
      { token: 'H', expected: '15' },
      { token: 'hh', expected: '03' },
      { token: 'h', expected: '3' },
      { token: 'mm', expected: '12' },
      { token: 'm', expected: '12' },
      { token: 'ss', expected: '43' },
      { token: 's', expected: '43' },
      { token: 'ff', expected: '000' },
      { token: 'f', expected: '0' },
      { token: 'A', expected: 'PM' },
      { token: 'a', expected: 'pm' },
      { token: 'ZZ', expected: '+0000' },
      { token: 'Z', expected: '+00:00' },
    ])(`should handle token: '$token'`, ({ token, expected }) => {
      const actual = formatDate(token, dateString);
      expect(actual).toBe(expected);
    });

    it.each([
      { token: 'MM', expected: '01' },
      { token: 'M', expected: '1' },
      { token: 'dd', expected: '03' },
      { token: 'd', expected: '3' },
      { token: 'HH', expected: '09' },
      { token: 'H', expected: '9' },
      { token: 'hh', expected: '09' },
      { token: 'h', expected: '9' },
      { token: 'mm', expected: '05' },
      { token: 'm', expected: '5' },
      { token: 'ss', expected: '07' },
      { token: 's', expected: '7' },
      { token: 'A', expected: 'AM' },
      { token: 'a', expected: 'am' },
    ])(`should handle token: '$token' with zero padding`, ({ token, expected }) => {
      const leadingZerosDate = new Date('2020-01-03T09:05:07.511Z').toString();
      const actual = formatDate(token, leadingZerosDate);
      expect(actual).toBe(expected);
    });

    // 2020-11-16T15:12:43.511Z
    it.each([
      { format: 'ISODate', expected: '2020-11-16' },
      { format: 'ISOTime', expected: '03:12:43' },
      { format: 'ISODateTime', expected: '2020-11-16T03:12:43' },
      { format: 'ISODateTimeTZ', expected: '2020-11-16T03:12:43+00:00' },
    ])(`should handle default formatter: '$format'`, ({ format, expected }) => {
      const actual = formatDate(format, dateString);
      expect(actual).toBe(expected);
    });
  });

  describe('correct values with additional setup', () => {
    it("should format date with newly registered format: ('longDate', 'd MMMM')", () => {
      jest.isolateModules(() => {
        formatDate = require('../unitTestingTask');
        formatDate.register('longDate', 'd MMMM');

        const actual = formatDate('longDate', dateString);
        expect(formatDate.formatters()).toContain('longDate');
        expect(actual).toBe('16 November');
      });
    });

    it('should format date correctly when language is changed', () => {
      jest.isolateModules(() => {
        formatDate = require('../unitTestingTask');
        require('../lang/pl');

        const actual = formatDate('MMMM', dateString);
        expect(actual).toBe('listopad');
      });
    });

    it('should format date with default language when language is changed to the non-existing one', () => {
      jest.isolateModules(() => {
        formatDate.lang('123');

        const actual = formatDate('MMMM', dateString);
        expect(actual).toBe('November');
      });
    });
  });

  describe('error handling', () => {
    it('should throw an error when format is empty', () => {
      expect(() => {
        formatDate('', dateString);
      }).toThrow('Argument `format` must be a string');
    });

    it('should throw an error when format is not string', () => {
      expect(() => {
        formatDate(123, dateString);
      }).toThrow('Argument `format` must be a string');
    });

    it('should throw an error when date is incorrect', () => {
      expect(() => {
        formatDate('YYYY', true);
      }).toThrow('Argument `date` must be instance of Date or Unix Timestamp or ISODate String');
    });

    it('should throw an error when it formats with language without options defined', () => {
      jest.isolateModules(() => {
        formatDate.lang('pl');

        expect(() => {
          formatDate('MMMM', dateString);
        }).toThrow();
      });
    });
  });
});
