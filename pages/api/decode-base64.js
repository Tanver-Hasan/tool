// pages/api/decode-base64.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { encodedData } = req.body;
  
        if (!encodedData) {
          return res.status(400).json({ error: 'No Base64 string provided' });
        }
  
        // Decoding Base64 string
        let decodedData;
        try {
          decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');
        } catch (error) {
          throw new Error('Invalid Base64 string');
        }
  
        return res.status(200).json({ decodedData });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'Failed to decode Base64 string' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  