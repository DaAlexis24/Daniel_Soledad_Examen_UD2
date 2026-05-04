import express from 'express';
import debug from 'debug';

const log = debug('API-Products-V1:server');
log('Loading API server');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hola, soy primera versión!');
});

app.listen(port, () => {
    log(`Example app listening on port ${port}`);
});
