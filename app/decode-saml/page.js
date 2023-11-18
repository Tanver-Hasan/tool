"use client";
// pages/decode-saml.js
import React, { useState } from 'react';
import axios from 'axios';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CopyToClipboard from '../components/CopyToClipboard';

const DecodeSamlPage = () => {
  const [samlRequestOrResponse, setsamlRequestOrResponse] = useState('PHNhbWxwOlJlc3BvbnNlIHhtbG5zOnNhbWxwPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6cHJvdG9jb2wiIElEPSJfNjIxYzRjNGFlNWQ2MGM3NjhjYzIiICBWZXJzaW9uPSIyLjAiIElzc3VlSW5zdGFudD0iMjAxNC0xMC0xNFQxNDozMjoxN1oiICBEZXN0aW5hdGlvbj0iaHR0cHM6Ly9hcHAuYXV0aDAuY29tL3Rlc3Rlci9zYW1scCI+PHNhbWw6SXNzdWVyIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPnVybjptYXR1Z2l0LmF1dGgwLmNvbTwvc2FtbDpJc3N1ZXI+PHNhbWxwOlN0YXR1cz48c2FtbHA6U3RhdHVzQ29kZSBWYWx1ZT0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnN0YXR1czpTdWNjZXNzIi8+PC9zYW1scDpTdGF0dXM+PHNhbWw6QXNzZXJ0aW9uIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iIFZlcnNpb249IjIuMCIgSUQ9Il81Vks3TFQ3RmxpVWtrYVF1VzZyNGJyRjBERzVFM1g3NiIgSXNzdWVJbnN0YW50PSIyMDE0LTEwLTE0VDE0OjMyOjE3LjI1MVoiPjxzYW1sOklzc3Vlcj51cm46bWF0dWdpdC5hdXRoMC5jb208L3NhbWw6SXNzdWVyPjxTaWduYXR1cmUgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyMiPjxTaWduZWRJbmZvPjxDYW5vbmljYWxpemF0aW9uTWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+PFNpZ25hdHVyZU1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNyc2Etc2hhMSIvPjxSZWZlcmVuY2UgVVJJPSIjXzVWSzdMVDdGbGlVa2thUXVXNnI0YnJGMERHNUUzWDc2Ij48VHJhbnNmb3Jtcz48VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI2VudmVsb3BlZC1zaWduYXR1cmUiLz48VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS8xMC94bWwtZXhjLWMxNG4jIi8+PC9UcmFuc2Zvcm1zPjxEaWdlc3RNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwLzA5L3htbGRzaWcjc2hhMSIvPjxEaWdlc3RWYWx1ZT5aRGtmR08zSDFUdTUwaGF3elFWanNBQ3pKd2M9PC9EaWdlc3RWYWx1ZT48L1JlZmVyZW5jZT48L1NpZ25lZEluZm8+PFNpZ25hdHVyZVZhbHVlPjFGZ3B0N0FhSGNNRTJnVEExNThhY2h2R1FWcUR3SFNIc0hGMy9hNXM3ZGplTzFBYVo4NEd6NWVpV0QrY2RJejZob1QxajJ2LzdRdGZqNWJzTU54dWxCblN6Zkw0VFQ0KytBSy96Rk80YWQybXdBQkZqTU1OaW9nd3dUM3R6eTNhUndqZ1NmbDNWS0VTb3ozWnA4S0wvSk5tL1RSS3o5NVREN0g2V25mS1pvTHdFckd6Tnc2Z1ZzMXk5WFl4SUVnNDZHelViMDdnMjNURm1ydjN3SGx4MlRwS1VOL25lNFoyOEtBUXpYcVZ5eWtKVmFLUS9nYkJOQy84QVFLbG9sOGZMR1NoZU9LUTB2Z0VFMXZGblZWQ0VtcDMwWWFwZEtlV1cycWNxSGI3T3FkbSs5YjJtT1VrcWJheEg1aXhCYllhcVphUUN0NVdGNFA1QnhuTWU0QnA4dz09PC9TaWduYXR1cmVWYWx1ZT48S2V5SW5mbz48WDUwOURhdGE+PFg1MDlDZXJ0aWZpY2F0ZT5NSUlET0RDQ0FpQ2dBd0lCQWdJSkFON085aGVmMDVSSk1BMEdDU3FHU0liM0RRRUJCUVVBTUJ3eEdqQVlCZ05WQkFNVEVXMWhkSFZuYVhRdVlYVjBhREF1WTI5dE1CNFhEVEV6TURZeE5qRXpNalF3TmxvWERUSTNNREl5TXpFek1qUXdObG93SERFYU1CZ0dBMVVFQXhNUmJXRjBkV2RwZEM1aGRYUm9NQzVqYjIwd2dnRWlNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0SUJEd0F3Z2dFS0FvSUJBUUQ4a0VmRWNMaXlNSzBxNEU0eFQvbWdsY1hzZjlvQ1dkVGpCMHZzd0ZYUVBDRGdVazVkYUptTzRvUnJDSXVXZ3RDaER5TWM1TTVNVGV4cXJDbnRRbEtwbmV4a3pEeEN2UFgvSVJKc3RqSkRTSCtXWGxqUllEYlhUZ0FaQWpqakFLcURCSWVVV2F3MUZjVXkzU09tUVZ0eVVkZmpYTnFMenhLUzhTVVdZWTNJYTZQVC91b1VqVUZtVXVKRUZwQmxCNzlHVytUdi9aaWRZNTNnSHloRVlPQnptMXZLWlMxdnRQZnh4cEJxdTdWa2YrNWxxM1JZanVvVlVZTjAzVElKdmVhYTdCQkwwamU4ejdVdnZPR2dyR3VvZFNLSG5lcTd1ZWV4NE9Dc2NDSlpiSzdNbGZibUZpdVNuaVZDZy95TXJ4L29rRG1lMzhzT1hIMUEvekp1MmxZcEFnTUJBQUdqZlRCN01CMEdBMVVkRGdRV0JCUUwzY3VEWE5YdTRVU3JwdjQ0ZHpmR3lISVhEVEJNQmdOVkhTTUVSVEJEZ0JRTDNjdURYTlh1NFVTcnB2NDRkemZHeUhJWERhRWdwQjR3SERFYU1CZ0dBMVVFQXhNUmJXRjBkV2RwZEM1aGRYUm9NQzVqYjIyQ0NRRGV6dllYbjlPVVNUQU1CZ05WSFJNRUJUQURBUUgvTUEwR0NTcUdTSWIzRFFFQkJRVUFBNElCQVFDQXRBbUtIb1g3T2VyekZVUTBPanJnOUMxdXpUNmZPTElsWHlhRHN3azJ0TEU2ZnRGaFNpVnpUMVR0Z1RGdjJvNklBNDd0VzZicUw3dDZaNUpOL0w4Y25vK2t4ZUtPZ1B6MkN2YlVUSm10Uk92RlYvVERrRnNZbUZKWjgrNm5aT0F0WFJaUFdGcGE2S0U0TGM1KzdKOTRzWDJBaVlQRkNuWFJ2WkdNaEo2cXRjK2poNTRRRUlseFp0a3hXVUJHczJmaE9RbStVeDB1eTFxeFN6aHAzbG12TmE3OUtkdm1RaXJTaXREb3Z5aWRhbHB3WDc1MFdHTmZRb0lTZTk0ZTNjbFdhNHVLWGdaN0FZbWhkMXc0a05zN3NlRmR0dkNjcVFKcktZVDJjQlRJTnp0TDZTZXFlRi94Qy8vbEdEbzlVSmljNHBjcnFqMVAzV0dIWUlzbE9XQlE8L1g1MDlDZXJ0aWZpY2F0ZT48L1g1MDlEYXRhPjwvS2V5SW5mbz48L1NpZ25hdHVyZT48c2FtbDpTdWJqZWN0PjxzYW1sOk5hbWVJRCBGb3JtYXQ9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjEuMTpuYW1laWQtZm9ybWF0OnVuc3BlY2lmaWVkIj5naXRodWJ8MTc1ODgwPC9zYW1sOk5hbWVJRD48c2FtbDpTdWJqZWN0Q29uZmlybWF0aW9uIE1ldGhvZD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmNtOmJlYXJlciI+PHNhbWw6U3ViamVjdENvbmZpcm1hdGlvbkRhdGEgTm90T25PckFmdGVyPSIyMDE0LTEwLTE0VDE1OjMyOjE3LjI1MVoiIFJlY2lwaWVudD0iaHR0cHM6Ly9hcHAuYXV0aDAuY29tL3Rlc3Rlci9zYW1scCIvPjwvc2FtbDpTdWJqZWN0Q29uZmlybWF0aW9uPjwvc2FtbDpTdWJqZWN0PjxzYW1sOkNvbmRpdGlvbnMgTm90QmVmb3JlPSIyMDE0LTEwLTE0VDE0OjMyOjE3LjI1MVoiIE5vdE9uT3JBZnRlcj0iMjAxNC0xMC0xNFQxNTozMjoxNy4yNTFaIj48c2FtbDpBdWRpZW5jZVJlc3RyaWN0aW9uPjxzYW1sOkF1ZGllbmNlPnVybjpmb288L3NhbWw6QXVkaWVuY2U+PC9zYW1sOkF1ZGllbmNlUmVzdHJpY3Rpb24+PC9zYW1sOkNvbmRpdGlvbnM+PHNhbWw6QXR0cmlidXRlU3RhdGVtZW50IHhtbG5zOnhzPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYSIgeG1sbnM6eHNpPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSI+PHNhbWw6QXR0cmlidXRlIE5hbWU9Imh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6YW55VHlwZSI+Z2l0aHVifDE3NTg4MDwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT48L3NhbWw6QXR0cmlidXRlPjxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhzaTp0eXBlPSJ4czphbnlUeXBlIj5tYXRpYXN3QGdtYWlsLmNvbTwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT48L3NhbWw6QXR0cmlidXRlPjxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6YW55VHlwZSI+TWF0aWFzIFdvbG9za2k8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvdXBuIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6YW55VHlwZSI+bWF0aWFzd0BnbWFpbC5jb208L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iaHR0cDovL3NjaGVtYXMuYXV0aDAuY29tL2lkZW50aXRpZXMvZGVmYXVsdC9hY2Nlc3NfdG9rZW4iPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhzaTp0eXBlPSJ4czphbnlUeXBlIj4zYTdkMGRmZWZmZTEyODEyYzM3MTEyZGFhODMwYWJlZjU3MDA4OWI0PC9zYW1sOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDpBdHRyaWJ1dGU+PHNhbWw6QXR0cmlidXRlIE5hbWU9Imh0dHA6Ly9zY2hlbWFzLmF1dGgwLmNvbS9pZGVudGl0aWVzL2RlZmF1bHQvcHJvdmlkZXIiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhzaTp0eXBlPSJ4czphbnlUeXBlIj5naXRodWI8L3NhbWw6QXR0cmlidXRlVmFsdWU+PC9zYW1sOkF0dHJpYnV0ZT48c2FtbDpBdHRyaWJ1dGUgTmFtZT0iaHR0cDovL3NjaGVtYXMuYXV0aDAuY29tL2lkZW50aXRpZXMvZGVmYXVsdC9jb25uZWN0aW9uIj48c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4c2k6dHlwZT0ieHM6YW55VHlwZSI+Z2l0aHViPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDpBdHRyaWJ1dGU+PHNhbWw6QXR0cmlidXRlIE5hbWU9Imh0dHA6Ly9zY2hlbWFzLmF1dGgwLmNvbS9pZGVudGl0aWVzL2RlZmF1bHQvaXNTb2NpYWwiPjxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhzaTp0eXBlPSJ4czphbnlUeXBlIj50cnVlPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPjwvc2FtbDpBdHRyaWJ1dGU+PC9zYW1sOkF0dHJpYnV0ZVN0YXRlbWVudD48c2FtbDpBdXRoblN0YXRlbWVudCBBdXRobkluc3RhbnQ9IjIwMTQtMTAtMTRUMTQ6MzI6MTcuMjUxWiI+PHNhbWw6QXV0aG5Db250ZXh0PjxzYW1sOkF1dGhuQ29udGV4dENsYXNzUmVmPnVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphYzpjbGFzc2VzOnVuc3BlY2lmaWVkPC9zYW1sOkF1dGhuQ29udGV4dENsYXNzUmVmPjwvc2FtbDpBdXRobkNvbnRleHQ+PC9zYW1sOkF1dGhuU3RhdGVtZW50Pjwvc2FtbDpBc3NlcnRpb24+PC9zYW1scDpSZXNwb25zZT4=');
  const [xmlResponse, setXmlResponse] = useState('');
  const [samlAttributes, setSamlAttributes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDecode = async () => {
    setErrorMessage('');
    if (!samlRequestOrResponse.trim()) {
      setErrorMessage('Please enter a SAML response to decode.');
      return;
    }

    try {
      const response = await axios.post('/api/decode-saml', { samlRequestOrResponse });
      setXmlResponse(response.data.xmlString);
      setSamlAttributes(response.data.attributes);
      console.log(samlAttributes)
    } catch (error) {
      const message = error.response?.data?.error || 'Error decoding SAML response';
      setErrorMessage(message);
      setXmlResponse('');
      setSamlAttributes([]);
    }
  };

  const formatXml = (xml) => {
    let formatted = '';
    let indent = '';
    const tab = '    '; // 4 spaces for indentation

    xml.split(/>\s*</).forEach(function(node) {
      if (node.match(/^\/\w/)) indent = indent.substring(tab.length); // decrease indent by one 'tab'
      formatted += indent + '<' + node + '>\r\n';
      if (node.match(/^<?\w[^>]*[^\/]$/)) indent += tab; // increase indent
    });

    return formatted.substring(1, formatted.length-3);
  };

  const formattedXml = xmlResponse ? formatXml(xmlResponse) : '';

  return (
    <div className="p-4">
      {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-4"
        style={{ height: 'auto' }}
        value={samlRequestOrResponse}
        onChange={(e) => setsamlRequestOrResponse(e.target.value)}
        placeholder="Enter SAML Response Here"
        rows={15}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleDecode}
      >
        Decode SAML
      </button>
      {formattedXml && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Decoded SAML (Formatted XML):</h3>
          <SyntaxHighlighter language="xml" style={docco}>
            {formattedXml}
          </SyntaxHighlighter>
          <CopyToClipboard textToCopy={formattedXml} buttonLabel="Copy to Clipboard" />
        </div>
      )}
      {samlAttributes.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">SAML Attributes:</h3>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Attribute Name</th>
                <th scope="col" className="px-6 py-3">Value</th>
              </tr>
            </thead>
            <tbody>
              {samlAttributes.map((attr, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-6 py-4">{attr.name}</td>
                  <td className="px-6 py-4">{attr.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DecodeSamlPage;
