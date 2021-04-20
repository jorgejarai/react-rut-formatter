export const removeSeparators = (num: string | null) => {
  if (!num) {
    return '';
  }

  return num.replace(/[^0-9kK]/g, '').replace(/[kK]{1,}$/, 'K');
};

export const prettifyRut = (rut: string | null): string => {
  if (!rut) {
    return '';
  }

  const cleanRut = removeSeparators(rut);

  if (cleanRut.slice(0, -1).toUpperCase().includes('K')) {
    return '';
  }

  const dv = cleanRut.charAt(cleanRut.length - 1).toUpperCase();
  const rutWithoutDv = cleanRut.slice(0, -1).replace(/^0+/, '');

  const formattedRut = rutWithoutDv
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  if (formattedRut === '') {
    return `0-${dv}`;
  }

  return `${formattedRut}-${dv}`;
};

type RutDv = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'K';

export const calculateDv = (rut: number): RutDv => {
  const rutArr = Math.abs(rut).toString().split('');
  const digits = rutArr.map((digit) => parseInt(digit, 10)).reverse();

  const sum = digits.reduce((acc, digit, idx) => {
    const weightedDigit = digit * ((idx % 6) + 2);

    return acc + weightedDigit;
  }, 0);

  const modulo = 11 - (sum % 11);

  if (modulo === 11) {
    return '0';
  } else if (modulo === 10) {
    return 'K';
  } else {
    return modulo.toString() as RutDv;
  }
};

export const checkRut = (rut: string | null): boolean => {
  if (!rut) {
    return false;
  }

  const cleanRut = removeSeparators(rut);

  if (cleanRut.length < 2) {
    return false;
  }

  const rutWithoutDv = parseInt(cleanRut.slice(0, -1));
  const dv = cleanRut.charAt(cleanRut.length - 1).toUpperCase();

  console.log(rutWithoutDv, dv);

  return calculateDv(rutWithoutDv) === dv;
};
