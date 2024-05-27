const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')

const app = express()

// Öppna anslutning till DB
const db = new sqlite3.Database(path.resolve(__dirname, 'fruktkorgar.sqlite'))


app.get('/fruktkorg', (_req, res) => {
    db.all('SELECT * FROM fruktkorg', (err, rows) => {
        if (err) {
            console.error(err.message)
            res.status(500).send('Database error')
            return
        }
        res.json(rows)
    })
})


app.get('/productpage/:id', (req, res) => {
    const id = req.params.id
    db.get('SELECT * FROM fruktkorg WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error(err.message)
            res.status(500).send('Database error')
            return
        }
        if (!row) {
            res.status(404).send('Product not found')
            return
        }
        res.json(row)
    })
})


app.get('/users', (_req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error(err.message)
            res.status(500).send('Database error')
            return
        }
        res.json(rows)
    })
})
app.use(bodyParser.json())
app.post('/users', (_req, res) => {
    db.run('INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)',[firstName, lastName, email, password], (err, rows) => {
        if (err) {
            return res.status(500).send('Error inserting email into database')
          }
        res.json(rows) 
    })
})
/*app.get('/newsletter', (req, res) => {
    db.all('SELECT * FROM newsletter', (err, rows) => {
        if (err) {
            console.error(err.message)
            res.status(500).send('Database error')
            return
        }
        res.json(rows)
    })
})
*/
app.post('/', (req, res) => {
    const { email } = req.body
    if (!email) {
        return res.status(400).send('Ingen email inlagd' )  
      }
    db.run('INSERT INTO newsletter (newsEmail) VALUES (?)', [email], (err, rows) => {
        if (err) {
            return res.status(500).send('Error inserting email into database')
          }
        res.json(rows)
    })
})




// Middleware för att läsa statiska filer med express från mappen dist
app.use(express.static(path.join(path.resolve(), 'dist')))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Redo på http://localhost:3000')
})




/* const express = require('express'),
    path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();

const db = new sqlite3.Database(path.resolve(__dirname, 'fruktkorgar.sqlite'));


app.get('/fruktkorg', (_req, res) => {
    db.all('SELECT * FROM fruktkorg', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Database error')
            return
        }
        res.json(rows)
    })
})

app.get('/fruktkorg/:id', (req, res) => {
  const id = req.params.id
  db.get('SELECT * FROM fruktkorg WHERE id = ?', [id], (err, row) => {
      if (err) {
          console.error(err.message)
          res.status(500).send('Database error')
          return
      }
      res.json(row)
  })
})


app.use(express.static(path.join(path.resolve(), 'dist')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Redo på http://localhost:3000');
});
 */
