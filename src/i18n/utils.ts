import { fr } from './fr';
import { en } from './en';
import type { Translations } from './fr';

export type Lang = 'fr' | 'en';

export function getLang(url: URL): Lang {
  return url.pathname.startsWith('/en') ? 'en' : 'fr';
}

export function getTranslations(lang: Lang): Translations {
  return lang === 'en' ? en : fr;
}

export function getLangPrefix(lang: Lang): string {
  return lang === 'en' ? '/en' : '';
}
