import { useTranslation } from 'react-i18next';

export default function SettingsPage() {
  const { t } = useTranslation('settings');
  return <h1>{t('title')}</h1>;
}
