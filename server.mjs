import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import soapRoutes from './routes/soapRoutes.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your specific origin
  optionsSuccessStatus: 200
};
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/soaps', soapRoutes);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
