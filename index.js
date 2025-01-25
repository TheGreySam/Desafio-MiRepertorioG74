const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const { home, leerCanciones, insertarCancion, BorrarCancion, editarCancion } = require('./controller/component');

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/', home);
app.get('/canciones', leerCanciones);
app.post('/canciones', insertarCancion);
app.delete('/canciones/:id', BorrarCancion);
app.put('/canciones/:id', editarCancion);

app.listen(port, console.log(`Servidor corriendo en ${port}`));