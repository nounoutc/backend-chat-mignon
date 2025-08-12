const express = require('express');
const cors = require('cors');
const catsRoutes = require('./routes/cats');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', catsRoutes);

// Use the port from Railway or fallback to 5000 locally
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
