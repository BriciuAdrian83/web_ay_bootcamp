import express from "express"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {

    res.render('index.ejs', {
        title: 'All blog posts',
        current_year: new Date().getFullYear(),
    });
});

app.get("/create", (req, res) => {
    res.render("create.ejs", {
        title: "Create a Post",
        current_year: new Date().getFullYear(),
    })
});


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});