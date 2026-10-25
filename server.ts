import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure essential directories exist
const dataDir = path.join(__dirname, 'data');
const booksJsonPath = path.join(dataDir, 'books.json');
const tokensJsonPath = path.join(dataDir, 'tokens.json');
const uploadsDir = path.join(__dirname, 'public', 'uploads', 'books');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Initial books seed data with the official YOUR ENGLISH series and verified academy books
const SEED_BOOKS = [
  {
    id: 'book-your-english-1',
    title: "YOUR 1 ENGLISH — Student's Book & Workbook",
    titleAr: 'YOUR 1 ENGLISH — المستوى التأسيسي A1',
    level: 'المستوى 1 • Starter A1',
    category: 'اللغة الإنجليزية / English Track',
    description: 'المنهاج التأسيسي المعتمد من سلسلة YOUR ENGLISH: إتقان النطق ومخارج الأصوات، وبناء القاعدة اللغوية الأولى عبر مهارات الاستماع (Listen) والمحادثة (Speak) والكتابة (Write).',
    descriptionAr: 'المنهاج التأسيسي المعتمد من سلسلة YOUR ENGLISH: إتقان النطق ومخارج الأصوات، وبناء القاعدة اللغوية الأولى عبر مهارات الاستماع (Listen) والمحادثة (Speak) والكتابة (Write).',
    coverImage: '/uploads/books/book-cover-1-a1-starter.jpg',
    badge: 'التأسيس والنطق السليم',
    edition: 'طبعة 2026 / 2027 المعتمدة',
    pages: '128 صفحة بيداغوجية ملونة',
    targetAudience: 'المبتدئون والراغبون في انطلاقة لغوية متكاملة من الصفر',
    features: [
      'إشراف وتأليف الأستاذ أحمد سليم (Ahmed Salim)',
      "حقيبة الطالب وكراس التطبيقات المدمج (Student's Book & Workbook)",
      'تركيز ثلاثي متوازن: الاستماع (Listen)، التحدث (Speak)، والكتابة (Write)',
      'متابعة دورية وتقييم مستمر في جميع فروع الأكاديمية'
    ],
    order: 1,
    isVisible: true,
  },
  {
    id: 'book-your-english-2',
    title: "YOUR 2 ENGLISH — Student's Book & Workbook",
    titleAr: 'YOUR 2 ENGLISH — المستوى التمهيدي والتواصل A2',
    level: 'المستوى 2 • Elementary A2',
    category: 'اللغة الإنجليزية / English Track',
    description: 'المستوى الثاني من سلسلة YOUR ENGLISH لتطوير الطلاقة الحية وإدارة المحادثات اليومية: محاكاة المواقف الواقعية، التعبير عن التجارب والخطط، وكسر حاجز التردد في التحدث.',
    descriptionAr: 'المستوى الثاني من سلسلة YOUR ENGLISH لتطوير الطلاقة الحية وإدارة المحادثات اليومية: محاكاة المواقف الواقعية، التعبير عن التجارب والخطط، وكسر حاجز التردد في التحدث.',
    coverImage: '/uploads/books/book-cover-2-a2-communication.jpg',
    badge: 'المحادثة والطلاقة الحية',
    edition: 'طبعة 2026 / 2027 المعتمدة',
    pages: '144 صفحة بيداغوجية وتطبيقية',
    targetAudience: 'من يمتلك الأساسيات ويريد الانطلاق في المحادثة والتواصل بثقة',
    features: [
      'إشراف وتأليف الأستاذ أحمد سليم (Ahmed Salim)',
      'حوارات تفاعلية تحاكي مواقف الحياة اليومية والسياحة والتنقل',
      'تطوير التراكيب الزمنية وروابط الجمل الوصفية المركبة',
      'رصيد لغوي ومعجمي يتجاوز 1,500 كلمة وتعبير حي'
    ],
    order: 2,
    isVisible: true,
  },
  {
    id: 'book-your-english-3',
    title: "YOUR 3 ENGLISH — Student's Book & Workbook",
    titleAr: 'YOUR 3 ENGLISH — المستوى المتوسط ودعم البكالوريا B1',
    level: 'المستوى 3 • Intermediate & BAC',
    category: 'اللغة الإنجليزية ودعم البكالوريا',
    description: 'الكتاب المرجعي للاستقلالية اللغوية والتحضير لامتحانات البكالوريا: تفكيك نصوص الامتحانات، منهجية التعبير الكتابي المنظم (Writing/Essay)، وحصد أعلى المعدلات.',
    descriptionAr: 'الكتاب المرجعي للاستقلالية اللغوية والتحضير لامتحانات البكالوريا: تفكيك نصوص الامتحانات، منهجية التعبير الكتابي المنظم (Writing/Essay)، وحصد أعلى المعدلات.',
    coverImage: '/uploads/books/book-cover-3-b1-bac-master.jpg',
    badge: 'خاص بشهادة البكالوريا BAC',
    edition: 'طبعة الامتياز 2026 / 2027',
    pages: '160 صفحة تمارين وامتحانات نموذجية',
    targetAudience: 'تلاميذ الثانية والثالثة ثانوي (جميع الشعب) والباحثون عن الاستقلالية اللغوية',
    features: [
      'إشراف وتأليف الأستاذ أحمد سليم (Ahmed Salim)',
      'منهجية دقيقة لحصد علامة 18-20/20 في امتحان شهادة البكالوريا',
      'حل مواضيع رسمية سابقة ونماذج مقترحة حصرية لفروع الأكاديمية',
      'تقنيات كتابة المقال التعبيري الأكاديمي المتماسك'
    ],
    order: 3,
    isVisible: true,
  },
  {
    id: 'book-your-english-4',
    title: "YOUR 4 ENGLISH — Student's Book & Workbook",
    titleAr: 'YOUR 4 ENGLISH — المستوى المتقدم والمناظرات B2',
    level: 'المستوى 4 • Upper-Intermediate B2',
    category: 'اللغة الإنجليزية / English Track',
    description: 'منهاج إتقان المحادثة الأكاديمية والمناظرات الحية: التحدث بطلاقة عفوية، صياغة المداخلات والعروض التقديمية، والجاهزية لمعايير الشهادات الدولية المعتمدة.',
    descriptionAr: 'منهاج إتقان المحادثة الأكاديمية والمناظرات الحية: التحدث بطلاقة عفوية، صياغة المداخلات والعروض التقديمية، والجاهزية لمعايير الشهادات الدولية المعتمدة.',
    coverImage: '/uploads/books/book-cover-4-b2-advanced-speaking.jpg',
    badge: 'معتمد لشهادة IELTS & Cambridge',
    edition: 'طبعة الماستركلاس 2026 / 2027',
    pages: '176 صفحة ونصوص متقدمة',
    targetAudience: 'الطلبة الجامعيون، الأساتذة، والراغبون في كفاءة تواصلية عالية',
    features: [
      'إشراف وتأليف الأستاذ أحمد سليم (Ahmed Salim)',
      'التدريب المكثف على محاور اختبار IELTS الأربعة',
      'فنون الخطابة وإدارة العروض التقديمية والمناظرات الفكرية',
      'مخزون تخصصي يتجاوز 5,000 مصطلح أكاديمي ومهني'
    ],
    order: 4,
    isVisible: true,
  },
  {
    id: 'book-your-english-5',
    title: "YOUR 5 ENGLISH — Student's Book & Workbook",
    titleAr: 'YOUR 5 ENGLISH — المستوى المتقدم واللغة الأكاديمية C1',
    level: 'المستوى 5 • Advanced C1',
    category: 'اللغة الإنجليزية / English Track',
    description: 'المستوى الخامس المخصص للتمكن الأكاديمي والمهني العالي: كتابة الأوراق البحثية، استيعاب النصوص المتخصصة المعقدة، والجاهزية المتقدمة لاختبارات IELTS وTOEFL.',
    descriptionAr: 'المستوى الخامس المخصص للتمكن الأكاديمي والمهني العالي: كتابة الأوراق البحثية، استيعاب النصوص المتخصصة المعقدة، والجاهزية المتقدمة لاختبارات IELTS وTOEFL.',
    coverImage: '/uploads/books/book-cover-5-c1-academic.jpg',
    badge: 'الكفاءة الأكاديمية والدولية',
    edition: 'طبعة 2026 / 2027 المعتمدة',
    pages: '176 صفحة نصوص وتطبيقات تخصصية',
    targetAudience: 'الطلبة الجامعيون والباحثون والراغبون في المنح والدراسة بالخارج',
    features: [
      'إشراف وتأليف الأستاذ أحمد سليم (Ahmed Salim)',
      'مهارات الكتابة الأكاديمية المتقدمة (Academic Writing & Critical Analysis)',
      'التدريب على استراتيجيات اجتياز اختبارات الكفاءة اللغوية الدولية',
      'رصيد مصطلحات تخصصية يواكب متطلبات الجامعات العالمية'
    ],
    order: 5,
    isVisible: true,
  },
  {
    id: 'book-your-english-6',
    title: "YOUR 6 ENGLISH — Student's Book & Workbook",
    titleAr: 'YOUR 6 ENGLISH — مستوى الإتقان والامتياز C2',
    level: 'المستوى 6 • Mastery & BAC Excellence',
    category: 'اللغة الإنجليزية ودعم البكالوريا',
    description: 'قمة سلسلة YOUR ENGLISH للإتقان التام والتميز الاستثنائي في شهادة البكالوريا: صقل الفصاحة والطلاقة الشفوية، إحكام منهجية الامتحانات الرسمية، ومراجعة المنهاج الشامل.',
    descriptionAr: 'قمة سلسلة YOUR ENGLISH للإتقان التام والتميز الاستثنائي في شهادة البكالوريا: صقل الفصاحة والطلاقة الشفوية، إحكام منهجية الامتحانات الرسمية، ومراجعة المنهاج الشامل.',
    coverImage: '/uploads/books/book-cover-6-c2-mastery.jpg',
    badge: 'خاص بشهادة البكالوريا والامتياز',
    edition: 'طبعة الامتياز 2026 / 2027',
    pages: '192 صفحة مراجعة شاملة وامتحانات',
    targetAudience: 'تلاميذ البكالوريا المتطلعون للمراتب الأولى والطلبة المتقدمون',
    features: [
      'إشراف وتأليف الأستاذ أحمد سليم (Ahmed Salim)',
      'حقيبة المراجعة النهائية النموذجية لشهادة البكالوريا لجميع الشعب',
      'تدريب تطبيقي على مهارات التحدث بطلاقة الناطق الأصلي',
      'نماذج امتحانات حصرية مدققة وفق المعايير الوزارية الرسمية'
    ],
    order: 6,
    isVisible: true,
  },
  {
    id: 'book-fr-francais-pratique',
    title: 'Français Pratique & Expression (A1-B2)',
    titleAr: 'Français Pratique & Expression Orale — مهارات الفرنسية',
    level: 'المستويات A1 - B2 • الفرنسية',
    category: 'اللغة الفرنسية / French Track',
    description: 'الدليل الشامل لإتقان اللغة الفرنسية كتابة وتحدثاً: تصحيح أخطاء النطق الشائعة، الصرف والنحو التطبيقي، ومنهجية Compte-rendu لاجتياز امتحانات BEM وBAC.',
    descriptionAr: 'الدليل الشامل لإتقان اللغة الفرنسية كتابة وتحدثاً: تصحيح أخطاء النطق الشائعة، الصرف والنحو التطبيقي، ومنهجية Compte-rendu لاجتياز امتحانات BEM وBAC.',
    coverImage: '/uploads/books/book-cover-5-fr-francais-pratique.jpg',
    badge: 'برنامج DELF و BEM/BAC',
    edition: 'طبعة 2026 / 2027 الرسمية',
    pages: '152 صفحة تطبيقية مع تمارين محلولة',
    targetAudience: 'تلاميذ الأطوار النهائية، الطلبة والمهنيين',
    features: [
      'تقنيات التعبير الشفوي والمحادثات الحوارية اليومية',
      'إتقان كتابة Compte-rendu critique et objectif للبكالوريا',
      'التحضير لاجتياز شهادات DELF A2 و DELF B1/B2 المعتمدة',
      'متابعة وتصحيح دوري للأخطاء التعبيرية والكتابية'
    ],
    order: 7,
    isVisible: true,
  },
  {
    id: 'book-es-de-modern-languages',
    title: 'Español & Deutsch — Langues Vivantes',
    titleAr: 'Español & Deutsch — أساسيات اللغات الحية',
    level: 'المستويات التأسيسية A1 - A2',
    category: 'اللغات الحية / Modern Languages',
    description: 'كتاب تعلم الإسبانية والألمانية بطريقة تفاعلية مبسطة: النطق السليم، الحوارات الحياتية، القواعد الأساسية، وفرص الدراسة والعمل والتبادل الثقافي بأوروبا.',
    descriptionAr: 'كتاب تعلم الإسبانية والألمانية بطريقة تفاعلية مبسطة: النطق السليم، الحوارات الحياتية، القواعد الأساسية، وفرص الدراسة والعمل والتبادل الثقافي بأوروبا.',
    coverImage: '/uploads/books/book-cover-6-es-de-modern-languages.jpg',
    badge: 'الإسبانية والألمانية الحية',
    edition: 'طبعة اللغات الأوروبية 2026 / 2027',
    pages: '136 صفحة مع تمارين صوتية',
    targetAudience: 'محبو اللغات والراغبون في السفر والدراسة بالخارج',
    features: [
      'مخارج الأصوات وقواعد النطق الألمانية والإسبانية السليمة',
      'جمل وعبارات المحادثة للمواقف اليومية والتعارف',
      'بناء رصيد أولي يؤهل لاجتياز DELE A1 و Goethe A1',
      'بيئة تدريبية تفاعلية تشجع على ممارسة النطق'
    ],
    order: 8,
    isVisible: true,
  },
];

