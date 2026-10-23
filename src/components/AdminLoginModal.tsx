import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, KeyRound, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { loginAdmin } from '../services/booksService';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { isRtl } = useLanguage();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMsg('يرجى إدخال كلمة مرور الإدارة.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const res = await loginAdmin(password.trim());
    setLoading(false);

    if (res.success) {
      onLoginSuccess();
      onClose();
      setPassword('');
    } else {
      setErrorMsg(res.message || 'كلمة المرور غير صحيحة. كلمة المرور الافتراضية: admin2026');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-md bg-white dark:bg-[#0D131F] rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 z-10 text-start"
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Icon */}
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">
            {isRtl ? 'تسجيل دخول إدارة الأكاديمية' : 'Academy Admin Access'}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 mb-6">
            {isRtl
              ? 'مخصص للمسؤولين البيداغوجيين لتعديل بطاقات الكتب، رفع أغلفة جديدة، وتحديث المعلومات.'
              : 'Authorized administrators can manage cards, upload covers, and modify syllabus details.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                {isRtl ? 'كلمة مرور الإدارة (Admin PIN/Password)' : 'Admin Password:'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-sm"
                />
                <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5 pointer-events-none" />
              </div>
              <p className="text-[11px] text-zinc-400 mt-1.5">
                {isRtl ? 'كلمة المرور الافتراضية: admin2026 أو youracademy' : 'Default password: admin2026 or youracademy'}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm transition-all shadow-md shadow-amber-400/20 cursor-pointer disabled:opacity-50"
              >
                {loading ? (isRtl ? 'جاري التحقق...' : 'Checking...') : (isRtl ? 'دخول المسؤول' : 'Sign In')}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-sm transition-colors cursor-pointer"
              >
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
