# `react-rut-formatter`

Este es un _custom hook_ para React que facilita el trabajo con números de RUT/RUN (Rol Único Tributario y Rol Único Nacional, respectivamente), utilizados en Chile para propósitos de identidad o tributarios.

Implementa el _hook_ `useRut`, que permite que un cuadro de texto pueda recibir un RUT o RUN, darle formato (XX.XXX.XXX-X) a medida que se escribe y verificar si este es válido.

## Cómo instalar

Para instalar `react-rut-formatter`, basta con agregar el paquete usando su administrador de paquetes de preferencia:

### NPM

```console
$ npm install react-rut-formatter
```

### Yarn

```console
$ yarn add react-rut-formatter
```

Los test incorporados pueden ejecutarse con `yarn test` o `npm run test`.

## Ejemplo

```javascript
import { useRut } from "react-rut-formatter";

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

## Cómo usar

El _hook_ `useRut` maneja automáticamente la tarea de darle formato a un RUT, dejando al programador solamente con la tarea de asociarlo a una entrada de texto, lo que se logra como en el ejemplo anterior para un `<input>` simple.

`useRut` retorna un objeto conteniendo los siguientes elementos:

- `rut`: otro objeto que contiene el RUT con los siguientes formatos:
  - `formatted`: Formato _pretty-printed_ (XX.XXX.XXX-X). Adecuado para presentación.
  - `raw`: Formato "en bruto", sin separadores de miles (XXXXXXXX-X). Adecuado como atributo o variable.
- `updateRut`: actualiza el RUT almacenado y le vuelve a dar formato como está descrito arriba.
- `isValid`: Indica si el dígito verificador del RUT es válido

### Uso avanzado

En caso de usar una librería para manejo de formularios, puede no ser práctico usar `useRut`. Para ese caso es posible usar las funciones que usa internamente el _hook_. Para eso contamos con:

- `checkRut`: Revisa si el RUT entregado tiene un dígito verificador válido
- `prettifyRut`: Formatea el RUT de la forma XX.XXX.XXX-X (para presentación)
- `formatRut`: Formatea el RUT de la forma XXXXXXXX-X (para uso interno)
- `removeSeparators`: Remueve todo carácter que no sea dígito o la letra K del RUT. Ideal para almacenar el valor internamente.

También tenemos:

- `calculateDv`: Calcula el dígito verificador de un RUT

Esto luego puede ser usado con librerías como Formik, como podemos ver a continuación:

```javascript
import { Formik } from "formik";
import { checkRut, prettifyRut, formatRut } from "react-rut-formatter";

const App = () => {
  return (
    <div>
      <Formik
        initialValues={{ rut: "" }}
        validate={(values) => {
          const errors: { rut?: string } = {};

          if (!values.rut) {
            errors.rut = "Se requiere un RUT";
          } else if (!checkRut(values.rut)) {
            errors.rut = "RUT inválido";
          }

          return errors;
        }}
        onSubmit={(values) => {
          const rut = formatRut(values.rut);

          console.log(rut);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              id="rut"
              name="rut"
              value={values.rut}
              onChange={handleChange}
              onBlur={(event) => {
                const formatted = prettifyRut(values.rut);
                setFieldValue("rut", formatted);

                handleBlur(event);
              }}
            />
            {errors.rut && touched.rut && <span>{errors.rut}</span>}
            <input type="submit" />
          </form>
        )}
      </Formik>
    </div>
  );
};
```
