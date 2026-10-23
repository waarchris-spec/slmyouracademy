import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SplashScreen } from './components/SplashScreen';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { ScrollToTop } from './components/ScrollToTop';

// Dedicated Routed Pages
import { HomePage } from './pages/HomePage';
import { LanguagesPage } from './pages/LanguagesPage';
import { AcademicSupportPage } from './pages/AcademicSupportPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { WhyUsPage } from './pages/WhyUsPage';
import { LocationsPage } from './pages/LocationsPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { BooksPage } from './pages/BooksPage';
import { BranchesContactPage } from './pages/BranchesContactPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { CommunityPage } from './pages/CommunityPage';
import { SuccessStoriesPage } from './pages/SuccessStoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AcademyApp() {
  const { isRtl } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>(undefined);

  const handleOpenRegister = (programName?: string) => {
    setSelectedProgram(programName);
    setIsModalOpen(true);
  };

  const handleCloseRegister = () => {
    setIsModalOpen(false);
    setSelectedProgram(undefined);
  };

  return (
    <div
      className={`min-h-screen bg-[#F8FAFC] text-zinc-900 dark:bg-[#0B0F17] dark:text-white flex flex-col ${
        isRtl ? 'font-cairo' : 'font-plus-jakarta'
      } selection:bg-amber-400 selection:text-black antialiased transition-colors duration-200`}
    >
      {/* Scroll restoration upon page change */}
      <ScrollToTop />

      {/* Website Entry / Splash Screen */}
      <SplashScreen />

      {/* Navigation Header with multi-page routes */}
      <Navbar onOpenRegister={handleOpenRegister} />

      {/* Routed Page Content */}
      <main className="flex-grow pb-24 md:pb-24">
        <Routes>
          <Route path="/" element={<HomePage onOpenRegister={handleOpenRegister} />} />
          <Route path="/languages" element={<LanguagesPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/books" element={<BooksPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/academic-support" element={<AcademicSupportPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/programs" element={<ProgramsPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/why-your-academy" element={<WhyUsPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/resources" element={<ResourcesPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/academic-resources" element={<ResourcesPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/community" element={<CommunityPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/success-community" element={<CommunityPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/testimonials" element={<SuccessStoriesPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/success-stories" element={<SuccessStoriesPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/branches-contact" element={<BranchesContactPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/locations" element={<BranchesContactPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/contact" element={<BranchesContactPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/registration" element={<RegistrationPage onOpenRegister={handleOpenRegister} />} />
          <Route path="/faq" element={<FaqPage onOpenRegister={handleOpenRegister} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Shared Footer with working route links */}
      <Footer onOpenRegister={() => handleOpenRegister()} />

      {/* Mobile Bottom Sticky Bar for rapid contact & registration */}
      <MobileStickyBar onOpenRegister={() => handleOpenRegister()} />

      {/* Shared Registration & Pre-enrollment Dialog */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={handleCloseRegister}
        preselectedProgram={selectedProgram}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AcademyApp />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
