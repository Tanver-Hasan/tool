export default function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { url } = req.body;
        const encodedUrl = encodeURIComponent(url);
        res.status(200).json({ encodedUrl });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  