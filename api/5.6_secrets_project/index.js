// HINTS:
// 1. Import express and axios
import express from "express"
import axios from "axios"

// 2. Create an express app and set the port number.
const app = express();
const PORT = 3000;



// 3. Use the public folder for static files.
app.use(express.static("public"));

// 4. When the user goes to the home page it should render the index.ejs file.
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.get("/", async (req, res) => {
    try {
        const response = await axios.get('https://secrets-api.appbrewery.com/random');
        const body = response.data;

        res.render("index.ejs", body);
        
    } catch (error) {
        console.log(error.response.data);
    }
});


// 6. Listen on your predefined port and start the server.
app.listen(PORT, (error) => {
    if (!error) { 
        console.log("Server is succcesfuly running and app is listening on port " + PORT);
    } else {
        console.log("Error occured, server can't start", error);
    }
});