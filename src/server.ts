import express from 'express';
// Importaremos el mock de json
import PRODUCTS from './data/mock.json' with { type: 'json' };
import debug from 'debug';
// import { mockProducts } from './data/mock.ts';
// import type { Product } from './data/mock.ts';
import morgan from 'morgan';
import cors from 'cors';

// Declaramos la Interfaz
export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

// Definimos el debug para la consola
const log = debug('API-Products-V1:server');

// Iniciamos una nueva app con Express
const app = express();

// Usamos este método para ocultar en las cabeceras de las response que nuestro proyecto ha sido creado con Express, maximizando la seguridad
app.disable('x-powered-by');
log('Express Products App created');

// Usamos morgan para definir que estamos en modo desarrollo
app.use(morgan('dev'));

// Cors para permitir el ingreso de las peticiones HTTP desde los navegadores que estén en un origen distinto. Postman ya usa Cors, así que no es necesario, solo es útil cuando se creará el frontend.
app.use(cors({ origin: '*' }));

// Express.json nos sirve para parsear las solicitudes entrantes a formato JSON en el body de la petición HTTP, así lo podremos usar en nuestras rutas. IMPORTANTE
app.use(express.json());

const port = process.env.PORT || 3000;

// Estándar de los APIS
app.use('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

const products = PRODUCTS as Product[];

app.get('/', (req, res) => {
    res.send('Hola, soy primera versión!');
});

// GET All Products. Obtenemos toda la información de products y lo devolvemos en formato JSON
app.get('/api/products', (req, res) => {
    log('Reading all products...');
    res.json(products);
    return;
});

// Ruta para obtener un producto según su ID. Accedemos al array products y usamos el método find para hallar el id del producto comparándolo con el id que recibimos como parámetro
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    log(`Reading product with id ${id} ...`);
    const product = products.find((c) => c.id === id);
    res.json(product);
    return;
});

// Ruta para crear un producto
app.post('/api/products', async (req, res, next) => {
    const newProduct: Product = {
        id: crypto.randomUUID(),
        name: 
    };

    try {
        log('Creating a new product');
        const data = req.body;
        const result = await createProduct(data);
        res.statusCode = 201;
        res.json(result);
        return;
    } catch (error) {
        log('Error while was creating a new product');
        next(error);
    }
});

// Ruta para actualizar un producto
app.patch('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await updateProduct(id, data);
    log(`Updating product with id ${id}`);
    res.json(result);
    return;
});

// Ruta para eliminar un producto
app.delete('api/products/:id', (req, res) => {
    const { id } = req.params;
    const result = deleteProductById(id);
    res.end();
    return result;
});

app.listen(port, () => {
    log(`Example app listening on port ${port}`);
});
