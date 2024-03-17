const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {config}  = require('dotenv');

const bookRoutes = require('./routes/book.routes');
//NOTA : se esta trallendo en este caso el valor config con corchetes ya que se esta destructurando 
//que quieres decir,es que ne valor a todo lo que importamos de modulo dotenv
//en si no necesitamos todo , solo lo que engloba a 'config' , por ellos se le pone en llaves
//Esos valores que trae , son delo archivo .env,ya que este modulo por defecto ovtiene el archivo .env
config();
//Lo que hace el config() , es almacenar o remplazar lo valores que tenia por defecto 
//por el valor que tendra el puerto de process

//Usamos express para los middlewares
const app = express();
app.use(bodyParser.json()) //Parseador de bodies

//Conectaremos la base de datos:

mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGODB_NAME})
const db = mongoose.connection;

app.use('/books', bookRoutes);

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Servidor iniciando en el puerto ${port}`);
});
