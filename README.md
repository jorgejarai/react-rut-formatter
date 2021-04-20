# `react-rut-formatter`

Este es un _custom hook_ para React que facilita el trabajo con números de RUT/RUN (Rol Único Tributario y Rol Único Nacional, respectivamente), utilizados en Chile para propósitos de identidad y fines tributarios.

Implementa el _hook_ `useRut`, que permite que un cuadro de texto pueda recibir un RUT o RUN, darle formato (XX.XXX.XXX-X) a medida que se escribe y verificar si este es válido.

Es un trabajo en progreso de momento, pero espero tenerlo pronto en condiciones para publicarlo en NPM.

## Ejemplo

```javascript
import { useRut } from 'react-rut-formatter';

const App = () => {
  const { rut, updateRut, isValid } = useRut();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(rut.formatted);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={rut.formatted}
          onChange={(e) => updateRut(e.target.value)}
        />
        {!isValid && <span>RUT inválido</span>}
      </form>
    </div>
  );
};
```

# Cómo usar

TODO

## Formik

TODO

## API

TODO
