const express = require('express')
const connectTomongo = require("./db");
var cors = require("cors");

connectTomongo();
const app = express()
const port = 5000


app.use(cors(
  {
  origin:"https://e-note-book-frontend.vercel.app",
    methods :["POST", "GET"],
    credentials : true
}
));

// Handle preflight requests for all routes
app.options('*', cors());

app.use(express.json());
//availabe routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
