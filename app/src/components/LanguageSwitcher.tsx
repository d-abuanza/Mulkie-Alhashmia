"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center justify-center w-10 h-10 rounded-full border border-dark/15 hover:bg-dark/5 transition-all duration-300 active:scale-95 shadow-sm text-sm font-headline font-bold text-dark uppercase tracking-wider"
      aria-label="Toggle language"
    >
      {locale === 'ar' ? 'EN' : 'AR'}
    </button>
  );
}
