import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';

const App = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdmin(user); // user is null if not logged in
    });
    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <div>
      {admin === null ? (
        // Not logged in — show landing + optional login
        <>
          <LandingPage />
          <LoginPage onLogin={() => {}} />
        </>
      ) : (
        // Admin logged in
        <AdminDashboard />
      )}
    </div>
  );
};

export default App;