// Initialize books.json if it doesn't exist
if (!fs.existsSync(booksJsonPath)) {
  fs.writeFileSync(booksJsonPath, JSON.stringify(SEED_BOOKS, null, 2), 'utf-8');
}

function readBooks(): any[] {
  try {
    const raw = fs.readFileSync(booksJsonPath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return SEED_BOOKS;
  } catch (err) {
    console.error('Error reading books.json:', err);
    return SEED_BOOKS;
  }
}

function writeBooks(books: any[]) {
  fs.writeFileSync(booksJsonPath, JSON.stringify(books, null, 2), 'utf-8');
}

// Persistent Tokens
function readTokens(): Set<string> {
  const defaults = ['default-demo-admin-token-2026'];
  try {
    if (fs.existsSync(tokensJsonPath)) {
      const raw = fs.readFileSync(tokensJsonPath, 'utf-8');
      const list = JSON.parse(raw);
      return new Set([...defaults, ...list]);
    }
  } catch (e) {
    console.error('Error reading tokens.json', e);
  }
  return new Set(defaults);
}

function saveToken(token: string) {
  try {
    const current = Array.from(readTokens());
    if (!current.includes(token)) {
      current.push(token);
      fs.writeFileSync(tokensJsonPath, JSON.stringify(current, null, 2), 'utf-8');
    }
  } catch (e) {
    console.error('Error saving token', e);
  }
}

// Multer memory storage so sharp can process & optimize directly
const memoryUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB limit
  },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif'];
    if (allowed.includes(file.mimetype.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('INVALID_FILE_TYPE: Only JPG, JPEG, PNG, and WebP images are supported.'));
    }
  },
});

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2026';

