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
        posts,
    });
});

app.get("/create", (req, res) => {
    res.render("create.ejs", {
        title: "Create a Post",
        currentYear: new Date().getFullYear(),
        errors: {},
        formData: { blogTitle: '', blogContent: '' },
    })
});


app.post("/save-post", (req, res) => {
    const { "blog-title": blogTitle, "blog-content": blogContent } = req.body;
    const errors = {};

    if (!blogTitle || blogTitle.trim() === "") {
        errors.blogTitle = "Title is required.";
    }
    if (!blogContent || blogContent.trim() === "") {
        errors.blogContent = "Content is required.";
    }

    if (Object.keys(errors).length > 0) {
        return res.render("create.ejs", {
            title: "Create a Post",
            currentYear: new Date().getFullYear(),
            errors,
            formData: { blogTitle, blogContent }
        });
    }

    posts.push({ blogTitle: blogTitle, blogContent: blogContent });
    res.redirect("/");
});


app.get("/read/:index", (req, res) => {
    const {index} = req.params;
    const post = posts[index];
    
    if (!post) {
        return res.status(404).render("404.ejs", {
            title: "Post Not Found",
            currentYear: new Date().getFullYear(),
        });
    }

    const blogTitle = post.blogTitle;
    const blogContent = post.blogContent
        .replace(/\n/g, '<p>') // Convert newlines to <br>
        .replace(/- /gm, (match) => {
            // Add indentation before the bullet point
            return '&nbsp;&nbsp;&nbsp;&nbsp;' + match; // You can adjust the number of &nbsp; here
        });
        // .replace(/^( *)(- )/gm, (match, spaces, bullet) => {
        //     // Count the number of spaces to determine the nesting level
        //     const indentationLevel = spaces.length / 2; // Every 2 spaces represent one level of indentation
        //     const indent = '&nbsp;'.repeat(indentationLevel * 4); // 4 spaces per indentation level
        //     return indent + bullet + match.trim(); // Prepend spaces and keep the bullet point
        // });
    
    res.render("read.ejs", {
        title: "Read a Post",
        currentYear: new Date().getFullYear(),
        blogTitle: blogTitle,
        blogContent: blogContent,
    });


});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});