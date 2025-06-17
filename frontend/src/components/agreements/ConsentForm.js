import React, { useState, useEffect } from 'react';
import api from '../../api/api';

function ConsentForm({ onConsentGiven }) {
  const [consent, setConsent] = useState(null);
  const [status, setStatus] = useState('granted');
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/agreements?consentType=marketing')
      .then(res => setConsent(res.data[0]))
      .catch(() => setConsent(null));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await api.post('/agreements', {
        consentType: 'marketing',
        status,
        validUntil: new Date(Date.now() + 365*24*60*60*1000) // 1 year
      });
      setConsent(res.data);
      setMessage('Consent updated!');
      if (onConsentGiven) onConsentGiven(res.data);
    } catch {
      setMessage('Failed to update consent');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Consent for Marketing</h2>
      <label>
        <input type="radio" value="granted" checked={status === 'granted'} onChange={() => setStatus('granted')} />
        Grant Consent
      </label>
      <label>
        <input type="radio" value="withdrawn" checked={status === 'withdrawn'} onChange={() => setStatus('withdrawn')} />
        Withdraw Consent
      </label>
      <button type="submit">Submit</button>
      {consent && <div>Current status: {consent.status}</div>}
      {message && <div>{message}</div>}
    </form>
  );
}

export default ConsentForm;
