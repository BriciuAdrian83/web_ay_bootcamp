import express from "express";
import multer from "multer";
import pdf_parse from "pdf-parse";
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory as a Buffer
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Local functions 
/** Extrage textul din pdf 
 * @param {Blob} file - uploaded file
 * @returns {string} - continutul fisierului pdf
*/
async function extractPdfContentFromFile(file) {
    if (!file) {
        throw new Error("No file uploaded. Please upload a PDF file.");
    }

    if (file.mimetype !== "application/pdf") {
        throw new Error("Invalid file type. Please upload a valid PDF.");
    }

    const pdfData = await pdf_parse(file.buffer);
    return pdfData.text; // Return the PDF text content
}

/**
 * Folosește OpenAI API să extragă furnizorul de utilități al facturii
 * @param {string} pdfContent 
 * @returns {string} numele providerului
 */
async function extractProviderNameFromPdfContent(pdfContent) {
    try {
        // Prepare the request data for OpenAI API
        const requestData = {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: `Extrage numele furnizorului de utilități (nu banca) din următorul text al facturii: ${pdfContent}` },
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

        return providerName; // Return the extracted provider name
    } catch (error) {
        console.error("Error processing the file:", error.message);
        throw error; // Propagate the error to handle it outside
    }
}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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
        const pdfContent = await extractPdfContentFromFile(file);
        const providerName = await extractProviderNameFromPdfContent(pdfContent);

        console.log("Extracted Provider:", providerName);
        res.send(`Extracted Provider: ${providerName}`);
    } catch (error) {
        console.error("Error processing the file:", error.message);
        res.status(500).send("Error processing the uploaded file.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
