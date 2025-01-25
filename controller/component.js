const fs = require('fs');
const rute = require('path');

const JSON_FILE = rute.join(__dirname, '../repertorio.json');
const main = rute.join(__dirname, '../public/index.html');

const home = (req, res) => {
    console.log(main);
    res.status(200).sendFile(main);
};

const leerCanciones = (req, res) => {
    const articles = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
    res.status(200).json(articles);
};

const insertarCancion = (req, res) => {
    const article = req.body;
    const articles = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
    articles.push(article);
    fs.writeFileSync(JSON_FILE, JSON.stringify(articles, null, 2));
    res.status(201).send(`Canción agregada, id: ${article.id}, titulo: ${article.title}, artista: ${article.artist}`);
};

const BorrarCancion = (req, res) => {
    const { id } = req.params;
    const article = req.body;
    const articles = JSON.parse(fs.readFileSync(JSON_FILE));
    const index = articles.findIndex((article) => article.id === id);

    if (index === -1) {
        res.status(404).send(`Canción id: ${id} no encontrada`);
        return;
    }

    articles.splice(index, 1);
    fs.writeFileSync(JSON_FILE, JSON.stringify(articles));
    res.status(200).send(`Canción id: ${article.id}, ${article.title}, artista: ${article.artist} eliminada`);
};

const editarCancion = (req, res) => {
    const { id } = req.params;
    const article = req.body;
    const articles = JSON.parse(fs.readFileSync(JSON_FILE));

    const index = articles.findIndex((article) => article.id === id);

    if (index === -1) {
        res.status(404).send(`Canción id: ${id} no encontrada`);
        return;
    }
    articles[index] = article;
    fs.writeFileSync(JSON_FILE, JSON.stringify(articles));
    res.status(200).send(`Canción id: ${article.id}, ${article.title}, artista: ${article.artist} editada`);
};

module.exports = {
    home,
    leerCanciones,
    insertarCancion,
    BorrarCancion,
    editarCancion
};