const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Importing routes
const userRoutes = require('./routes/userRoutes');

app.use(userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});