import { createBrowserRouter } from 'react-router-dom';
import BaseLayout from '../components/layout/BaseLayout';
import { mainRoutes } from '../worlds/main/routes';
import { settingsRoutes } from '../worlds/settings/routes';

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      ...mainRoutes,
      ...settingsRoutes,
    ],
  },
]);

export default router;
