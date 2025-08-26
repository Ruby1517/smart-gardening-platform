import React, { useEffect, useState } from 'react';
import { db, auth } from './firebaseConfig';
import { ref, onValue } from 'firebase/database';
import { signOut } from 'firebase/auth';


const AdminDashboard = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const waitlistRef = ref(db, 'waitlist');
    onValue(waitlistRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      for (let key in data) {
        list.push({ id: key, ...data[key] });
      }
      setEntries(list);
    });
  }, []);

  return (
    <div>
      <h2>📋 Waitlist Entries</h2>
      <button onClick={() => signOut(auth)}>🚪 Logout</button>
      <table border="1" cellPadding="10">
        <thead>
          <tr><th>Email</th><th>Date</th></tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.email}</td>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
