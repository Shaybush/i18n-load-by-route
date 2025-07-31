import { useEffect, useState } from 'react';
import i18n from '../i18n/i18n';

export default function LanguageSwitcher() {
  const [lang, setLang] = useState(i18n.language);

  useEffect(() => {
    const stored = localStorage.getItem('lang');
    if (stored && stored !== lang) {
      i18n.changeLanguage(stored);
      setLang(stored);
    }
  }, []);

  const toggle = () => {
    const next = lang === 'en' ? 'he' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
    setLang(next);
  };

  return <button onClick={toggle}>{lang === 'en' ? 'HE' : 'EN'}</button>;
}
