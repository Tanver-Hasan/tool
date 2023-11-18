"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Base64EncodeTechnicalDetails from "../components/Base64EncodeTechnicalDetails"
import CopyToClipboard from '../components/CopyToClipboard';

const EncodeBase64Page = () => {
  const formattedJsonObject = JSON.stringify({"name":"John Doe","age":30,"email":"johndoe@example.com"}, null, 2);

  const [inputString, setInputString] = useState(formattedJsonObject);
  const [encodedString, setEncodedString] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const handleEncode = async () => {
    setErrorMessage('');
    setCopySuccess('');
    if (!inputString.trim()) {
      setErrorMessage('Please enter text to encode.');
      return;
    }

    try {
      const response = await axios.post('/api/encode-base64', { data: inputString });
      setEncodedString(response.data.encodedData);
    } catch (error) {
      const message = error.response?.data?.error || 'Error encoding text';
      setErrorMessage(message);
      setEncodedString('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encodedString)
      .then(() => {
        setCopySuccess('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Base64 Encode</h2>

      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={inputString}
        onChange={(e) => setInputString(e.target.value)}
        placeholder="Enter text here to encode to Base64"
        rows={10}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleEncode}
      >
        Encode to Base64
      </button>
      {encodedString && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Encoded Base64 String:</h3>
          <SyntaxHighlighter language="text" style={docco}>
            {encodedString}
          </SyntaxHighlighter>
          <CopyToClipboard textToCopy={encodedString} buttonLabel="Copy to Clipboard" />
        </div>
      )}
      <Base64EncodeTechnicalDetails />
    </div>
  );
};

export default EncodeBase64Page;
