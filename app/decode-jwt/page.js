"use client";
// pages/decode-jwt/page.js
// pages/decode-jwt.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CopyToClipboard from '../components/CopyToClipboard';

const DecodeTokenPage = () => {
  const [token, setToken] = useState('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InRfU3RJdG1mVHo0YlFZQTlsUzRuOCJ9.eyJpc3MiOiJodHRwczovL3RhbnZlci1jdXN0b20uZXUuYXV0aDAuY29tLyIsInN1YiI6IkFveVNWN3ZLS0dKajM5R0hLSnc2MUhHcVpwTUNCUmU4QGNsaWVudHMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJpYXQiOjE2OTk5NjYwMzEsImV4cCI6MTcwMjU1ODAzMCwiYXpwIjoiQW95U1Y3dktLR0pqMzlHSEtKdzYxSEdxWnBNQ0JSZTgiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJwZXJtaXNzaW9ucyI6W119.QATxaT_EWypIsX3GJrsP-T2qsZYphQE-hoP-pAJsyO-FuwEwCgnkFW91yljBj3vgbutEUjGQxsy-OlGn5inHi7UBEvxPIteDsmTfqeXZMGfAkHII7DwuPOiAQGAvJ8hf8DUOSgDmMIwXUUjq7uUJ78xSVSFyhnwTyzCcsBkzjDXsJy-pCzy-vPWI-ZFYTS31VBuYAmF21u7sss2AmtQ1btd5HaeV4YhXmLzeOSk-HFNEleh8b8OG9Kri01OlC0kuOdc2DIO4-N33E3UQ8la3TdLQxh858sLuzQ1M2LKn9XjfCnkLGSvBZrE2NMatu58R9sLkImclJFVmWiXqRy5oQA');
  const [decoded, setDecoded] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [discoveryUrl, setDiscoveryUrl] = useState('');
  const [jwksUrl, setJwksUrl] = useState('');

  useEffect(() => {
    if (decoded?.payload?.iss) {
      setDiscoveryUrl(`${decoded.payload.iss}.well-known/openid-configuration`);
      setJwksUrl(`${decoded.payload.iss}.well-known/jwks.json`);
    }
  }, [decoded]);


  const handleDecode = async () => {
    setErrorMessage('');
    if (!token.trim()) {
      setErrorMessage('Please enter a JWT token to decode.');
      return;
    }

    try {
      const response = await axios.post('/api/decode-jwt', { token });
      setDecoded(response.data);
    } catch (error) {
      const message = error.response?.data?.error || 'Error decoding token';
      setErrorMessage(message);
      setDecoded(null);
    }
  };

  return (
    <div className="p-4">
      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter JWT Token Here"
        rows={8}
      />
      <button
        className={`px-4 py-2 text-white rounded ${token.trim() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300'}`}
        onClick={handleDecode}
        disabled={!token.trim()}
      >
        Decode JWT
      </button>
      {decoded && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Decoded JWT:</h3>
          <div className="overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 mt-2">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Part</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Header</td>
                  <td className="px-6 py-4 whitespace-pre-wrap"><code>{JSON.stringify(decoded.header, null, 2)}</code></td>
                  <td className="px-6 py-4 whitespace-nowrap"><CopyToClipboard textToCopy={JSON.stringify(decoded.header)} buttonLabel="Copy" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Payload</td>
                  <td className="px-6 py-4 whitespace-pre-wrap"><code>{JSON.stringify(decoded.payload, null, 2)}</code></td>
                  <td className="px-6 py-4 whitespace-nowrap"><CopyToClipboard textToCopy={JSON.stringify(decoded.payload)} buttonLabel="Copy" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Signature</td>
                  <td className="px-6 py-4 whitespace-pre-wrap"><code>{decoded.signature}</code></td>
                  <td className="px-6 py-4 whitespace-nowrap"><CopyToClipboard textToCopy={decoded.signature} buttonLabel="Copy" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          {discoveryUrl && (
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
              <h4 className="text-lg font-semibold">OIDC Discovery and JWKS Endpoints:</h4>
              <p><a href={discoveryUrl} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Discovery Endpoint</a></p>
              <p><a href={jwksUrl} className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">JWKS Endpoint</a></p>
            </div>
          )}
        </div>

      )}
    </div>
  );
};

export default DecodeTokenPage;
