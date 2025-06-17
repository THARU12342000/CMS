import React, { useEffect, useState } from 'react';
import api from '../../api/api';

function AuditLogList() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/audit-logs')
      .then(res => setLogs(res.data))
      .catch(() => setLogs([]));
  }, []);

  return (
    <div>
      <h2>Audit Logs</h2>
      {logs.length === 0 ? <p>No logs found.</p> : (
        <ul>
          {logs.map(log => (
            <li key={log._id}>
              {log.timestamp}: {log.action} by {log.userId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AuditLogList;
