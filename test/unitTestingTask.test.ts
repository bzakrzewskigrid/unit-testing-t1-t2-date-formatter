import unitTestingTask from '../unitTestingTask';

describe('unitTestingTask test suite', () => {
  let sut: unitTestingTask;

  let date: Date;
  let dateToString: string;

  beforeEach(() => {
    jest.isolateModules(() => {
      sut = require('../unitTestingTask');
    });

    date = new Date('2020-01-13T15:05:18.511Z');
    dateToString = date.toString();
  });

  describe('correct values', () => {
    it.each([
      { token: 'YYYY', expected: '2020' },
      { token: 'YY', expected: '20' },
      { token: 'MMMM', expected: 'January' },
      { token: 'MMM', expected: 'Jan' },
      { token: 'MM', expected: '01' },
      { token: 'M', expected: '1' },
      { token: 'DDD', expected: 'Monday' },
      { token: 'DD', expected: 'Mon' },
      { token: 'D', expected: 'Mo' },
      { token: 'dd', expected: '13' },
      { token: 'd', expected: '13' },
      { token: 'HH', expected: '15' },
      { token: 'H', expected: '15' },
      { token: 'hh', expected: '03' },
      { token: 'h', expected: '3' },
      { token: 'mm', expected: '05' },
      { token: 'm', expected: '5' },
      { token: 'ss', expected: '18' },
      { token: 's', expected: '18' },
      { token: 'ff', expected: '000' },
      { token: 'f', expected: '0' },
      { token: 'A', expected: 'PM' },
      { token: 'a', expected: 'pm' },
      { token: 'ZZ', expected: '+0000' },
      { token: 'Z', expected: '+00:00' },
    ])(`should handle token: '$token'`, ({ token, expected }) => {
      const actual = sut(token, dateToString);
      expect(actual).toBe(expected);
    });

    it.each([
      { format: 'ISODate', expected: '2020-01-13' },
      { format: 'ISOTime', expected: '03:05:18' },
      { format: 'ISODateTime', expected: '2020-01-13T03:05:18' },
      { format: 'ISODateTimeTZ', expected: '2020-01-13T03:05:18+00:00' },
    ])(`should handle default formatter: '$format'`, ({ format, expected }) => {
      const actual = sut(format, dateToString);
      expect(actual).toBe(expected);
    });

    it('should handle AM date', () => {
      date.setHours(10);
      dateToString = date.toString();
      const actual = sut('A', dateToString);
      expect(actual).toBe('AM');
    });
  });

  describe('correct values with additional setup', () => {
    it("should format date with newly registered format: ('longDate', 'd MMMM')", () => {
      jest.isolateModules(() => {
        sut = require('../unitTestingTask');
        sut.register('longDate', 'd MMMM');

        const actual = sut('longDate', dateToString);
        expect(actual).toBe('13 January');
        expect(sut.formatters().at(-1)).toBe('longDate');
      });
    });

    it("should format date with another newly registered format: ('longDate', 'd MMMM')", () => {
      jest.isolateModules(() => {
        sut = require('../unitTestingTask');
        sut.register('someFormat', 'd MM YY');

        const actual = sut('someFormat', dateToString);
        expect(actual).toBe('13 01 20');
        expect(sut.formatters().at(-1)).toBe('someFormat');
        expect(sut.formatters()).toHaveLength(5);
      });
    });

    it('should format date correctly when language is changed', () => {
      jest.isolateModules(() => {
        sut = require('../unitTestingTask');
        require('../lang/pl');

        const actual = sut('MMMM', dateToString);
        expect(actual).toBe('styczeń');
      });
    });

    it('should format date correctly when language is changed to another language', () => {
      jest.isolateModules(() => {
        sut = require('../unitTestingTask');
        require('../lang/uk');

        const actual = sut('MMMM', dateToString);
        expect(actual).toBe('січень');
      });
    });
  });

  describe('error handling', () => {
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
});
