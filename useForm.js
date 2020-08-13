import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, reset];
};

/* 
Documentacion:
Este hook esta diseñando para manejar  los datos de todos los campos de un formulario a continuacion una breve explicacion de como sarlo dentro de un componente. 

1. Lo primero es fenerar la importacion de hook a nuestro componente

2 incluir la estrunctura de nuestro hook dentro de nuestro compoente que seria la siguiente:

  const [{ description }, handleInputChange, reset] = useForm({
    description: "",
  });
  
  Como se puede observar los parametros que el hook recibe en la ejecucion del hook dentro del componete son los mismo que exporta. Hay que tner en cuenta que el hook devulve estos parametro como un array [] por lo que estos vaslores cuando se importan no dependen del nombre si no de su posicion. 

3. El estado incial de este hook siempre debe reflejar el estado incial de los campos que el fomulario tiene  en este caso como solo tenemos un capo usamos la destructuracion dentro de la funcion del parametro incial para poder reflejar su valor. sin embargo si son multiple campos lo manejariamos de la siguiente manera:

  const [formValues, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formValues;

  recodemos que esto valores reflejaran el name de cada campo, por lo que estos valores correponden al name de cada campo. 

4.El parametro handleInputChange es el que nos va permitir enviar los datos desde al componete a nuestro hook  para su porcesamiento entonces nuestro input debe verse mas o menos asi:
  <input
    type="text"
    name="description"
    placeholder="Agrega una tarea"
    autoComplete="off"
    className=" form-control"
    value={description}
    onChange={handleInputChange}
  />
  Como se puede se puede ver en este caso de nuestro input:
    1. el name corresponde al valor incial  description: nota cada input debe tener un name distinto para permitir el su correcto fucionamiento
    2. Value corresponde al valor que tiene el input es decir que si el valor incial de description dentro de nuestro hook tuviera un valor este se veria refleajado en el input
    3 en el onChage del input incluimos el hadleInputChange esto nos permite cambiar el valor de nuestro estado incial cada vez que se inserte un valor o un nuevo caracter dentro del input. Esto generes que el nombre del input en su esado incial siempre tenga el valor correspondiente del input es decir que este parametro como lo manejemos sera el que tenga constamente dicho valor. 

5. El tercer parametro es el reset este valor nos permite poner en cero nuestro valores del input en nuestro front por lo tanto lo ejecutamos en el momento en que el proceso que queremos que realice con los campos se haya finalizado es decir cuando termine el submit del fomulario que por lo general es manejado por una funcion es especifico

*/
