import { useTranslation } from 'react-i18next';

export default function MainPage() {
  const { t } = useTranslation('main');
  return <h1>{t('title')}</h1>;
}
