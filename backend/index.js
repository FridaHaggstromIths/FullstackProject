const express = require('express'),
    path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();

//Öppna anslutning till DB
const db = new sqlite3.Database(path.resolve(__dirname, 'fruktkorgar.sqlite'));


//Endpoint för att hämta all data från databasen
app.get('/fruktkorg', (_req, res) => {
    db.all('SELECT * FROM fruktkorg', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Database error');
            return;
        }
        res.json(rows);
    });
});

//Nedför lägger ni in flera endpoints

//Middleware för att läsa statiska filer med express från mappen dist
app.use(express.static(path.join(path.resolve(), 'dist')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Redo på http://localhost:3000');
});


/* const express = require('express'),
  path = require('path')

const app = express()

app.get('/api', (_request, response) => {
  response.send({ hello: 'World' })
})

app.use(express.static(path.join(path.resolve(), 'dist')))

app.listen(3000, () => {
  console.log('Redo på http://localhost:3000/')
})
 */
