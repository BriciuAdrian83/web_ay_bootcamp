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

app.get("/about", (req, res) => {

    res.render('about.ejs', {
        title: 'About',
        currentYear: new Date().getFullYear(),
    });
});

app.get("/contact", (req, res) => {

    res.render('contact.ejs', {
        title: 'Contact',
        currentYear: new Date().getFullYear(),
    });
});

app.get("/create", (req, res) => {
    res.render("form.ejs", {
        title: "Create a Post",
        currentYear: new Date().getFullYear(),
        errors: {},
        formData: { blogTitle: '', blogContent: '' },
        index: undefined
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
        return res.render("form.ejs", {
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
    const { index } = req.params;
    const post = posts[index];

    if (!post) {
        return res.status(404).render("404.ejs", {
            title: "Post Not Found",
            index,
        });
    }

    const blogTitle = post.blogTitle;
    let blogContent = post.blogContent;
    // replace spaces after new line and before - with html space char
    blogContent = blogContent.replace(/\n( *)-/g, (match, spaces) => {
        const nbsp = '&nbsp;&nbsp;'.repeat(spaces.length); // Replace spaces with &nbsp;
        return `\n${nbsp}-`; // Preserve the newline and bullet.
    });
    // Replace newlines with <p></p> tags.
    blogContent = blogContent
        .split('\n')
        .map(line => `<p>${line}</p>`)
        .join('');

    res.render("read.ejs", {
        title: "Read a Post",
        currentYear: new Date().getFullYear(),
        blogTitle: blogTitle,
        blogContent: blogContent,
        index,
    });

});

app.get("/edit/:index", (req, res) => {
    const { index } = req.params;
    const post = posts[index];

    if (!post) {
        return res.status(404).render("404.ejs", {
            title: "Post Not Found",
            currentYear: new Date().getFullYear(),
        });
    }

    res.render("form.ejs", {
        title: 'Edit Post',
        currentYear: new Date().getFullYear(),
        errors: {},
        formData: { blogTitle: post.blogTitle, blogContent: post.blogContent },
        index: index,
    });
});


app.post("/update-post/:index", (req, res) => {
    const { index } = req.params;
    const post = posts[index];

    if (!post) {
        return res.status(404).render("404.ejs", {
            title: "Post Not Found",
            currentYear: new Date().getFullYear(),
        });
    }

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
            title: "Edit Post",
            currentYear: new Date().getFullYear(),
            errors,
            formData: { blogTitle, blogContent },
            index // Include the index to keep the form action valid
        });
    }

    // Update the post in the array
    posts[index] = { blogTitle, blogContent };
    res.redirect(`/read/${index}`);
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

app.post("/delete-post/:index", (req, res) => {
    const { index } = req.params;

    if (isNaN(index) || index < 0 || index >= posts.length) {
        return res.status(404).render("404.ejs", {
            title: "Post Not Found",
            currentYear: new Date().getFullYear(),
        });
    }

    const post = posts[index];

    if (!post) {
        return res.status(404).render("404.ejs", {
            title: "Post Not Found",
            currentYear: new Date().getFullYear(),
        });
    }

    posts.splice(index, 1);
    
    res.redirect("/");
});