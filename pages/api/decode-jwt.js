// pages/api/decode-jwt.js
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  console.log("Decode JWT")
  if (req.method === 'POST') {
    try {
      const { token } = req.body;
      const decodedToken = jwt.decode(token, { complete: true });

      if (!decodedToken) {
        return res.status(400).json({ error: 'Invalid token' });
      }

      res.status(200).json({ 
        header: decodedToken.header, 
        payload: decodedToken.payload, 
        signature: decodedToken.signature
      });
    } catch (error) {
      res.status(500).json({ error: 'Error decoding token' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
