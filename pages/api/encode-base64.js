// pages/api/encode-base64.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { data } = req.body;
        const encodedData = Buffer.from(data).toString('base64');
        res.status(200).json({ encodedData });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  