import express from 'express';
import debug from 'debug';
// Importamos la interfaz y la variable que guarda los mocks para realizar el CRUD
import { mockProducts } from './data/mock.ts';
import type { Product } from './data/mock.ts';
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
app.use(express.json());

// Creamos las funciones que nos permiten realizar el CRUD de nuestra API
// Leemos todos los productos, usando la interfaz para tipar la respuestas y el mock de los productos enteros
const readAllProducts = (): Product[] => {
    return mockProducts;
};

// Leemos el product según su ID
const readProductById = (id: string): Product => {
    // Acá buscamos obtener el id del producto, comparándolo con el que vamos a recibir como parámetro
    const productIndex = mockProducts.find((product) => product.id === id);
    if (!productIndex) {
        // Si no encontramos dicho id, vamos a generar un mensaje de log en nuestra consola y lanzaremos un error
        log(`Product with id ${id} don't exist into mock`);
        throw new Error(`Product with id ${id} don't exist into mocK`);
    }
    // Devolvemos el index del producto para poder generar una respuesta json
    return productIndex;
};

// Creo un tipo para la entrada de los datos que nos da Producto, de esta manera lo controlo mejor
type CreateProduct = Omit<Product, 'id'>;

// Creamos un nuevo producto
const createProduct = async (productData: CreateProduct): Promise<Product> => {
    // tipamos la salida como un producto normal, ya que esta va a generar el id de manera aleatoria usando crypto.
    const newProduct: Product = {
        ...productData,
        id: crypto.randomUUID(),
    };
    // Acá usamos el método de los arrays push para lanzar el nuevo Producto dentro de nuestro mock
    await mockProducts.push(newProduct);
    return newProduct;
};

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hola, soy primera versión!');
});

// Realizamos la ruta de nuestra función readAllProducts
app.get('/api/products', (req, res) => {
    log('Reading all products...');
    const products = readAllProducts();
    res.json(products);
    return;
});

// Ruta para obtener un producto según su ID
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    log(`Reading product with id ${id} ...`);
    const product = readProductById(id);
    res.json(product);
    return;
});

// Ruta para crear un producto
app.post('/api/products', async (req, res, next) => {
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

app.listen(port, () => {
    log(`Example app listening on port ${port}`);
});
