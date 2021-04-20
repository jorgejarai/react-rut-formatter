import { useState } from 'react';
import { prettifyRut, removeSeparators, calculateDv } from './rutUtils';

export const useRut = () => {
  const [rut, setRut] = useState<string | null>(null);

  const formattedRut = prettifyRut(rut);
  const updateRut = (rut: string) => {
    setRut(removeSeparators(rut));
  };
  const dv = formattedRut.charAt(formattedRut.length - 1);
  const rutWithoutDv = rut?.slice(0, -1);
  const isValid = dv === calculateDv(parseInt(rutWithoutDv ?? ''));

  return {
    updateRut,
    rut: {
      formatted: formattedRut,
      raw: `${rutWithoutDv}-${dv}`,
    },
    isValid,
  };
};
