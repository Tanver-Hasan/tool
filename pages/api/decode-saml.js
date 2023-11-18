// pages/api/decode-saml.js
import pako from 'pako';
import { parseStringPromise, processors } from 'xml2js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const  samlData  = req.body.samlRequestOrResponse;

      if (!samlData) {
        return res.status(400).json({ error: 'No SAML data provided' });
      }

      // Decode URL, Base64, and Inflate
      let decodedData = decodeSamlData(samlData);

      // Ensure that the decoded data is a string and non-empty
      if (typeof decodedData !== 'string' || !decodedData.trim()) {
        throw new Error('Decoded data is not a valid XML string.');
      }

      // Parse XML
      //const result = await parseStringPromise(decodedData);
      const result = await parseStringPromise(decodedData);

      // Check if the result is valid
      if (!result) {
        throw new Error('Failed to parse XML data.');
      }
       console.log(result)
      // Extract attributes
       const attributes = extractSamlAttributes(result);

      return res.status(200).json({ xmlString: decodedData, attributes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message || 'Failed to decode and parse SAML data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function decodeSamlData(samlData) {
  let decodedData = samlData;

  // Check if URL-encoded and decode
  if (decodedData.match(/%[0-9A-Fa-f]{2}/)) {
    decodedData = decodeURIComponent(decodedData);
  }

  // Check if Base64 encoded and decode
  if (decodedData.match(/^[A-Za-z0-9+/=]+\z/)) {
    decodedData = Buffer.from(decodedData, "base64").toString("binary");
  }

  // Attempt to Inflate (decompress)
  try {
    decodedData = pako.inflate(decodedData, { raw: true }, { to: "string" });
  } catch (inflationError) {
    // If inflation fails, it might not be deflated. Use the decoded data as is.
    console.log("Inflation Error :" + inflationError);
    decodedData = decodedData.toString("utf-8");
  }

  return decodedData;
}
function extractSamlAttributes(parsedXml) {
    if (!parsedXml || typeof parsedXml !== 'object') {
      throw new Error('Invalid XML data: Expected an object');
    }
  
    const attributes = [];
    const response = parsedXml['samlp:Response'];
    const assertions = response && response['saml:Assertion'];
  
    if (assertions && assertions.length > 0) {
      const attributeStatements = assertions[0]['saml:AttributeStatement'];
      if (attributeStatements && attributeStatements.length > 0) {
        const attributesNode = attributeStatements[0]['saml:Attribute'];
        if (attributesNode && attributesNode.length > 0) {
          attributesNode.forEach(attr => {
            if (attr['$'] && attr['$'].Name && attr['saml:AttributeValue']) {
              attr['saml:AttributeValue'].forEach(value => {
                attributes.push({
                  name: attr['$'].Name,
                  value: value['_'] || value
                });
              });
            }
          });
        } else {
          throw new Error('No Attributes found in the XML');
        }
      } else {
        throw new Error('No AttributeStatement found in the XML');
      }
    } else {
      throw new Error('No Assertion found in the XML');
    }
  
    return attributes;
  }
  