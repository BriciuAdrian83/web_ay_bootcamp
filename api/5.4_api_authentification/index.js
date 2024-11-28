import express from "express";
import axios from "axios";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = process.env.USERNAME;
const yourPassword = process.env.PASSWORD;
const yourAPIKey = process.env.API_KEY;
const yourBearerToken = process.env.BEARER_TOKEN;


app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    //TODO 2: Use axios to hit up the /random endpoint
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const result = response.data;
    //The data you get back should be sent to the ejs file as "content"
    //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
    res.render("index.ejs", {
      content: JSON.stringify(result)
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    //TODO 3: Write your code here to hit up the /all endpoint
    //Specify that you only want the secrets from page 2
    //HINT: This is how you can use axios to do basic auth:
    // https://stackoverflow.com/a/74632908
    /*
     axios.get(URL, {
        auth: {
          username: "abc",
          password: "123",
        },
      });
    */

    const response = await axios.get('https://secrets-api.appbrewery.com/all?page=2', {
      auth: {
        username: yourUsername,
        password: yourPassword,
      }
    });
    const result = response.data;
    res.render("index.ejs", {
      content: JSON.stringify(result)
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  const params = {
    score: 5,
    apiKey: yourAPIKey,
  };
  const response = await axios.get('https://secrets-api.appbrewery.com/filter', { params });
  const result = response.data;
  res.render("index.ejs", {
    content: JSON.stringify(result)
  });
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  const id = 42;
  const response = await axios.get(`https://secrets-api.appbrewery.com/secrets/${id}`, {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`
    },
  });
  const result = response.data;
  res.render("index.ejs", {
    content: JSON.stringify(result)
  });

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
