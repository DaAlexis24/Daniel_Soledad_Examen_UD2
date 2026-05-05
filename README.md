# Examen UD2 IFCD0210 - Daniel Soledad

El objetivo de este examen es crear un API REST de productos, utilizando TS + Node.js + Express.js. Los datos los vamos a guardar en un mock, que será un archivo aparte.

## Versión 1

1. Configuración Inicial:
   1. Instalamos Node con `npm init` y realizamos la configuración de nuestro **package.json**
   2. Instalamos TypeScript usando el comando `npm i -D typescript`
      1. Generamos el fichero **tsconfig.json** usando el comando `npx tsc--init`
         1. Añadimos las siguientes líneas para la configuración de TS para nuestro proyecto:
            1. lib: "esnext", se usa para especificar que librerías de tipos se incluyen durante la compilación.
            2. types: node, se usa para restringir los paquetes de los tipos que se incluyen de manera global, en este caso serán los de Node.
            3. noImplicitOverride: true, esto nos ayudará a evitar errores a la hora de realizar herencia entre clases padre e hijo, al solicitar la palabra reservada **override** de manera obligatoria.
            4. allowImportingTsExtensions:true, esto permite realizar importaciones de módulos escritos en TS, sin necesidad de compilarlos en un archivo JS, esto solo funciona teniendo las opciones "noEmit" y "erasableSyntaxOnly" activadas.
            5. Incluiremos la carpeta **src** para permitir la ejecución del archivo principal de nuestro proyecto.
   3. Instalamos Express y sus tipos.
   4. Instalaremos Prettier para el formateo del código.
   5. Instalaremos Eslint para corregir y analizar nuestro código, asi evitamos las malas prácticas.
   6. Instalaremos debug y sus tipos para tener mensajes más detallados en la consola de nuestro servidor.
   7. Instalaremos cross-env para interactuar con un archivo .env y así definir variables en nuestros scripts.
   8. Instalaremos cors y sus tipos para mantener la seguridad de nuestra API frente a solicitudes externas.
   9. Instalaremos morgan para controlar los logs en nuestra aplicación, es como un middleware pero hecho por terceros.
   10. Crearemos el archivo .gitignore para controlar los archivos que lanzaremos a nuestro repositorio GitHub
   11. Crearemos el editorconfig para el estilo de codificación.
   12. Crearemos la carpeta src para guardar el archivo server1.ts que guardará toda la información de la API
   13. Crearemos nuestro repositorio de Git para subir el primer commit de nuestro proyecto.

### Revisiones del examen

1. Solo usa las dependencias realmente necesarias que necesita tu proyecto, de esta manera cuando te entrevisten para que defiendas tu código evitarás preguntas incómodas. Se limpio y conciso.
2. Cuando clones otro repositorio, fíjate bien si las versiones de los paquetes tienen una **virgulilla** o un **caret** delante, esto puede causarte problemas a la hora de instalar las dependencias generando que el proyecto no funcione correctamente.
3. Realiza los commits necesarios, sin olvidarte del Initial Commit. Por ejemplo cada vez que añades un nuevo endpoint.
4. La capa básica de una API son los endpoints y el manejador de errores
