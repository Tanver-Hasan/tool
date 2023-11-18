"use client"
import React, { useState } from 'react';
import axios from 'axios';
import CopyToClipboard from '../components/CopyToClipboard';
import KeyPairGenerationTechnicalDetails from '../components/KeyPairGenerationTechnicalDetails';

const GenerateKeysPage = () => {
  const [keySize, setKeySize] = useState('2048');
  const [algorithm, setAlgorithm] = useState('RSA');
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleGenerateKeys = async () => {
    setErrorMessage('');
    try {
      const response = await axios.get(`/api/generate-keys?algorithm=${algorithm}&size=${keySize}`);
      setPublicKey(response.data.publicKey);
      setPrivateKey(response.data.privateKey);
    } catch (error) {
      const message = error.response?.data?.error || 'Error generating keys';
      setErrorMessage(message);
    }
  };

  const downloadFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Generate Public/Private Key Pair</h2>
      <div className="mb-4">
        <label htmlFor="algorithm" className="block mb-2 text-sm font-medium text-gray-700">Select Algorithm:</label>
        <select
          id="algorithm"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="RSA">RSA</option>
          <option value="ECDSA">ECDSA</option>
          <option value="DSA">DSA</option>
          {/* Add other algorithms as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="keySize" className="block mb-2 text-sm font-medium text-gray-700">Select Key Size:</label>
        <select
          id="keySize"
          value={keySize}
          onChange={(e) => setKeySize(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="1024">1024</option>
          <option value="2048">2048</option>
          <option value="4096">4096</option>
        </select>
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleGenerateKeys}
      >
        Generate Keys
      </button>
      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
      {publicKey && (
        <div>
          <h3 className="text-lg font-semibold">Public Key:</h3>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={publicKey}
            readOnly
            rows={6}
          />
          <CopyToClipboard textToCopy={publicKey} buttonLabel="Copy to Clipboard" />
          <button 
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => downloadFile(publicKey, 'publicKey.pem', 'text/plain')}
          >
            Download Public Key
          </button>
        </div>
      )}
      {privateKey && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Private Key:</h3>
          <textarea
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={privateKey}
            readOnly
            rows={6}
          />
          <CopyToClipboard textToCopy={privateKey} buttonLabel="Copy to Clipboard" />
          <button 
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => downloadFile(privateKey, 'privateKey.pem', 'text/plain')}
          >
            Download Private Key
          </button>
        </div>
      )}
      <KeyPairGenerationTechnicalDetails />
    </div>
  );
};

export default GenerateKeysPage;
