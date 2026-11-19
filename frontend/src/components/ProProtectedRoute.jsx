import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    const checkSubscription = async () => {
      if (!isLoaded || !isSignedIn || !userLoaded) return;

      // Frontend admin bypass — check ALL email addresses on the account
      const allEmails = (user?.emailAddresses || []).map(e => e.emailAddress?.toLowerCase());
      const primaryEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();

      const isAdmin = ADMIN_EMAILS.some(adminEmail =>
        allEmails.includes(adminEmail) || primaryEmail === adminEmail
      );

      if (isAdmin) {
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

  // Check if free trial analysis has been used
  const hasUsedFree = Boolean(
    (user?.unsafeMetadata && Number(user.unsafeMetadata.freeAnalysesUsed) >= 1) ||
    (user?.id && localStorage.getItem(`patternflow_free_used_${user.id}`) === '1')
  );

  // If user is not Pro:
  // - If they haven't used their 1 free analysis yet: ALLOW access to /upload and /analysis
  // - If they are currently viewing /analysis: ALLOW access to see their generated result
  // - Otherwise, redirect to billing
  if (isPro === false && hasUsedFree && !location.pathname.startsWith('/analysis')) {
    return <Navigate to="/billing?reason=limit_reached" replace />;
  }

  return children ? children : <Outlet />;
}
