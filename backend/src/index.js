import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });
import connectDB from './db/index.js';
import app from './app.js';



// Connect to the database
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log("Server is running on port 8000");
        });
    })
    .catch((err) => {
        console.error("Database connection failed ❌", err);
        process.exit(1);
    });