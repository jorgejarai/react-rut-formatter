import { useState } from "react";
import { prettifyRut, removeSeparators, calculateDv } from "./rutUtils";

/**
 * Un _hook_ personalizado que facilita el trabajo con números de RUT.
 *
 * El _hook_ retorna lo siguiente:
 *   - `rut`: Objeto conteniendo:
 *     - `formatted`: Formateado de la forma XX.XXX.XXX-X
 *     - `raw`: Formateado "en bruto" (XXXXXXXX-X), adecuado para usar en
 *       registros o variables
 *   - `updateRut`: actualiza el RUT, para entregarlo formateado en `rut`
 *   - `isValid`: indica si el RUT tiene DV válido
 *
 * @returns Lo indicado arriba
 */
export const useRut = () => {
  const [rut, setRut] = useState<string | null>(null);

  const formattedRut = prettifyRut(rut);
  const updateRut = (rut: string) => {
    setRut(removeSeparators(rut));
  };
  const dv = formattedRut.charAt(formattedRut.length - 1);
  const rutWithoutDv = rut?.slice(0, -1);
  const isValid = dv === calculateDv(parseInt(rutWithoutDv ?? ""));

  return {
    updateRut,
    rut: {
      formatted: formattedRut,
      raw: `${rutWithoutDv}-${dv}`,
    },
    isValid,
  };
};
