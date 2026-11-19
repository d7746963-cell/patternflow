import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import LandingPage from './pages/LandingPage';
import LandingPageV2 from './pages/LandingPageV2';
import UploadPage from './pages/UploadPage';
import AnalysisPage from './pages/AnalysisPage';
import HistoryPage from './pages/HistoryPage';
import ComingSoonPage from './pages/ComingSoonPage';
import BillingPage from './pages/BillingPage';
import SupportPage from './pages/SupportPage';
import MockCheckoutPage from './pages/MockCheckoutPage';
import OnboardingPage from './pages/OnboardingPage';
import TermsPage from './pages/TermsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProProtectedRoute from './components/ProProtectedRoute';
import { LayoutDashboard, Star, Bell } from 'lucide-react';
import { SignedIn, SignedOut, RedirectToSignUp } from '@clerk/clerk-react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/preview-v2" element={<LandingPageV2 />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/checkout" element={<MockCheckoutPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Protected Application Routes */}
        <Route element={
          <>
            <SignedIn>
              <DashboardLayout />
            </SignedIn>
            <SignedOut>
              <RedirectToSignUp fallbackRedirectUrl="/upload" />
            </SignedOut>
          </>
        }>
          {/* App Routes accessible to signed-in users (Free users get 1 analysis, Pro users get unlimited) */}
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/analysis/:id?" element={<AnalysisPage />} />
          
          {/* Pro-Only Routes */}
          <Route element={<ProProtectedRoute />}>
            <Route path="/history" element={<HistoryPage />} />
            
            {/* Placeholder Routes */}
            <Route path="/favorites" element={<ComingSoonPage title="Favorite Charts" description="Save your best chart analyses and AI insights here for quick reference." Icon={Star} />} />
            <Route path="/alerts" element={<ComingSoonPage title="Price Alerts" description="Set custom price alerts based on AI-identified support and resistance levels." Icon={Bell} />} />
          </Route>
          
          {/* Billing and Support are accessible without Pro */}
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
