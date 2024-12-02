import express from "express"

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

const utilities = [];

app.get("/", (req, res) => {
    res.render("index.ejs", {
        title: 'All utility invoices',
        currentYear: new Date().getFullYear(),
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });