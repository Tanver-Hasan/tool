// pages/api/url-decode.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { encodedUrl } = req.body;
        const decodedUrl = decodeURIComponent(encodedUrl);
        res.status(200).json({ decodedUrl });
      } catch (error) {
        res.status(500).json({ error: 'Error decoding URL' });
      }
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  