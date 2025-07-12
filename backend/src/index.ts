import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';


const app = express();
app.use(express.json());
const PORT = 5000;
app.use(cors());


const USERNAME: string = "Adarsh";
const PASSWORD: string = "password";

const JWT_SECRET = "d0570e091474600b4c861932144086f4d1db17a1d5c53ebb0df6ca0589c094d830d6ede5bf0ffac34ea1010071a96a86";

app.get('/api/message', (_req, res) => {
  res.send('Welcome to Event Desk');
});

app.post('/login', (_req, res)=> {
   console.log(_req.body)
    const {username, password} = _req.body;
  //  const user = users.find(user:  => user.username === username);
   if (username === USERNAME && password === PASSWORD) {
    const token = jwt.sign({ username : username }, JWT_SECRET);
    console.log("TOKEN=", token);
    return res.status(200).json({ token, message: 'Login success' });
   }
   else {
    return res.status(400).send('Login failed');
   }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

