/**
 * Remueve los separadores de un número de RUT (como "." o "-").
 * @param rut RUT a limpiar
 * @returns El mismo RUT sin separadores (p. ej. 444444444)
 */
export const removeSeparators = (rut: string | null): string => {
  if (!rut) {
    return "";
  }

  // Removemos cualquier carácter que no sea dígito o la letra K.
  // Luego elimina cualquier instancia extra de la letra K
  // (solo puede haber una al final de un RUT, si es que ese es su DV)
  return rut.replace(/[^0-9kK]/g, "").replace(/[kK]{1,}$/, "K");
};

/**
 * Le da formato a un RUT, incluyendo separadores de miles. Adecuado para presentación.
 *
 * Por ejemplo, "444444444" o "44444444-4" se convierte en "44.444.444-4".
 * @param rut RUT a formatear
 * @returns El mismo RUT con formato XX.XXX.XXX-X
 */
export const prettifyRut = (rut: string | null): string => {
  if (!rut) {
    return "";
  }

  const cleanRut = removeSeparators(rut);

  // Tenemos una K que no esté al final del RUT?
  if (cleanRut.slice(0, -1).toUpperCase().includes("K")) {
    return "";
  }

  // Separamos el RUT de su DV
  const dv = cleanRut.charAt(cleanRut.length - 1).toUpperCase();
  const rutWithoutDv = cleanRut.slice(0, -1).replace(/^0+/, "");

  const formattedRut = rutWithoutDv
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Si hay un sólo dígito de momento, lo dejamos con formato 0-X
  // para que se vea más presentable mientras el usuario tipea el resto
  if (formattedRut === "") {
    return `0-${dv}`;
  }

  return `${formattedRut}-${dv}`;
};

/**
 * Le da formato a un RUT, sin incluir separadores de miles. Adecuado para uso interndo de un programa.
 *
 * Por ejemplo, "444444444" o "44444444-4" se convierte en "44444444-4".
 * @param rut RUT a formatear
 * @returns El mismo RUT con formato XXXXXXXX-X
 */
export const formatRut = (rut: string | null): string => {
  if (!rut) {
    return "";
  }

  const cleanRut = removeSeparators(rut);

  // Tenemos una K que no esté al final del RUT?
  if (cleanRut.slice(0, -1).toUpperCase().includes("K")) {
    return "";
  }

  // Separamos el RUT de su DV
  const dv = cleanRut.charAt(cleanRut.length - 1).toUpperCase();
  const rutWithoutDv = cleanRut.slice(0, -1).replace(/^0+/, "");

  // Si hay un sólo dígito de momento, lo dejamos con formato 0-X
  // para que se vea más presentable mientras el usuario tipea el resto
  if (rutWithoutDv === "") {
    return `0-${dv}`;
  }

  return `${rutWithoutDv}-${dv}`;
};

type RutDv = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "K";

/**
 * Calcula el dígito verificador (DV) de un RUT.
 * @param rut Rut a calcular
 * @returns Su dígito verificador
 */
export const calculateDv = (rut: number): RutDv => {
  const rutArr = Math.abs(rut).toString().split("");
  const digits = rutArr.map((digit) => parseInt(digit, 10)).reverse();

  const sum = digits.reduce((acc, digit, idx) => {
    const weightedDigit = digit * ((idx % 6) + 2);

    return acc + weightedDigit;
  }, 0);

  const modulo = 11 - (sum % 11);

  if (modulo === 11) {
    return "0";
  } else if (modulo === 10) {
    return "K";
  } else {
    return modulo.toString() as RutDv;
  }
};

/**
 * Comprueba si el dígito verificador de un RUT (con o sin formato) es válido.
 * @param rut RUT a comprobar
 * @returns Si el RUT tiene un dígito verificador válido
 */
export const checkRut = (rut: string | null): boolean => {
  if (!rut) {
    return false;
  }

  // Limpiamos el RUT de caracteres innecesarios
  const cleanRut = removeSeparators(rut);

  // Un RUT debiera tener como mínimo tres caracteres (X-X)
  if (cleanRut.length < 2) {
    return false;
  }

  const rutWithoutDv = parseInt(cleanRut.slice(0, -1));
  const dv = cleanRut.charAt(cleanRut.length - 1).toUpperCase();

  return calculateDv(rutWithoutDv) === dv;
};
