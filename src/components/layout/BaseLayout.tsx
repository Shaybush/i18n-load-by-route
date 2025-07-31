import { Outlet } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher';

export default function BaseLayout() {
  return (
    <div>
      <LanguageSwitcher />
      <Outlet />
    </div>
  );
}
