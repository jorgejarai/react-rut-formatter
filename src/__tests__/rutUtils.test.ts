import { calculateDv, prettifyRut, removeSeparators } from '../rutUtils';

describe('removeSeparators', () => {
  it('removes separators from a RUT number', () => {
    expect(removeSeparators('44.444.444-4')).toBe('444444444');
  });

  it('returns an empty string when receiving an empty or null string', () => {
    expect(removeSeparators('')).toBe('');
    expect(removeSeparators(null)).toBe('');
  });

  it('leaves unaltered a RUT number without separators', () => {
    expect(removeSeparators('444444444')).toBe('444444444');
    expect(removeSeparators('44444455k')).toBe('44444455K');
    expect(removeSeparators('44444455K')).toBe('44444455K');
  });
});

describe('prettifyRut', () => {
  it('prettifies a RUT number without thousands separators', () => {
    expect(prettifyRut('44444444-4')).toBe('44.444.444-4');
    expect(prettifyRut('66666666-6')).toBe('66.666.666-6');
    expect(prettifyRut('0-0')).toBe('0-0');
  });

  it('prettifies a RUT number without any separators', () => {
    expect(prettifyRut('444444444')).toBe('44.444.444-4');
    expect(prettifyRut('666666666')).toBe('66.666.666-6');
    expect(prettifyRut('00')).toBe('0-0');
  });

  it('returns an empty string upon receiving an invalid RUT number', () => {
    expect(prettifyRut('')).toBe('');
    expect(prettifyRut('12K45678-6')).toBe('');
  });
});

describe('calculateDv', () => {
  it('calculates a valid DV', () => {
    expect(calculateDv(0)).toBe('0');
    expect(calculateDv(1)).toBe('9');
    expect(calculateDv(44444444)).toBe('4');
    expect(calculateDv(66666666)).toBe('6');
    expect(calculateDv(44444455)).toBe('K');
  });
});
