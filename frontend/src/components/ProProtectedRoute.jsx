import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';

export default function ProProtectedRoute({ children }) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [isPro, setIsPro] = useState(null);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!isLoaded || !isSignedIn) return;
      
      try {
        const token = await getToken();
        if (!token) {
          setIsPro(false);
          return;
        }
        
        const res = await fetch('/api/subscription/status', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setIsPro(data.isPro);
      } catch (err) {
        console.error('Error checking Pro status:', err);
        setIsPro(false); // Fail closed to prevent unauthorized access
      }
    };

    checkSubscription();
  }, [isLoaded, isSignedIn, getToken]);

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#050505]">
        <Loader2 size={32} className="animate-spin text-[#00d060]" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  if (isPro === null) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#050505] text-white">
        <Loader2 size={32} className="animate-spin text-[#00d060] mb-4" />
        <p className="text-[#888888]">Verifying subscription status...</p>
      </div>
    );
  }

  if (isPro === false) {
    return <Navigate to="/billing" replace />;
  }

  return children ? children : <Outlet />;
}
