require("dotenv").config();
const mongoose = require("mongoose");
require('./models/Cv');
require('./models/Avis');
require('./models/User');
const express = require("express");
const app = express();
const port = process.env.PORT || "3000";
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const apiRouter = require("./routes");
const cors = require("cors");

const corsOptions = {
    origin: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "CV Generator API",
            description: "Swagger for CVGENERATORAPI. routes commence '/api'",
            version: "1.1.0",
        },
    },
    apis: ["./src/routes/*.js"],
};

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to CV Generator API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    color: #333;
                    text-align: center;
                    padding: 50px;
                }
                h1 {
                    color: #4CAF50;
                }
                a {
                    text-decoration: none;
                    color: white;
                    background-color: #4CAF50;
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-size: 18px;
                }
                a:hover {
                    background-color: #45a049;
                }
            </style>
        </head>
        <body>
            <h1>Bienvenue sur CV Generator !!</h1>
            <p>Ce site constitue le backend pour la gestion des CV, des utilisateurs et des évaluations.</p>
            <p>Pour consulter la documentation de l'API, cliquez sur le bouton ci-dessous :</p>
            <a href="/api-docs">Voir la documentation de l'API</a>
        </body>
        </html>
    `);
});


const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.log(`Database connection error ${error}`);
        console.log(`Failed to connect to ${process.env.DATABASE_URL}`);
    });

app.use("/api/", apiRouter);

app.listen(port, () => {
    console.log("server is running");
});
