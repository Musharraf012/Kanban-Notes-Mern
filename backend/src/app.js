import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // load here first
import express from "express";
import cors from "cors";
const app = express();


app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*",
        credentials: true,
    })
);
app.use(
    express.json({
        limit: "16kb",
    })
);
app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);
app.use(express.static("public"));

// import routes
import noteRoutes from "./routes/notes.routes.js";

// routes declaration
app.use("/api/v1/note", noteRoutes);

export default app;