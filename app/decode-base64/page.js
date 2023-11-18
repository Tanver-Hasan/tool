"use client";
// pages/decode-base64.js
import React, { useState } from 'react';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import xmlFormatter from 'xml-formatter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CopyToClipboard from '../components/CopyToClipboard';

const DecodeBase64Page = () => {
  const [base64String, setBase64String] = useState('ewogICJuYW1lIjogIkpvaG4gRG9lIiwKICAiYWdlIjogMzAsCiAgImVtYWlsIjogImpvaG5kb2VAZXhhbXBsZS5jb20iCn0=');
  const [decodedString, setDecodedString] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDecode = async () => {
    setErrorMessage('');
    if (!base64String.trim()) {
      setErrorMessage('Please enter a Base64 string to decode.');
      return;
    }

    try {
      const response = await axios.post('/api/decode-base64', { encodedData: base64String });
      setDecodedString(response.data.decodedData);
    } catch (error) {
      const message = error.response?.data?.error || 'Error decoding Base64 string';
      setErrorMessage(message);
      setDecodedString('');
    }
  };

  // Function to guess the format of the decoded string
  const determineLanguage = (str) => {
    try {
      JSON.parse(str);
      return 'json';
    } catch (e) {
      // Check if it's XML
      if (str.startsWith('<?xml') || /<[^>]+>/.test(str)) {
        return 'xml';
      }
      return 'text'; // default to plain text
    }
  };

  const language = determineLanguage(decodedString);
  let formattedString = decodedString;

  // Format XML for better readability
  if (language === 'xml') {
    try {
      formattedString = xmlFormatter(decodedString);
    } catch (e) {
      console.error('Error formatting XML:', e);
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Base64 Decode</h2>

      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        value={base64String}
        onChange={(e) => setBase64String(e.target.value)}
        placeholder="Enter Base64 String Here"
        rows={10}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleDecode}
      >
        Decode Base64
      </button>
      {decodedString && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Decoded String:</h3>
          <SyntaxHighlighter language={language} style={docco}>
            {formattedString}
          </SyntaxHighlighter>
          <CopyToClipboard textToCopy={formattedString} buttonLabel="Copy to Clipboard" />
        </div>
      )}
      <Base64TechnicalDetails />
    </div>
  );
};

const Base64TechnicalDetails = () => (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-blue-600">Technical Insights into Base64 Decoding</h3>
      <p className="mt-2 text-gray-700">
        Base64 decoding reverses the encoding process, transforming Base64 characters back to their original binary or text form. This process is integral in data transmission and processing. Key technical aspects include:
      </p>
      <ul className="list-disc list-inside mt-2 text-gray-700">
        <li><strong>Character Set:</strong> Involves 64 characters (A-Z, a-z, 0-9, '+', '/'), with '=' for padding.</li>
        <li><strong>Decoding Process:</strong> Converts every four Base64 characters back into three bytes of binary data, reversing the encoding transformation.</li>
        <li><strong>Padding Handling:</strong> Padding characters ('=') are used for filling and are ignored during decoding to retrieve the original data.</li>
        <li><strong>Conversion Mechanism:</strong> The decoding interprets each character as a 6-bit value, concatenating these to form bytes.</li>
        <li><strong>Implementation:</strong> Efficient decoding algorithms are crucial in data transmission and processing applications.</li>
        <li><strong>Applications:</strong> Widely used in web APIs, email attachments, and binary file or image retrieval.</li>
      </ul>
      <p className="mt-4 text-gray-700">
        A deeper understanding of these technicalities is essential for developers and architects in data encoding and web applications.
      </p>
    </div>
  );
  
  
export default DecodeBase64Page;
