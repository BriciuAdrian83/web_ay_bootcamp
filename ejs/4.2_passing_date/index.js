import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('index.ejs');
});

app.post("/submit", (req, res) => {
  const first_name = req.body['fName'];
  const last_name = req.body['lName'];
  const concatenated_fullname = first_name + last_name;
  const nr_of_letters = concatenated_fullname.length;
  res.render('index.ejs',
    {
      first_name: first_name,
      last_name: last_name,
      nr_of_letters: nr_of_letters,
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
