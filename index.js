const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');

const app = express();

app.use(expressMongoDb('mongodb://localhost/loja'));
app.use(bodyParser.json());

//Inserir
app.post('/skate', (req, res) => {
    req.db.collection('Modelos').insert(req.body, (err) => {
        if(err){
            res.status(500).send('Não foi possível adicionar este produto!');
            return;
        }
        res.send(req.body);
    });
});

//Procurar
app.get('/skate', (req, res) => {
    req.db.collection('Modelos').find().toArray((err, data) => {
        if (err){
            res.status(500).send('Erro ao acessar o banco de dados!');
            return;
        }
        res.send(data);
    });
});

//Atualizar 

app.get

app.listen(3000);