import { ObjectId } from '../../../AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bson';

const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectID;

const app = express();


app.use(expressMongoDb('mongodb://sk8:sk8123@165.227.221.155/sk8'));
//app.use(expressMongoDb('mongodb://localhost/sk8'));
app.use(bodyParser.json());
app.use(cors());

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
app.put('/modelo:', (req,res) => {
    let query = {
        _id:ObjectId(req.params.id)
    };

    let skate = {
        modelo: req.body.modelo,
        shape: req.body.shape,
        tamanho: req.body.tamanho,
    };
    req.db.collection('modelo').updateOne(query, skate, (err, data) => {
        if(err){ 
            res.status(500).send();
            return;
        }
       res.send(data);
    });

});

//Deletar

app.delete('/skate/:id', (req, res) => {
    let query = {
        _id: ObjectId(req.params.id)
    };

    req.db.collection('modelo').updateOne(query, skate, (err, data) => {
        if(err){ 
            res.status(500).send();
            return;
        }
       res.send(data);
    });
    
});

//app.listen(3000);  /portal local 
app.listen(process.env.PORT || 3000, () => console.log('Aplicação Iniciada')); //acesso a porta da Heroku