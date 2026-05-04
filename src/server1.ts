import express from 'express';
import debug from 'debug';
// Importamos la interfaz y la variable que guarda los mocks para realizar el CRUD
import { Product, mockProducts } from './data/mock.ts';
import morgan from 'morgan';
import cors from 'cors';

// Definimos el debug para la consola
const log = debug('API-Products-V1:server');

// Iniciamos una nueva app con Express
const app = express();
// Usamos este método para ocultar en las cabeceras de las response que nuestro proyecto ha sido creado con Express, maximizando la seguridad
app.disable('x-powered-by');
log('Express Products App created');
// Usamos morgan para definir que estamos en modo desarrollo
app.use(morgan('dev'));
// Cors para permitir el ingreso de las peticiones HTTP desde cualquier lugar, en nuestro caso usaremos Postman
app.use(cors({ origin: '*' }));
// Express.json nos sirve para parsear las solicitudes entrantes a formato JSON en el body de la petición HTTP, así lo podremos usar en nuestras rutas.
app.use(express.json())

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hola, soy primera versión!');
});

app.listen(port, () => {
    log(`Example app listening on port ${port}`);
});
