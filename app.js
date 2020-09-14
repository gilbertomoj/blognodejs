//Carregando as constantes necessarias
    const express = require('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    const mongose = require('mongoose');
    const app = express();
    const admin = require('./routes/admin');
    const path = require('path');
//Configurações 
    //Body Parser 
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine','handlebars')
    
    //Mongoose
    mongose.Promise = global.Promise;
    mongose.connect('mongodb://localhost/blogapp').then(()=>{
        console.log('Conexão realizada')
    }).catch((erro)=>{
        console.log('Ocorreu um erro')
    })
    

    //Public
        app.use(express.static(path.join(__dirname,"public")))
        
        app.use((req , res , next)=>{
            console.log('Ola ;midleware teste;')
            next();
        })
//Rotas 

    app.use('/admin', admin)

//Notas




//Outros
const PORT = 8081
app.listen(PORT,()=>{
    console.log('Servidor rodando na porta '+PORT);
})