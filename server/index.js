require('dotenv').config();
const express = require("express");
const dbConnected = require('./config/db');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes');
const productRoutes = require("./routes/productRoutes");
const path = require("path");

const port = process.env.PORT || 4000;



app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())


app.use("/uploads", express.static("uploads"));
app.use("/products", express.static(path.join(__dirname, "uploads"))); // serve images

app.use("/auth",authRouter)
app.use("/api/products", productRoutes);




// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running "
    });
});

//  404 route (Not Found)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Page not found "
    });
});

//  Global error handler
app.use((error, req, res, next) => {
    console.error("Error:", error.message);
    res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error"
    });
});

//  Server start
app.listen(port, async() => {
    console.log(` Server is running at: http://localhost:${port}`);
    await dbConnected()
});
