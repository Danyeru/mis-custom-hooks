# useCharLimiter Hook

El hook useCharacterLimiter permite limitar la cantidad de palabras en un texto esto es particularmente util cuando se quiere proveer al usuarion con un contexto y redirigirlo a una visulizacion completa de un contenido.

```
const response = useCharLimiter({
  body: string
})

``` 
El unico parametro obligatorio del hook es pasarle un string sin embargo maneja multiples opciones que puede ser modificas estos son sus valores por defecto: 

```
  count = 10,
  finish = true,
  all = true,
  symbol = ` ...`,

```
count: indica la cantidad de palabras que es devuelto por el hook basandose en el string que se le proporciona.

finish: le indica si se desea o no usar un caracter al final del texto "si se usa en false el texto sera recortado pero no se usara ningun caracter al final".

all: funciona en conjunto con el parametro finish. si all y finish estan en true todos los textos que devulve hook tendran un caracter al final. Si finish esta en true y all esta en false entonces solo los textos que sean recortados estaran acompañados de un texto al final

symbol: corresponde al caracter que sea puesto al final del texto devuelto. Por defecto son puntos suspensivos ...


Symbol tambien puede ser creado como un objeto para permitir una mayor flexibilidad. Esto permite al hook crear elemento de JSX basandose en el objeto que se le envie. Para esto uso el objeto symbol debe tener:

type: es un string. corresponde al tipo de etiqueta que se renderisa es decir que si se le pasa "a" = <a></a> si se le pasa "span" = <span></sapan> etc.

params: equivale a los parametros de la eiqueta puede ser: href, style, type. etc esto depende de la etiqueta y del uso que se le quiera dar.

character: corresponde al texto o string que se desea dentro de la etiqueta teniendo en cuenta que sea una etiqueta de apertura y cierre. si no es el caso este texto debe estar puesto como estring vacion y el valor pasado como parametro.

Nota: en el caso de querer usar estilos css deben ser pasados dentro de los parametros como un nuevo objeto.

Ejemplos:

```
  const titleText = useCharLimiter({
    body: title,
    count: 5,
    all: false,
  });
```
En el ejemplo de arriba el hook limita el texto de los titulos ha 5 palabra y agrega el symbol por defecto solo a los titulos que limnite

```
  const bodyText = useCharLimiter({
    body: body,
    count: 20,
    all: false,
    symbol: {
      type: "span",
      params: {
        style: {
          color: "red",
          background: "white",
          marginLeft: "5px",
          borderRadius: "50%",
          border: "1px solid black",
          position: "absolute",
          padding:"0px 2px 2px 4px" 
        },
      },
      character: "►", 
    },
  });
```
En el ejemplo de arriba el hook limita el cuerpo de texto que se le pasa ha 20 palabras y solo pone el symbol ha los textos que limitew. adicionalmente en este el elemento que limita el texto es un objeto de JSX que corresponde a una etiqueta span que adicionalmente usa los estilos del objeto style y que como texto usa el carater ►.

Nota: los ejemplos anteriormete mostrados fueron usados en el mismo compoente para limitar tanto el titulo y el texto en cada renderizacion del compoente.

```
const ppp = useCharLimiter({
    body: body,
    count: 20,
    symbol: {
      type: "a",
      params:{ 
        style:{
          color: "red",
          background: "black",
          marginLeft: "5px",
        }, 
        href:"http://google.com",
        target: "_blank"
      },
      character: " ver mas",
    },
  });
```
En el ejemplo de arriba se muestr como el hook puede crear un symbol con multiples parametro mas all del estilo en este caso el symbol crea una etiqueta a que tiene estilos, href y target, esto ilustra que la complejidad de symbol puede ser tanta como se requiera. 

Ahora es clave entender que este hook se ejecuta en cada rederizacion del componente. por esta razon si al compoente en el que usa tiene parametros variable que se quiera usar dentro del hook puede ser usado perfectamente. 

Por ejemplo en el caso de este ejemplo si url de href se la pasamos desde un parametro del componete padre cada renderizacion del componete que ejecute le pasara un nuevo valor a dicho parametro.