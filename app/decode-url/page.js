"use client";
// pages/url-decode.js
import React, { useState } from 'react';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CopyToClipboard from '../components/CopyToClipboard';
import URLDecodeTechnicalDetails from "../components/URLDecodeTechnicalDetails"

const UrlDecodePage = () => {
  const [encodedUrl, setEncodedUrl] = useState('https%3A%2F%2Ftanver-custom.eu.auth0.com%2F.well-known%2Fjwks.json%3Fxyz%3Dxyz');
  const [decodedUrl, setDecodedUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDecode = async () => {
    setErrorMessage('');
    if (!encodedUrl.trim()) {
      setErrorMessage('Please enter an encoded URL to decode.');
      return;
    }

    try {
      const response = await axios.post('/api/decode-url', { encodedUrl });
      setDecodedUrl(response.data.decodedUrl);
    } catch (error) {
      const message = error.response?.data?.error || 'Error decoding URL';
      setErrorMessage(message);
      setDecodedUrl('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">URL Decode</h2>
      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={encodedUrl}
        onChange={(e) => setEncodedUrl(e.target.value)}
        placeholder="Enter Encoded URL Here"
        rows={4}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleDecode}
      >
        Decode URL
      </button>
      {decodedUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Decoded URL:</h3>
          <SyntaxHighlighter language="text" style={docco}>
            {decodedUrl}
          </SyntaxHighlighter>
          <CopyToClipboard textToCopy={decodedUrl} buttonLabel="Copy to Clipboard" />
        </div>
      )}
      <URLDecodeTechnicalDetails />
    </div>
  );
};

export default UrlDecodePage;
