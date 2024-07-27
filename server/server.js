const express = require("express");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const path = require("path");


dotenv.config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/v1/file", require("./routes/fileRoute"));
app.use("/api/v1/user", require("./routes/userRoute"));
app.use('/api/v1/doctors', require('./routes/doctorRoute'));
app.use("/api/v1/doctor", require("./routes/appointmentBooking"));



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is running on port " + port );
})