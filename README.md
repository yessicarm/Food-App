
# Food - App

<p align="right">
  <img height="750" src="./Food APP.png" />
</p>

# Proyecto (Single Page Application) Food App #


#### Tecnologías necesarias:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

__IMPORTANTE__: No se uso ninguna librería externa para aplicar estilos a la aplicación.  Solo  CSS  puro.




## Descripción 

Esta es una aplicación en la cual se puedan ver distintas recetas de comida junto con información relevante de las mismas utilizando la api externa [spoonacular](https://spoonacular.com/food-api) y a partir de ella poder, entre otras cosas:

  - Buscar recetas
  - Filtrarlos / Ordenarlos
  - Crear nuevas recetas propias por medio de un formulario
  - filtrados y ordenamientos desde el frontend.



### Endpoints/Flags:

  * GET https://api.spoonacular.com/recipes/complexSearch
    - Para obtener mayor información sobre las recetas
  * GET https://api.spoonacular.com/recipes/{id}/information



#### Frontend

Aplicación de React/Redux que contenga las siguientes pantallas/rutas.

__Pagina inicial__: 
Landing page con:
- [ ] Imagen representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: debe contiene
- [ ] Input de búsqueda para encontrar recetas por nombre desde el Backend
- [ ] Área de listado de recetas. Deberá muestra su:
  - Imagen
  - Nombre
  - Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
- [ ] Botones/Opciones para filtrar por por tipo de dieta
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
- [ ] Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina.

__IMPORTANTE__: Dentro de la Ruta Principal se muestran las recetas traidas desde la API como así también las de la base de datos. 

__Ruta de detalle de receta__: 
- [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
- [ ] Resumen del plato
- [ ] Puntuación
- [ ] Nivel de "comida saludable"
- [ ] Paso a paso

__Ruta de creación de recetas__:
- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Resumen del plato
  - Puntuación
  - Nivel de "comida saludable"
  - Paso a paso
- [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
- [ ] Botón/Opción para crear una nueva receta

> El formulario de creación  esta validado con JavaScript y HTML. 

#### Base de datos

El modelo de la base de datos:

- [ ] Receta con las siguientes propiedades:
  - ID: *
  - Nombre *
  - Resumen del plato *
  - Puntuación
  - Nivel de "comida saludable"
  - Paso a paso
- [ ] Tipo de dieta con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades es de muchos a muchos ya que una receta puede ser parte de varios tipos de dieta en simultaneo y, a su vez, un tipo de dieta puede contener múltiples recetas distintas.

#### Backend

Servidor en Node/Express con las siguientes rutas:


- [ ] __GET /recipes?name="..."__:
  - Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
  - Si no existe ninguna receta mostrar un mensaje adecuado
- [ ] __GET /recipes/{idReceta}__:
  - Obtener el detalle de una receta en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de receta
  - Incluir los tipos de dieta asociados
- [ ] __GET /types__:
  - Obtener todos los tipos de dieta posibles

- [ ] __POST /recipe__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
  - Crea una receta en la base de datos


## Descarga e instalación:

Forkear el repositorio o descargarlo para tener una copia del mismo 

__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Actualmente las versiónes necesarias son:

 * __Node__: 12.18.3 o mayor
 * __NPM__: 6.14.16 o mayor

Para verificar que versión tienen instalada:

> node -v
>
> npm -v

## Inicio del Proyecto

El proyecto cuenta con dos carpetas: `api` y `client`. En estas carpetas estará el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. 

Adicionalmente será necesario que creen desde psql una base de datos llamada `food`

El contenido de `client` fue creado usando: Create React App.

Una vez abierto el proyecto es necesario iniciarlo: 

- Abrir en terminall integrado la carpeta `client`  y escribir `npm start`
- Abrir en terminall integrado la carpeta `api`  y escribir `npm start`

Todo listo