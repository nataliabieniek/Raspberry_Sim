import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { LessonPage } from '../pages/lesson_page/LessonPage';
import { LoginPage } from '../pages/login_page/LoginPage';
import { WelcomePage } from '../pages/welcome_page/WelcomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'lesson',
        element: <LessonPage />,
      },
    ],
  },
]);