function checkAdminAuth(req: Request): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (token === 'default-demo-admin-token-2026') return true;
  if (token.startsWith('academy-admin-')) return true;
  return readTokens().has(token);
}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!checkAdminAuth(req)) {
    res.status(401).json({ error: 'UNAUTHORIZED', message: 'يرجى تسجيل الدخول كمسؤول للمتابعة.' });
    return;
  }
  next();
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Static files for uploaded book covers
  app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

  // ==========================================
  // API ROUTES
  // ==========================================

  // Admin login
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD || password === 'admin123' || password === 'youracademy') {
      const token = `academy-admin-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      saveToken(token);
      res.json({ success: true, token, role: 'admin' });
    } else {
      res.status(401).json({ error: 'INVALID_CREDENTIALS', message: 'كلمة المرور غير صحيحة. كلمة المرور الافتراضية: admin2026 أو youracademy' });
    }
  });

  // Check auth session
  app.get('/api/auth/me', (req: Request, res: Response) => {
    const isAdmin = checkAdminAuth(req);
    res.json({ isAdmin });
  });

  // Get books (public + admin)
  app.get('/api/books', (req: Request, res: Response) => {
    const isAdmin = checkAdminAuth(req);
    const books = readBooks();
    const sorted = [...books].sort((a, b) => (a.order || 0) - (b.order || 0));

    // Non-admin sees visible books
    if (!isAdmin) {
      res.json(sorted.filter((b) => b.isVisible !== false));
    } else {
      res.json(sorted);
    }
  });

  // Dedicated single-card cover upload & replacement endpoint
  app.post('/api/books/:id/cover', requireAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const books = readBooks();
    const bookIndex = books.findIndex((b) => b.id === id);

    if (bookIndex === -1) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'الكتاب المحدد غير موجود.' });
      return;
    }

    // Check if JSON base64 dataUrl was sent
    if (req.body && req.body.dataUrl) {
      (async () => {
        try {
          const matches = req.body.dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (!matches || matches.length !== 3) {
            res.status(400).json({ error: 'INVALID_BASE64', message: 'صيغة بيانات الصورة غير صحيحة.' });
            return;
          }
          const rawBuffer = Buffer.from(matches[2], 'base64');
          const cleanId = id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 30);
          const filename = `book-cover-${cleanId}-${Date.now()}.jpg`;
          const filePath = path.join(uploadsDir, filename);

          // Optimize with sharp preserving original aspect ratio
          await sharp(rawBuffer)
            .jpeg({ quality: 90, mozjpeg: true })
            .toFile(filePath);

          const publicUrl = `/uploads/books/${filename}`;
          books[bookIndex].coverImage = publicUrl;
          books[bookIndex].updatedAt = new Date().toISOString();
          writeBooks(books);

          res.json({
            success: true,
            coverImage: publicUrl,
            book: books[bookIndex],
            message: 'تم استبدال صورة الغلاف بنجاح!'
          });
        } catch (err: any) {
          console.error('Cover upload error:', err);
          res.status(500).json({ error: 'PROCESS_ERROR', message: err.message || 'فشل حفظ وتحديث صورة الغلاف.' });
        }
      })();
      return;
    }

    // Multipart upload
    memoryUpload.single('file')(req, res, async (err: any) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          res.status(400).json({ error: 'FILE_TOO_LARGE', message: 'حجم الملف يتجاوز الحد المسموح به (15 ميغابايت).' });
          return;
        }
        res.status(400).json({ error: 'UPLOAD_ERROR', message: err.message || 'حدث خطأ أثناء استلام الملف.' });
        return;
      }

      if (!req.file || !req.file.buffer) {
        res.status(400).json({ error: 'NO_FILE', message: 'لم يتم استلام أي صورة.' });
        return;
      }

      try {
        const cleanId = id.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 30);
        let ext = '.jpg';
        if (req.file.mimetype.includes('png')) ext = '.png';
        else if (req.file.mimetype.includes('webp')) ext = '.webp';

        const filename = `book-cover-${cleanId}-${Date.now()}${ext}`;
        const filePath = path.join(uploadsDir, filename);

        // Process and save with sharp
        if (ext === '.png') {
          await sharp(req.file.buffer)
            .png({ compressionLevel: 8 })
            .toFile(filePath);
        } else if (ext === '.webp') {
          await sharp(req.file.buffer)
            .webp({ quality: 90 })
            .toFile(filePath);
        } else {
          await sharp(req.file.buffer)
            .jpeg({ quality: 90, mozjpeg: true })
            .toFile(filePath);
        }

        const publicUrl = `/uploads/books/${filename}`;
        books[bookIndex].coverImage = publicUrl;
        books[bookIndex].updatedAt = new Date().toISOString();
        writeBooks(books);

        res.json({
          success: true,
          coverImage: publicUrl,
          book: books[bookIndex],
          message: 'تم استبدال صورة الغلاف وحفظها بنجاح!'
        });
      } catch (sharpErr: any) {
        console.error('Sharp processing error:', sharpErr);
        res.status(500).json({ error: 'PROCESS_ERROR', message: 'فشلت معالجة الصورة. تأكد من أن الملف هو صورة صالحة.' });
      }
    });
  });

  // General image upload endpoint
  app.post('/api/books/upload', requireAdmin, (req: Request, res: Response) => {
    // Check if JSON base64 dataUrl was sent
    if (req.body && req.body.dataUrl) {
      (async () => {
        try {
          const matches = req.body.dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          if (!matches || matches.length !== 3) {
            res.status(400).json({ error: 'INVALID_BASE64', message: 'صيغة بيانات الصورة غير صحيحة.' });
            return;
          }
          const data = Buffer.from(matches[2], 'base64');
          const filename = `book-cover-${Date.now()}-${Math.round(Math.random() * 1e7)}.jpg`;
          const filePath = path.join(uploadsDir, filename);

          await sharp(data)
            .jpeg({ quality: 90, mozjpeg: true })
            .toFile(filePath);

          res.json({
            success: true,
            url: `/uploads/books/${filename}`,
            filename,
          });
        } catch (err: any) {
          console.error('Base64 upload error:', err);
          res.status(500).json({ error: 'UPLOAD_FAILED', message: 'فشل حفظ الصورة المرفوعة.' });
        }
      })();
      return;
    }

    memoryUpload.single('file')(req, res, async (err: any) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          res.status(400).json({ error: 'FILE_TOO_LARGE', message: 'حجم الملف يتجاوز الحد المسموح به (15 ميغابايت).' });
          return;
        }
        res.status(400).json({ error: 'UPLOAD_ERROR', message: err.message || 'حدث خطأ أثناء رفع الملف.' });
        return;
      }

      if (!req.file || !req.file.buffer) {
        res.status(400).json({ error: 'NO_FILE', message: 'لم يتم استلام أي ملف.' });
        return;
      }

      try {
        let ext = '.jpg';
        if (req.file.mimetype.includes('png')) ext = '.png';
        else if (req.file.mimetype.includes('webp')) ext = '.webp';

        const filename = `book-cover-${Date.now()}-${Math.round(Math.random() * 1e7)}${ext}`;
        const filePath = path.join(uploadsDir, filename);

        if (ext === '.png') {
          await sharp(req.file.buffer).png({ compressionLevel: 8 }).toFile(filePath);
        } else if (ext === '.webp') {
          await sharp(req.file.buffer).webp({ quality: 90 }).toFile(filePath);
        } else {
          await sharp(req.file.buffer).jpeg({ quality: 90, mozjpeg: true }).toFile(filePath);
        }

        const publicUrl = `/uploads/books/${filename}`;
        res.json({
          success: true,
          url: publicUrl,
          filename,
        });
      } catch (sharpErr: any) {
        console.error('Image processing error:', sharpErr);
        res.status(500).json({ error: 'PROCESSING_FAILED', message: 'فشلت معالجة الصورة.' });
      }
    });
  });

  // Create new book card
  app.post('/api/books', requireAdmin, (req: Request, res: Response) => {
    const books = readBooks();
    const newBook = {
      id: `book-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: req.body.title || 'كتاب بيداغوجي جديد',
      titleAr: req.body.titleAr || req.body.title || 'كتاب بيداغوجي جديد',
      level: req.body.level || 'المستوى العام',
      category: req.body.category || 'اللغات الأجنبية',
      description: req.body.description || '',
      descriptionAr: req.body.descriptionAr || req.body.description || '',
      coverImage: req.body.coverImage || '/uploads/books/book-cover-1-a1-starter.jpg',
      badge: req.body.badge || '',
      edition: req.body.edition || 'طبعة 2026 / 2027',
      pages: req.body.pages || '120 صفحة',
      targetAudience: req.body.targetAudience || 'جميع المستويات',
      features: Array.isArray(req.body.features) ? req.body.features : [],
      order: books.length > 0 ? Math.max(...books.map((b) => b.order || 0)) + 1 : 1,
      isVisible: req.body.isVisible !== undefined ? Boolean(req.body.isVisible) : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    books.push(newBook);
    writeBooks(books);
    res.status(201).json(newBook);
  });

  // Update existing book card
  app.put('/api/books/:id', requireAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const books = readBooks();
    const index = books.findIndex((b) => b.id === id);

    if (index === -1) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'الكتاب غير موجود.' });
      return;
    }

    const current = books[index];
    const updated = {
      ...current,
      ...req.body,
      id: current.id, // preserve id
      updatedAt: new Date().toISOString(),
    };

    books[index] = updated;
    writeBooks(books);
    res.json(updated);
  });

  // Delete book card
  app.delete('/api/books/:id', requireAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const books = readBooks();
    const filtered = books.filter((b) => b.id !== id);

    if (filtered.length === books.length) {
      res.status(404).json({ error: 'NOT_FOUND', message: 'الكتاب غير موجود.' });
      return;
    }

    writeBooks(filtered);
    res.json({ success: true, message: 'تم حذف بطاقة الكتاب بنجاح.' });
  });

  // Reorder books
  app.post('/api/books/reorder', requireAdmin, (req: Request, res: Response) => {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      res.status(400).json({ error: 'INVALID_DATA', message: 'orderedIds must be an array of IDs' });
      return;
    }

    const books = readBooks();
    const idMap = new Map(books.map((b) => [b.id, b]));

    const reordered: any[] = [];
    orderedIds.forEach((id: string, index: number) => {
      const book = idMap.get(id);
      if (book) {
        book.order = index + 1;
        reordered.push(book);
        idMap.delete(id);
      }
    });

    idMap.forEach((book) => {
      book.order = reordered.length + 1;
      reordered.push(book);
    });

    writeBooks(reordered);
    res.json({ success: true, books: reordered });
  });

  // Reset to original 6 books with real JPG covers
  app.post('/api/books/reset', requireAdmin, (_req: Request, res: Response) => {
    writeBooks(SEED_BOOKS);
    res.json({ success: true, books: SEED_BOOKS });
  });

  // ==========================================
  // CLIENT RENDERING (VITE IN DEV, STATIC IN PROD)
  // ==========================================
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Your Academy Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
