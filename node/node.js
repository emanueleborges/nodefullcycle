const express = require('express');
const mysql = require('mysql');
const app = express();

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
    host: 'db', // Nome do serviço no docker-compose
    user: 'root', // Usuário do banco de dados
    password: 'root', // Senha do banco de dados
    database: 'nodedb' // Nome do banco de dados
});

connection.connect(err => {
    if (err) {
      console.error('Erro ao conectar com o banco de dados:', err);
      //setTimeout(connectWithRetry, 5000); // Tentar novamente após 5 segundos
    } else {
      console.log('Conectado ao banco de dados.');
    }
});

// Rota principal
app.get('/', (req, res) => {
    // Adiciona um nome no banco de dados
    connection.query(`INSERT INTO people(name) VALUES('Emanuel Melo Borges')`, (err, result) => {
        if (err) throw err;

        // Busca os nomes cadastrados
        connection.query('SELECT name FROM people', (err, results) => {
            if (err) throw err;
            let html = '<h1>Full Cycle Rocks!</h1>';
            html += '<ul>';
            for (let row of results) {
                html += `<li>${row.name}</li>`;
            }
            html += '</ul>';
            res.send(html);
        });
    });
});

app.listen(3000, () => {
    console.log('Node app is running on port 3000');
});
