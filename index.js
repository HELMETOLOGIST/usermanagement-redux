const express = require('express');
const path = require('path');

require('dotenv').config();

const apiKey = process.env.API_KEY;

console.log('API Key:', apiKey);

const registerRoute = require('./routes/auth/register');
const meRoute = require('./routes/auth/me');
const loginRoute = require('./routes/auth/login');

const app = express();

app.use(express.json());

app.use(registerRoute);
app.use(meRoute);
app.use(loginRoute);

app.use(express.static('client/build'));
app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));