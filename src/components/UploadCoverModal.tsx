import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw,
  FileCheck,
  Eye,
  Camera,
  Layers
} from 'lucide-react';
import { AcademyBook } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { uploadAndReplaceBookCover } from '../services/booksService';

interface UploadCoverModalProps {
  book: AcademyBook | null;
  isOpen: boolean;
  onClose: () => void;
  onCoverUpdated: (bookId: string, newCoverUrl: string, updatedBook?: AcademyBook) => void;
}

export const UploadCoverModal: React.FC<UploadCoverModalProps> = ({
  book,
  isOpen,
  onClose,
  onCoverUpdated,
}) => {
  const { isRtl } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: string; type: string } | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setFileDetails(null);
      setErrorMessage(null);
      setSuccessMessage(null);
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [isOpen, book]);

  if (!isOpen || !book) return null;

  const handleFileSelected = (file: File) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validate type: JPG, JPEG, PNG, WEBP
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedMimes.includes(file.type.toLowerCase())) {
      setErrorMessage(
        isRtl
          ? 'صيغة الملف غير مدعومة. يرجى اختيار صورة بصيغة JPG أو JPEG أو PNG أو WebP.'
          : 'Unsupported format. Please select a JPG, JPEG, PNG, or WebP image.'
      );
      return;
    }

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage(
        isRtl
          ? 'حجم الصورة كبير جداً (أكثر من 15 ميغابايت). يرجى اختيار ملف أصغر حجماً.'
          : 'File too large (exceeds 15MB). Please choose a smaller file.'
      );
      return;
    }

    setSelectedFile(file);

    // Format size
    const sizeStr =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${(file.size / 1024).toFixed(1)} KB`;

    setFileDetails({
      name: file.name,
      size: sizeStr,
      type: file.type.replace('image/', '').toUpperCase(),
    });

    // Create local object URL for instant preview before saving
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelected(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelected(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile || !book) return;

    setIsUploading(true);
    setUploadProgress(15);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await uploadAndReplaceBookCover(book.id, selectedFile, (percent) => {
        setUploadProgress(percent);
      });

      setIsUploading(false);

      if (res.success && res.coverImage) {
        setSuccessMessage(
          isRtl
            ? 'تم حفظ واستبدال غلاف الكتاب بنجاح على الخادم!'
            : 'Book cover updated and saved permanently!'
        );
        onCoverUpdated(book.id, res.coverImage, res.book);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setErrorMessage(res.message || 'حدث خطأ أثناء رفع الصورة.');
      }
    } catch (err: any) {
      setIsUploading(false);
      setErrorMessage(err.message || 'فشل الاتصال بالخادم.');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#0D131F] rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-10 my-8 text-start"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/60">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <Camera className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-zinc-950 dark:text-white">
                  {isRtl ? 'استبدال ورفع غلاف الكتاب' : 'Upload & Replace Book Cover'}
                </h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-bold block">
                  {book.titleAr || book.title} • {book.level}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Notifications */}
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Side-by-Side Comparison: Current Cover vs New Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              
              {/* Box 1: Current Saved Cover */}
              <div className="flex flex-col items-center space-y-2 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-extrabold text-zinc-500 dark:text-zinc-400">
                  {isRtl ? 'الغلاف الحالي المحفوظ' : 'Current Saved Cover'}
                </span>
                <div className="w-36 aspect-[1/1.41] rounded-xl overflow-hidden border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-950 shadow-md">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] text-zinc-400 truncate max-w-[150px]">
                  {book.coverImage.split('/').pop()}
                </span>
              </div>

              {/* Box 2: New Cover Preview */}
              <div className="flex flex-col items-center space-y-2 p-4 rounded-2xl bg-amber-500/5 border-2 border-dashed border-amber-500/30">
                <span className="text-xs font-black text-amber-700 dark:text-amber-400 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'معاينة الغلاف الجديد' : 'New Cover Preview'}</span>
                </span>
                
                <div className="w-36 aspect-[1/1.41] rounded-xl overflow-hidden border-2 border-amber-400 bg-zinc-950 shadow-lg flex items-center justify-center relative">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="New cover preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-3 text-zinc-400">
                      <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-40 text-amber-500" />
                      <span className="text-[11px] block font-semibold leading-tight">
                        {isRtl ? 'لم تختر صورة بعد' : 'No image chosen yet'}
                      </span>
                    </div>
                  )}
                </div>

                {fileDetails ? (
                  <div className="text-[10px] font-mono text-zinc-600 dark:text-zinc-300 text-center">
                    <span className="font-bold text-amber-600 dark:text-amber-400 block truncate max-w-[160px]">
                      {fileDetails.name}
                    </span>
                    <span>{fileDetails.size} • {fileDetails.type}</span>
                  </div>
                ) : (
                  <span className="text-[10px] text-zinc-400">
                    {isRtl ? 'اختر ملف من جهازك أدناه' : 'Select a file below'}
                  </span>
                )}
              </div>

            </div>

            {/* Drop Zone / File Picker */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className="p-6 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-amber-400 dark:hover:border-amber-400 transition-colors bg-zinc-50 dark:bg-zinc-900/40 flex flex-col items-center justify-center text-center cursor-pointer group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleInputChange}
                className="hidden"
              />

              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>

              <span className="text-sm font-black text-zinc-900 dark:text-white">
                {isRtl ? 'انقر لاختيار صورة الغلاف أو اسحبها إلى هنا' : 'Click to choose cover photo or drag & drop here'}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {isRtl ? 'الصيغ المدعومة: JPG, PNG, WebP (حتى 15 ميجابايت)' : 'Supported: JPG, PNG, WebP (up to 15MB)'}
              </span>
            </div>

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-600 dark:text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
                    <span>{isRtl ? 'جارٍ رفع الصورة ومعالجتها...' : 'Uploading & processing image...'}</span>
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              {isRtl ? 'إلغاء' : 'Cancel'}
            </button>

            <button
              type="button"
              onClick={handleConfirmUpload}
              disabled={!selectedFile || isUploading}
              className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-black text-xs transition-all shadow-md shadow-amber-400/25 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{isRtl ? 'جارٍ الحفظ الدائم...' : 'Saving...'}</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  <span>{isRtl ? 'تأكيد وحفظ الغلاف الجديد' : 'Confirm & Save Cover'}</span>
                </>
              )}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
