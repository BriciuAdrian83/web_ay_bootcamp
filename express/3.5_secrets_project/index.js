//To see how the final website should work, run 'node solution.js'.
//Make sure you have installed all the dependencies with 'npm i'.
//The password is ILoveProgramming
import express from 'express';
// import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var user_is_authorized = false;

app.use(express.urlencoded({ extended: true }));

function password_check(req, res, next) {
    console.log(req.body.password);
    if (req.body.password === 'ILoveProgramming') {
        user_is_authorized = true;
    }
    next();
}

app.use(password_check);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/check', (req, res) => {
    if (user_is_authorized) {
        res.sendFile(__dirname + '/public/secret.html');
    } else {
        res.redirect('/');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});