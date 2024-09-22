import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Importing routes
import userRoutes from './routes/userRoutes.mjs'; // Ensure your route file is named correctly

app.use(userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
