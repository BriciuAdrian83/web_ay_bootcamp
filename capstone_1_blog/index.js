import express from "express"

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const posts = [];

app.get("/", (req, res) => {

    res.render('index.ejs', {
        title: 'All blog posts',
        currentYear: new Date().getFullYear(),
        // posts,
    });
});

app.get("/create", (req, res) => {
    res.render("create.ejs", {
        title: "Create a Post",
        currentYear: new Date().getFullYear(),
        errors: {},
        formData: { blogTitle: '', blogContent: ''},
    })
});


app.post("/save-post", (req, res) => {
    const {"blog-title" : blogTitle, "blog-content": blogContent} = req.body;
    const errors = {};

    if (!blogTitle || blogTitle.trim() === "") {
        errors.blogTitle = "Title is required.";
    }
    if (!blogContent || blogContent.trim() === "") {
        errors.blogContent = "Content is required.";
    }

    if (Object.keys(errors). length > 0) {
        return res.render("create.ejs", {
            title: "Create a Post",
            currentYear: new Date().getFullYear(),
            errors,
            formData: { blogTitle, blogContent }
        });
    }

    posts.push({ title: blogTitle, content: blogContent });
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});