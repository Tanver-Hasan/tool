import { generateKeyPair } from 'crypto';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const keySize = parseInt(req.query.size) || 2048; // Default to 2048 if not provided
      if (![1024, 2048, 4096].includes(keySize)) {
        return res.status(400).json({ error: 'Invalid key size' });
      }

      const options = {
        modulusLength: keySize, // Key size in bits
        publicKeyEncoding: {
          type: 'spki', // Recommended to use 'spki' for public key
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8', // Recommended to use 'pkcs8' for private key
          format: 'pem'
        }
      };

      // Generate key pair
      generateKeyPair('rsa', options, (err, publicKey, privateKey) => {
        if (err) {
          res.status(500).json({ error: 'Error generating keys' });
        } else {
          res.status(200).json({ publicKey, privateKey });
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
