const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//test for connection
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profiles'));
app.use('/api/reviews', require('./routes/api/review'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
