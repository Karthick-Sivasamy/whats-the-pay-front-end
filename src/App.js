import './App.css';
import LandingPage from './pages/landingPage';
import Login from './pages/login';
import Layout from './utils/layout';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '*',
    element: (
      <div className="h-[90dvh] w-full grid place-items-center">
        <h1>Page Not Found</h1>
      </div>
    ),
  },
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
