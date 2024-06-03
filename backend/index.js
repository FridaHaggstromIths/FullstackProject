const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser')

const app = express()

// Öppna anslutning till DB
const db = new sqlite3.Database(path.resolve(__dirname, 'fruktkorgar.sqlite'))

// Middleware för att läsa statiska filer med express från mappen dist
app.use(express.static(path.join(path.resolve(), 'dist')))
app.use(bodyParser.json())

// Hämta alla fruktkorgar
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

// Hämta specifik fruktkorg
app.get('/productpage/:id', (req, res) => {
    const id = req.params.id;
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

// Lägg till produkt i varukorg
app.post('/cart/:id', (req, res) => {
    const { userId, productId, quantity } = req.body

    // Kontrollera att alla nödvändiga värden finns
    if (!productId || !quantity) {
        return res.status(400).send('obligatoriska värden saknas')
    }

    // Sätt userId till NULL om det inte finns
    const userIdValue = userId ? userId : null

    db.run('INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)', [userIdValue, productId, quantity], function(err) {
        if (err) {
            console.error(err.message)
            res.status(500).send('Database error')
            return
        }
        res.status(201).send({ cartItemId: this.lastID })
    })
})



// Hämta alla produkter i varukorg
app.get('/cart/:id', (_req, res) => {
    db.all('SELECT * FROM cart', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Database error');
            return;
        }
        console.log('Fetched cart items:', rows);
        res.json(rows);
    });
});


// Ta bort produkt från varukorg
app.delete('/cart/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM cart WHERE id = ?', [id], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Database error');
            return;
        }
        res.status(200).send({ deleted: this.changes });
    });
});


// Hämta alla användare
app.get('/Login', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Database error')
            return
        }
        res.json(rows)
    })
})

// Lägg till ny användare
app.post('/Login', (req, res) => {
    const { firstName, lastName, email, password } = req.body
    db.run('INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)', [firstName, lastName, email, password], (err) => {
        if (err) {
            return res.status(500).send('Error inserting email into database')
        }
        res.status(201).send('User added successfully')
    })
})

//Kolla om konto finns inför inloggning
app.post('/checkAccount', (req, res) => {
    const {email, password} = req.body
    db.get('SELECT email, password FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
        if (err) {
            console.error(err.message)
            return res.status(500).send('Big fail')
        }
        if (!row) {// om email inte finns eller lösen inte finns
            return res.status(401).send('Ogiltig email eller lösenord')
        }
        res.status(200).send('Login lyckades')
    })
})

// Hantera nyhetsbrevsprenumeration utan att lägga till nya användare
app.post('/subscribe', (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.status(400).send('Ingen email inlagd')
    }

    // Kontrollera om användaren redan finns
    db.get('SELECT id, newsletter_sub FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            console.error(err.message)
            return res.status(500).send('Du får redan vårt nyhetsbrev!')
        }

        if (row) {
            // Användaren finns redan
            if (row.newsletter_sub === 1) {
                return res.status(400).send('Du får redan vårt nyhetsbrev!')
            } else {
                // Uppdatera prenumerationsstatus i users tabellen
                db.run('UPDATE users SET newsletter_sub = 1 WHERE id = ?', [row.id], (err) => {
                    if (err) {
                        console.error(err.message);
                        return res.status(500).send('Du får redan vårt nyhetsbrev!')
                    }
                    // Lägg till i newsletter tabellen
                    db.run('INSERT INTO newsletter (newsEmail, user_id) VALUES (?, ?)', [email, row.id], (err) => {
                        if (err) {
                            console.error(err.message);
                            return res.status(500).send('Du får redan vårt nyhetsbrev!')
                        }
                        return res.status(200).send('Prenumeration uppdaterad och lagd till i nyhetsbrev')
                    })
                })
            }
        } else {
            // Användaren finns inte, lägg till i newsletter tabellen utan user_id
            db.run('INSERT INTO newsletter (newsEmail) VALUES (?)', [email], (err) => {
                if (err) {
                    console.error(err.message)
                    return res.status(500).send('Du får redan vårt nyhetsbrev!')
                }
                return res.status(200).send('Prenumeration lagd till i nyhetsbrev')
            })
        }
    })
})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Redo på http://localhost:${PORT}`)
})
