import express from "express";
import multer from "multer";
import pdf_parse from "pdf-parse";

const app = express();
const PORT = 3000;

const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory as a Buffer
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  });


app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

const utilities = [];

app.get("/", (req, res) => {
    res.render("index.ejs", {
        title: 'All utility invoices',
        currentYear: new Date().getFullYear(),
    });
});

app.get("/upload_reciept", (req, res) => {
    res.render("upload_reciept.ejs", {
        title: 'All utility invoices',
        currentYear: new Date().getFullYear(),
    });
});

app.post("/reciept", upload.single("reciept"), async (req, res) => {
    try {
      const file = req.file;
  
      // Check if a file was uploaded
      if (!file) {
        return res.status(400).send("No file uploaded. Please upload a PDF file.");
      }
  
      // Check if the uploaded file is a PDF
      if (file.mimetype !== "application/pdf") {
        return res.status(400).send("Invalid file type. Please upload a valid PDF.");
      }
  
      // Parse PDF content
      const pdfData = await pdf_parse(file.buffer);
      console.log("PDF Content:", pdfData.text); // Log PDF text content to the console
  
      // Store or process the parsed content as needed
      utilities.push({ content: pdfData.text });
  
      console.log(utilities);
    //   // Render confirmation view
    //   res.render("reciept-info-confirmation.ejs", {
    //     title: "Receipt Uploaded Successfully",
    //     currentYear: new Date().getFullYear(),
    //     pdfContent: pdfData.text,
    //   });
    } catch (error) {
      console.error("Error processing the file:", error.message);
      res.status(500).send("Error processing the uploaded file.");
    }
  });




// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });