const express = require('express');
const sqlite = require('sqlite3');
const bodyParser = require('body-parser');
const cors = require('cors');


const port = 5000;
const app = express()

// Middleware para analizar cuerpos de solicitudes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())





// Crear la base de datos SQLite (si no existe)
const db = new sqlite.Database('./users.db', (err) => {
    if (err) {
    console.error('Error al abrir la base de datos', err.message);
    } else {
    console.log('Conectado a la base de datos SQLite');
    }
});
// Crear la tabla si no existe (usaremos email y password)
db.run(`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
    )
`, (err) => {
    if (err) {
    console.error('Error al crear la tabla', err.message);
    }
});


//guarda en base de datos los datos de login
app.post('/', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    // Validación básica
    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
    }

    // Insertar los datos en la base de datos
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.run(sql, [email, password], function (err) {
        if (err) {
        return res.status(500).json({ message: 'Error al guardar los datos en la base de datos.' });
        }
    });
    // Enviar respuesta exitosa
    res.status(201).json({ message: 'Usuario registrado con éxito!', userId: this.lastID });
});

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.all(sql, [], (err, rows) => {
        if (err) {
        return res.status(500).json({ message: 'Error al obtener los usuarios.' });
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
