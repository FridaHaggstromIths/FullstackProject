const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();

// Öppna anslutning till DB
const db = new sqlite3.Database(path.resolve(__dirname, 'fruktkorgar.sqlite'));

// Middleware för att läsa statiska filer med express från mappen dist
app.use(express.static(path.join(path.resolve(), 'dist')));
app.use(bodyParser.json());

// Hämta alla fruktkorgar
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

// Hämta specifik fruktkorg
app.get('/productpage/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM fruktkorg WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Database error');
            return;
        }
        if (!row) {
            res.status(404).send('Product not found');
            return;
        }
        res.json(row);
    });
});

// Hämta alla användare
app.get('/Login', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Database error');
            return;
        }
        res.json(rows);
    });
});

// Lägg till ny användare
app.post('/Login', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    db.run('INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)', [firstName, lastName, email, password], (err) => {
        if (err) {
            return res.status(500).send('Error inserting email into database');
        }
        res.status(201).send('User added successfully');
    });
});


// Hantera nyhetsbrevsprenumeration utan att lägga till nya användare
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send('Ingen email inlagd');
    }

    // Kontrollera om användaren redan finns
    db.get('SELECT id, newsletter_sub FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Du får redan vårt nyhetsbrev!1');
        }

        if (row) {
            // Användaren finns redan
            if (row.newsletter_sub === 1) {
                return res.status(400).send('Du får redan vårt nyhetsbrev!2');
            } else {
                // Uppdatera prenumerationsstatus i users tabellen
                db.run('UPDATE users SET newsletter_sub = 1 WHERE id = ?', [row.id], (err) => {
                    if (err) {
                        console.error(err.message);
                        return res.status(500).send('Du får redan vårt nyhetsbrev!3');
                    }
                    // Lägg till i newsletter tabellen
                    db.run('INSERT INTO newsletter (newsEmail, user_id) VALUES (?, ?)', [email, row.id], (err) => {
                        if (err) {
                            console.error(err.message);
                            return res.status(500).send('Du får redan vårt nyhetsbrev!4');
                        }
                        return res.status(200).send('Prenumeration uppdaterad och lagd till i nyhetsbrev');
                    });
                });
            }
        } else {
            // Användaren finns inte, lägg till i newsletter tabellen utan user_id
            db.run('INSERT INTO newsletter (newsEmail) VALUES (?)', [email], (err) => {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Du får redan vårt nyhetsbrev!5');
                }
                return res.status(200).send('Prenumeration lagd till i nyhetsbrev');
            });
        }
    });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Redo på http://localhost:${PORT}`);
});

//Fridas slaskkod för nyhetsbrev, Beas originalkod finns under detta.
/*
// Hantera nyhetsbrevsprenumeration utan att lägga till nya användare
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send('Ingen email inlagd');
    }

    // Kontrollera om användaren redan finns
    db.get('SELECT id, newsletter_sub FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Database error');
        }

        if (row) {
            // Användaren finns redan, uppdatera prenumerationsstatus
            if (row.newsletter_sub === 1) {
                return res.status(400).send('Du får redan vårt nyhetsbrev!');
            } else {
                db.run('UPDATE users SET newsletter_sub = 1 WHERE id = ?', [row.id], (err) => {
                    if (err) {
                        console.error(err.message);
                        return res.status(500).send('Database error');
                    }
                    return res.status(200).send('Prenumeration uppdaterad');
                });
            }
        } else {
            // Användaren finns inte, returnera ett felmeddelande
            return res.status(404).send('Användaren finns inte');
        }

    });
}); */






/* const express = require('express')
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


app.get('/Login', (req, res) => {
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
app.post('/Login', (req, res) => {
    const { firstName, lastName, email, password } = req.body
    db.run('INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)', [firstName, lastName, email, password], (err, rows) => {
        if (err) {
            return res.status(500).send('Error inserting email into database')
          }
        res.json(rows)
    })
})

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
 */



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
