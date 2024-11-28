const express = require('express');
const cors = require('cors'); 
const mysql = require('mysql2');
const app = express();
const port = 3001;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'somepostfortesting@gmail.com',  
        pass: 'epevpytikuafhqhu'
    }
});

app.use(cors()); 

app.use(express.json());
app.get('/', (req, res) => {
    console.log('it`s work')
    res.send('Сервер працює. Вітаємо!');
});
app.use((err, req, res, next) => {
    console.error(err); 
    res.status(500).send('Виникла помилка на сервері');
});


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'testdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


app.post('/add-order', (req, res) => {
    const { name, email, phone, quantity } = req.body;

    if (!name || !email || !phone || !quantity) {
        return res.status(400).json({ error: 'Всі поля обов\'язкові для заповнення.' });
    }

    const query = 'INSERT INTO test (name, email, phone, quantity) VALUES (?, ?, ?, ?)';
    pool.query(query, [name, email, phone, quantity], (err, results) => {
        if (err) {
            console.error('Помилка при додаванні даних у базу:', err);
            return res.status(500).json({ error: 'Помилка сервера: не вдалося додати дані.' });
        }

        const mailOptions = {
            from: 'test.alina.vovkov@gmail.com',
            to: email,
            subject: 'Order Confirmation',
            text: `Hello ${name},\n\nYour order has been received.\nQuantity: ${quantity}\nThank you for your purchase!`,
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('error sending email:', err);
                return res.status(500).send('error sending email');
            }

            console.log('email sent', info.response);
            res.send('order added successfully and email sent!')
        })

    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Error starting server:', err); 
});

