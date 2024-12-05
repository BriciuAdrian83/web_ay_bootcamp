import express from "express";
import multer from "multer";
import pdf_parse from "pdf-parse";
import axios from "axios"
import { OpenAI } from "openai";
import dotenv from 'dotenv';
dotenv.config();

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

      if (!file) {
          return res.status(400).send("No file uploaded. Please upload a PDF file.");
      }

      if (file.mimetype !== "application/pdf") {
          return res.status(400).send("Invalid file type. Please upload a valid PDF.");
      }

      const pdfData = await pdf_parse(file.buffer);
      const pdfContent = pdfData.text;

      // Prepare the request data for OpenAI API (using chat completion)
      const requestData = {
          model: "gpt-3.5-turbo",  // You can use gpt-3.5-turbo, gpt-4, or others
          messages: [
              { role: "user", content: `Extract the utility provider's name from the following invoice text: ${pdfContent}` },
          ],
          temperature: 0.7,
      };

      // Make the API call to OpenAI
      const response = await axios.post("https://api.openai.com/v1/chat/completions", requestData, {
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          },
      });

      // Extract provider name from the response
      const providerName = response.data.choices[0].message.content.trim();
      if (!providerName) {
          throw new Error("Provider name could not be extracted.");
      }


      // Store or display extracted information
      // utilities.push({ content: pdfContent, provider: providerName });

      console.log("Extracted Provider:", providerName);
      // res.send(`Extracted Provider: ${providerName}`);
  } catch (error) {
      console.error("Error processing the file:", error.message);
      res.status(500).send("Error processing the uploaded file.");
  }
});





// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });