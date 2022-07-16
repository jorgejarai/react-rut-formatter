import { renderHook, act } from "@testing-library/react-hooks";

import { useRut } from "../useRut";

it("properly receives and formats a given RUT number", () => {
  const { result } = renderHook(() => useRut());

  act(() => {
    result.current.updateRut("444444444");
  });

  expect(result.current.rut.raw).toBe("44444444-4");
  expect(result.current.rut.formatted).toBe("44.444.444-4");
});

it("checks if a RUT number is valid or not", () => {
  const { result } = renderHook(() => useRut());

  act(() => {
    result.current.updateRut("444444444");
  });

  expect(result.current.isValid).toBeTruthy();

  act(() => {
    result.current.updateRut("444444445");
  });

  expect(result.current.isValid).toBeFalsy();
});
