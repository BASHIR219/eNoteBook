const express = require('express');
const connectTomongo = require("./db");
const cors = require("cors");

connectTomongo();
const app = express();
const port = 5000;

app.use(cors({
  origin: "https://e-note-book-frontend.vercel.app",
  methods: ["POST", "GET"],
  credentials: true
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Available routes
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
