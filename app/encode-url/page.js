
"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CopyToClipboard from '../components/CopyToClipboard';
import URLEncodeTechnicalDetails from '../components/URLEncodeTechnicalDetails';

const EncodeUrlPage = () => {
  const [urlToEncode, setUrlToEncode] = useState('https://tanver-custom.eu.auth0.com/.well-known/jwks.json?xyz=xyz');
  const [encodedUrl, setEncodedUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEncode = async () => {
    setErrorMessage('');
    if (!urlToEncode.trim()) {
      setErrorMessage('Please enter a URL to encode.');
      return;
    }

    try {
      const response = await axios.post('/api/encode-url', { url: urlToEncode });
      setEncodedUrl(response.data.encodedUrl);
    } catch (error) {
      const message = error.response?.data?.error || 'Error encoding URL';
      setErrorMessage(message);
      setEncodedUrl('');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">URL Encode</h2>
      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={urlToEncode}
        onChange={(e) => setUrlToEncode(e.target.value)}
        placeholder="Enter URL Here"
        rows={4}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleEncode}
      >
        Encode URL
      </button>
      {encodedUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Encoded URL:</h3>
          <SyntaxHighlighter language="text" style={docco}>
            {encodedUrl}
          </SyntaxHighlighter>
          <CopyToClipboard textToCopy={encodedUrl} buttonLabel="Copy to Clipboard" />
        </div>
      )}
      <URLEncodeTechnicalDetails />
    </div>
  );
};

export default EncodeUrlPage;
