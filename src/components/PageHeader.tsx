import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  titleHighlight?: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  badgeIcon,
  title,
  titleHighlight,
  description,
  breadcrumbs,
  actions,
}) => {
  const { isRtl, language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-500/10 dark:via-zinc-950/40 dark:to-transparent border-b border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden text-start">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex-wrap"
        >
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{isAr ? 'الرئيسية' : 'Home'}</span>
          </Link>

          {breadcrumbs?.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {isRtl ? (
                <ChevronLeft className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              )}
              {crumb.href ? (
                <Link
                  to={crumb.href}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-amber-600 dark:text-amber-400 font-bold" aria-current="page">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-400 text-xs font-black">
            {badgeIcon || <Sparkles className="w-3.5 h-3.5" />}
            <span>{badge}</span>
          </div>
        )}

        {/* Main Title & Description */}
        <div className="space-y-3 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 dark:text-white tracking-tight leading-tight">
            {title}{' '}
            {titleHighlight && (
              <span className="text-amber-600 dark:text-amber-400">{titleHighlight}</span>
            )}
          </h1>

          {description && (
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
              {description}
            </p>
          )}
        </div>

        {/* Actions slot */}
        {actions && <div className="pt-2">{actions}</div>}
      </div>
    </section>
  );
};
