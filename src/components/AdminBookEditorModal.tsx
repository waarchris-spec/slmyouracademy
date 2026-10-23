import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { AcademyBook } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  uploadBookCoverImage,
  createBookOnServer,
  updateBookOnServer,
} from '../services/booksService';

interface AdminBookEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (book: AcademyBook) => void;
  initialBook?: AcademyBook | null;
}

export const AdminBookEditorModal: React.FC<AdminBookEditorModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  initialBook,
}) => {
  const { isRtl } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [badge, setBadge] = useState('');
  const [edition, setEdition] = useState('');
  const [pages, setPages] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeatureText, setNewFeatureText] = useState('');

  // Upload & Save State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialBook) {
      setTitle(initialBook.title || '');
      setTitleAr(initialBook.titleAr || '');
      setLevel(initialBook.level || '');
      setCategory(initialBook.category || '');
      setBadge(initialBook.badge || '');
      setEdition(initialBook.edition || 'طبعة 2026 / 2027 المعتمدة');
      setPages(initialBook.pages || '128 صفحة');
      setTargetAudience(initialBook.targetAudience || '');
      setDescription(initialBook.description || '');
      setCoverImage(initialBook.coverImage || '');
      setPreviewUrl(initialBook.coverImage || '');
      setIsVisible(initialBook.isVisible !== false);
      setFeatures(initialBook.features ? [...initialBook.features] : []);
    } else {
      // Default new book template
      setTitle('New Academy Book');
      setTitleAr('كتاب أكاديمي جديد');
      setLevel('المستوى A1 • Starter');
      setCategory('اللغة الإنجليزية / English Track');
      setBadge('منهاج رسمي');
      setEdition('طبعة 2026 / 2027');
      setPages('120 صفحة');
      setTargetAudience('الطلاب والمتعلمين');
      setDescription('وصف شامل للمنهاج التعليمي والمهارات المكتسبة...');
      setCoverImage('/assets/books/book-a1-starter.svg');
      setPreviewUrl('/assets/books/book-a1-starter.svg');
      setIsVisible(true);
      setFeatures(['محادثات تفاعلية حية', 'متابعة فردية وتمارين تطبيقية']);
    }
    setSelectedFile(null);
    setUploadProgress(0);
    setStatusMessage(null);
  }, [initialBook, isOpen]);

  if (!isOpen) return null;

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!validMimes.includes(file.type)) {
      setStatusMessage({
        type: 'error',
        text: 'الصيغة غير مدعومة. يرجى اختيار صورة بصيغة JPG أو PNG أو WEBP أو SVG.',
      });
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setStatusMessage({
        type: 'error',
        text: 'حجم الصورة يتجاوز 10 ميغابايت. يرجى اختيار ملف أصغر حجماً.',
      });
      return;
    }

    setSelectedFile(file);
    setStatusMessage(null);

    // Create instant local preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  // Upload chosen file to server
  const handlePerformUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadProgress(10);
    setStatusMessage(null);

    try {
      const res = await uploadBookCoverImage(selectedFile, (percent) => {
        setUploadProgress(percent);
      });

      setIsUploading(false);
      if (res.success && res.url) {
        setCoverImage(res.url);
        setPreviewUrl(res.url);
        setSelectedFile(null);
        setStatusMessage({
          type: 'success',
          text: 'تم رفع صورة الغلاف بنجاح وحفظها على الخادم!',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: res.message || 'فشل رفع الصورة.',
        });
      }
    } catch (err: any) {
      setIsUploading(false);
      setStatusMessage({
        type: 'error',
        text: 'حدث خطأ أثناء الاتصال بالخادم لرفع الصورة.',
      });
    }
  };

  // Add feature bullet point
  const handleAddFeature = () => {
    if (newFeatureText.trim()) {
      setFeatures([...features, newFeatureText.trim()]);
      setNewFeatureText('');
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() && !titleAr.trim()) {
      setStatusMessage({ type: 'error', text: 'يرجى إدخال عنوان الكتاب.' });
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    try {
      // If a file was selected but not uploaded yet, upload it first
      let finalCoverImage = coverImage;
      if (selectedFile) {
        setIsUploading(true);
        const uploadRes = await uploadBookCoverImage(selectedFile, (p) => setUploadProgress(p));
        setIsUploading(false);
        if (uploadRes.success && uploadRes.url) {
          finalCoverImage = uploadRes.url;
        }
      }

      const payload: Partial<AcademyBook> = {
        title: title.trim(),
        titleAr: titleAr.trim() || title.trim(),
        level: level.trim(),
        category: category.trim(),
        badge: badge.trim(),
        edition: edition.trim(),
        pages: pages.trim(),
        targetAudience: targetAudience.trim(),
        description: description.trim(),
        descriptionAr: description.trim(),
        coverImage: finalCoverImage || '/assets/books/book-a1-starter.svg',
        isVisible,
        features,
      };

      let savedBook: AcademyBook;
      if (initialBook && initialBook.id) {
        savedBook = await updateBookOnServer(initialBook.id, payload);
      } else {
        savedBook = await createBookOnServer(payload);
      }

      setIsSaving(false);
      onSaved(savedBook);
      onClose();
    } catch (err: any) {
      setIsSaving(false);
      setStatusMessage({
        type: 'error',
        text: err.message || 'فشل حفظ التعديلات. تحقق من الاتصال بالخادم.',
      });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
          className="relative w-full max-w-3xl bg-white dark:bg-[#0D131F] rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-10 my-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-black text-zinc-950 dark:text-white">
                  {initialBook
                    ? (isRtl ? 'تعديل بطاقة الكتاب / المنهاج' : 'Edit Book Card')
                    : (isRtl ? 'إضافة كتاب جديد للأكاديمية' : 'Add New Book Card')}
                </h3>
                <p className="text-xs text-zinc-500">
                  {isRtl ? 'إدارة الأغلفة والبيانات البيداغوجية وحفظها على الخادم' : 'Manage cover images & book syllabus'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 text-start">
            
            {/* Status alerts */}
            {statusMessage && (
              <div
                className={`p-3.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            {/* TOP ROW: Real Cover Image Upload & Live Preview */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-4">
              <label className="block text-xs font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center justify-between">
                <span>{isRtl ? 'صورة غلاف الكتاب (Book Cover Image):' : 'Book Cover Image:'}</span>
                <span className="text-[11px] font-normal text-zinc-500">
                  {isRtl ? 'أقصى حجم: 10 ميغابايت • الصيغ: JPG, PNG, WEBP, SVG' : 'Max: 10MB • JPG, PNG, WEBP, SVG'}
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                {/* Visual Preview */}
                <div className="sm:col-span-4 flex flex-col items-center justify-center">
                  <div className="relative group w-32 h-44 rounded-xl overflow-hidden shadow-md border-2 border-amber-400/30 bg-zinc-900 flex items-center justify-center">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-zinc-600" />
                    )}

                    {/* Progress overlay */}
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-2 text-center text-white">
                        <Loader2 className="w-6 h-6 animate-spin text-amber-400 mb-1" />
                        <span className="text-[10px] font-bold">{uploadProgress}%</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-1 font-mono">
                    {isRtl ? 'معاينة الغلاف' : 'Cover Preview'}
                  </span>
                </div>

                {/* Upload Action & File Selection */}
                <div className="sm:col-span-8 space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>
                        {previewUrl
                          ? (isRtl ? 'استبدال صورة الغلاف' : 'Replace Cover Image')
                          : (isRtl ? 'رفع صورة الغلاف' : 'Upload Cover Image')}
                      </span>
                    </button>

                    {selectedFile && !isUploading && (
                      <button
                        type="button"
                        onClick={handlePerformUpload}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>{isRtl ? 'حفظ الصورة على السيرفر الآن' : 'Save Image to Server'}</span>
                      </button>
                    )}
                  </div>

                  {selectedFile && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                      {isRtl ? 'تم تحديد ملف جديد:' : 'Selected:'} {selectedFile.name} (
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  )}

                  {/* Progress bar */}
                  {isUploading && (
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-500 h-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}

                  {/* Image URL Manual Override */}
                  <div>
                    <label className="block text-[11px] text-zinc-500 dark:text-zinc-400 mb-1">
                      {isRtl ? 'أو أدخل مسار / رابط الصورة مباشرة:' : 'Or direct Image URL / Path:'}
                    </label>
                    <input
                      type="text"
                      value={coverImage}
                      onChange={(e) => {
                        setCoverImage(e.target.value);
                        setPreviewUrl(e.target.value);
                      }}
                      placeholder="/assets/books/... or https://..."
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-xs font-mono text-zinc-900 dark:text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Book Details Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {isRtl ? 'عنوان الكتاب بالعربية:' : 'Arabic Title:'}
                </label>
                <input
                  type="text"
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  placeholder="مثال: Your English Starter — المستوى A1"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {isRtl ? 'عنوان الكتاب بالإنجليزية / الأصلي:' : 'English / Original Title:'}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Your English Starter (A1)"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {isRtl ? 'المستوى التعليمي / الطور:' : 'Educational Level:'}
                </label>
                <input
                  type="text"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  placeholder="مثال: المستوى A1 • Starter أو شهادة البكالوريا"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {isRtl ? 'التصنيف / المسار:' : 'Category:'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="اللغة الإنجليزية / English Track">اللغة الإنجليزية / English Track</option>
                  <option value="اللغة الفرنسية / French Track">اللغة الفرنسية / French Track</option>
                  <option value="اللغة الإسبانية / Spanish Track">اللغة الإسبانية / Spanish Track</option>
                  <option value="اللغة الألمانية / German Track">اللغة الألمانية / German Track</option>
                  <option value="اللغات الحية / Modern Languages">اللغات الحية / Modern Languages</option>
                  <option value="اللغة الإنجليزية والدعم المدرسي">اللغة الإنجليزية والدعم المدرسي</option>
                  <option value="الدعم المدرسي والأقسام النهائية">الدعم المدرسي والأقسام النهائية</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {isRtl ? 'شارة تمييزية (Badge):' : 'Badge Tag:'}
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="مثال: الأكثر طلباً، خاص بالبكالوريا BAC"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  {isRtl ? 'الطبعة وعدد الصفحات:' : 'Edition & Pages:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                    placeholder="طبعة 2026 / 2027"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                  />
                  <input
                    type="text"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    placeholder="128 صفحة"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                {isRtl ? 'الفئة المستهدفة:' : 'Target Audience:'}
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="مثال: المبتدئين، طلبة البكالوريا، الراغبين في الهجرة"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                {isRtl ? 'نبذة عن المنهاج ومحتوى الكتاب:' : 'Description:'}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="تفاصيل الكتاب، المهارات المكتسبة، المنهجية..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Syllabus Features List */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {isRtl ? 'محاور ونقاط المنهاج (Syllabus Bullets):' : 'Key Syllabus Bullets:'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeatureText}
                  onChange={(e) => setNewFeatureText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  placeholder={isRtl ? 'أدخل نقطة أو محور تعليمي واضغط إضافة...' : 'Add a highlight...'}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-3.5 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 hover:bg-amber-400 hover:text-black text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isRtl ? 'إضافة' : 'Add'}</span>
                </button>
              </div>

              {features.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-zinc-400 hover:text-red-500 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Visibility Toggle */}
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {isVisible ? (
                  <Eye className="w-5 h-5 text-emerald-500" />
                ) : (
                  <EyeOff className="w-5 h-5 text-zinc-400" />
                )}
                <div>
                  <span className="text-xs font-black text-zinc-900 dark:text-white block">
                    {isVisible
                      ? (isRtl ? 'ظاهر للجمهور في الموقع' : 'Visible to Public')
                      : (isRtl ? 'مخفي / مسودة مؤقتة' : 'Hidden Draft')}
                  </span>
                  <span className="text-[11px] text-zinc-500">
                    {isRtl ? 'التحكم في ظهور بطاقة الكتاب لزوار الموقع' : 'Control public visibility'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  isVisible
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                    : 'bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {isVisible ? (isRtl ? 'مفعل (ظاهر)' : 'Active') : (isRtl ? 'تعطيل (مخفي)' : 'Disabled')}
              </button>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSaving || isUploading}
                className="flex-1 py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-sm transition-all shadow-md shadow-amber-400/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{isRtl ? 'جاري الحفظ على الخادم...' : 'Saving to Server...'}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>{isRtl ? 'حفظ ونشر التعديلات' : 'Save & Publish Changes'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="py-3 px-6 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold text-sm transition-colors cursor-pointer"
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
