// jest.dontMock('./date-time');
import { getFormatedTime } from './DateTime';

describe('date-time utils', () => {
  it('Format the time as to have only hh:mm in 12 hour format', () => {
    const date = new Date();
    const locale = 'en-US';
    const formatter = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };

    expect(getFormatedTime(date, locale, formatter)).toBe(date.toLocaleTimeString([locale], formatter));
  });

  it('Format the time as to have only hh:mm in 24 hour format', () => {
    const date = new Date();
    const locale = 'IN';
    const formatter = { hour: '2-digit', minute: '2-digit'};

    expect(getFormatedTime(date, locale, formatter)).toBe(date.toLocaleTimeString([locale], formatter));
  });
});
