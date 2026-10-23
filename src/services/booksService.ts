import { AcademyBook } from '../types';
import { INITIAL_ACADEMY_BOOKS } from '../data/defaultBooks';

const TOKEN_KEY = 'your_academy_admin_token';

export const getAdminToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY) || 'default-demo-admin-token-2026';
  } catch {
    return 'default-demo-admin-token-2026';
  }
};

export const setAdminToken = (token: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (err) {
    console.error('Failed to save admin token:', err);
  }
};

export const clearAdminToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (err) {
    console.error('Failed to clear admin token:', err);
  }
};

export const checkAdminAuthStatus = async (): Promise<boolean> => {
  const token = getAdminToken();
  if (!token) return true; // Demo admin available
  try {
    const res = await fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) return true;
    const data = await res.json();
    return Boolean(data.isAdmin);
  } catch {
    return true;
  }
};

export const loginAdmin = async (password: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      setAdminToken(data.token);
      return { success: true };
    }
    return { success: false, message: data.message || 'كلمة المرور غير صحيحة.' };
  } catch (err: any) {
    return { success: false, message: 'تعذر الاتصال بالخادم. يرجى المحاولة لاحقاً.' };
  }
};

export const fetchAcademyBooks = async (): Promise<AcademyBook[]> => {
  const token = getAdminToken();
  try {
    const res = await fetch('/api/books', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return INITIAL_ACADEMY_BOOKS;
  } catch (err) {
    console.warn('Could not fetch books from API, falling back to initial data:', err);
    return INITIAL_ACADEMY_BOOKS;
  }
};

export interface UploadProgressCallback {
  (percentage: number): void;
}

/**
 * Dedicated single card cover upload & replacement.
 * Automatically saves image to persistent storage on server and updates books.json record.
 */
export const uploadAndReplaceBookCover = (
  bookId: string,
  file: File,
  onProgress?: UploadProgressCallback
): Promise<{ success: boolean; coverImage?: string; book?: AcademyBook; message?: string }> => {
  return new Promise((resolve) => {
    // Client-side pre-validation
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowed.includes(file.type.toLowerCase())) {
      resolve({
        success: false,
        message: 'نوع الملف غير مدعوم. الصيغ المسموحة هي: JPG, JPEG, PNG, WebP.',
      });
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      resolve({
        success: false,
        message: 'حجم الصورة يتجاوز الحد الأقصى المسموح به (15 ميغابايت).',
      });
      return;
    }

    let token = getAdminToken();
    if (!token) {
      token = 'default-demo-admin-token-2026';
      setAdminToken(token);
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    xhr.open('POST', `/api/books/${bookId}/cover`, true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && res.success) {
          resolve({
            success: true,
            coverImage: res.coverImage,
            book: res.book,
            message: res.message || 'تم حفظ واستبدال غلاف الكتاب بنجاح!',
          });
        } else {
          resolve({
            success: false,
            message: res.message || 'فشل تحديث غلاف الكتاب.',
          });
        }
      } catch (err) {
        resolve({
          success: false,
          message: 'استجابة غير صالحة من الخادم.',
        });
      }
    };

    xhr.onerror = () => {
      // Fallback: send base64 dataUrl if multipart was blocked by proxy
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const fetchRes = await fetch(`/api/books/${bookId}/cover`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ dataUrl: reader.result }),
          });
          const data = await fetchRes.json();
          if (fetchRes.ok && data.success) {
            resolve({
              success: true,
              coverImage: data.coverImage,
              book: data.book,
              message: 'تم حفظ الغلاف الجديد بنجاح!',
            });
            return;
          }
          resolve({
            success: false,
            message: data.message || 'تعذر حفظ الغلاف الجديد.',
          });
        } catch (fetchErr: any) {
          resolve({
            success: false,
            message: 'تعذر الاتصال بالخادم لحفظ الصورة.',
          });
        }
      };
      reader.readAsDataURL(file);
    };

    xhr.send(formData);
  });
};

export const uploadBookCoverImage = (
  file: File,
  onProgress?: UploadProgressCallback
): Promise<{ success: boolean; url: string; message?: string }> => {
  return new Promise((resolve) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      resolve({
        success: false,
        url: '',
        message: 'نوع الملف غير مدعوم. الصيغ المسموحة هي: JPG, JPEG, PNG, WebP.',
      });
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      resolve({
        success: false,
        url: '',
        message: 'حجم الصورة يتجاوز الحد الأقصى المسموح به (15 ميغابايت).',
      });
      return;
    }

    let token = getAdminToken();
    if (!token) {
      token = 'default-demo-admin-token-2026';
      setAdminToken(token);
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append('file', file);

    xhr.open('POST', '/api/books/upload', true);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      try {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && res.success) {
          resolve({ success: true, url: res.url });
        } else {
          resolve({
            success: false,
            url: '',
            message: res.message || 'فشل رفع الصورة على الخادم.',
          });
        }
      } catch (err) {
        resolve({
          success: false,
          url: '',
          message: 'استجابة غير صالحة من خادم الملفات.',
        });
      }
    };

    xhr.onerror = () => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const fetchRes = await fetch('/api/books/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ dataUrl: reader.result }),
          });
          const data = await fetchRes.json();
          if (fetchRes.ok && data.success) {
            resolve({ success: true, url: data.url });
            return;
          }
          resolve({ success: false, url: '', message: 'فشل رفع الصورة.' });
        } catch {
          resolve({ success: false, url: '', message: 'فشل الاتصال بالخادم.' });
        }
      };
      reader.readAsDataURL(file);
    };

    xhr.send(formData);
  });
};

export const createBookOnServer = async (
  bookData: Partial<AcademyBook>
): Promise<AcademyBook> => {
  const token = getAdminToken();
  const res = await fetch('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'فشل إضافة بطاقة الكتاب.');
  }
  return await res.json();
};

export const updateBookOnServer = async (
  id: string,
  bookData: Partial<AcademyBook>
): Promise<AcademyBook> => {
  const token = getAdminToken();
  const res = await fetch(`/api/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'فشل تحديث بيانات الكتاب.');
  }
  return await res.json();
};

export const deleteBookOnServer = async (id: string): Promise<boolean> => {
  const token = getAdminToken();
  const res = await fetch(`/api/books/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'فشل حذف الكتاب.');
  }
  return true;
};

export const reorderBooksOnServer = async (
  orderedIds: string[]
): Promise<AcademyBook[]> => {
  const token = getAdminToken();
  const res = await fetch('/api/books/reorder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderedIds }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'فشل حفظ ترتيب الكتب.');
  }
  const data = await res.json();
  return data.books;
};

export const resetBooksOnServer = async (): Promise<AcademyBook[]> => {
  const token = getAdminToken();
  const res = await fetch('/api/books/reset', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'فشل استعادة البيانات الافتراضية.');
  }
  const data = await res.json();
  return data.books;
};
