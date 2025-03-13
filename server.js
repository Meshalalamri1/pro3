const express = require("express");
require('dotenv').config(); // تحميل المتغيرات البيئية
require("./models/config"); // MongoDB connection
const cors = require("cors");

const authRoutes = require("./models/routes/authRoutes");
const hotelRoutes = require("./models/routes/hotelRoutes");
const eventRoutes = require("./models/routes/eventRoutes");
const bookingRoutes = require("./models/routes/bookingRoutes");

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error", error: err.message });
});

// Serve static files from the root directory
app.use(express.static('./', {
    fallthrough: true,
    index: 'index.html',
    caseSensitive: false
}));

// Root route handler
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './' });
});

// Route to serve Google Maps API key
app.get('/api/maps/key', (req, res) => {
    // Use environment variable or fallback to the existing key
    const apiKey = process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyDPNvJy8vKpj1wZdbl-EU_yTU56xNwyPac';
    res.json({ key: apiKey });
});

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`Server URL: http://0.0.0.0:${PORT}`);
});