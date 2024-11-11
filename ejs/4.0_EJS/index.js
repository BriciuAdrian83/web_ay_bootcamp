import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;



app.get('/', (req, res) => {
    const day_of_week_number = today.getDay();
    let day_type, advice;
    if (day_of_week_number === 0 || day_of_week_number === 6) {
        day_type = "it's the weekend";
        advice = "it's time to have fun";
    } else {
        day_type = "it's a weekday";
        advice = "it's time to work hard";
    }

    res.render(__dirname + '/views/index.ejs', 
        {
            day_type: day_type,
            advice: advice,
        }
    );
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});