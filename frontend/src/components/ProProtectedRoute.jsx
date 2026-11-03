import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';

// Hardcoded admin emails — free lifetime access, works across all Clerk instances
const ADMIN_EMAILS = [
  'mayankpatel9r02@gmail.com',
  'd7746963@gmail.com',
];

export default function ProProtectedRoute({ children }) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const [isPro, setIsPro] = useState(null);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!isLoaded || !isSignedIn || !userLoaded) return;

      // Frontend admin bypass — check by email, works on any Clerk instance
      const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
      if (userEmail && ADMIN_EMAILS.includes(userEmail)) {
        setIsPro(true);
        return;
      }
      
      try {
        const token = await getToken();
        if (!token) {
          setIsPro(false);
          return;
        }
        
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subscription/status`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setIsPro(data.isPro);
      } catch (err) {
        console.error('Error checking Pro status:', err);
        setIsPro(false);
      }
    };

    checkSubscription();
  }, [isLoaded, isSignedIn, userLoaded, user, getToken]);

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
