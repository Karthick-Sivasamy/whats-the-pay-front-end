import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// File Imports
import LandingPage from './pages/landingPage';
import Login from './pages/login';
import Layout from './utils/layout';
import { getJwtStatus, getUserInfo } from './utils/globalUtils';
import SignUp from './pages/signUp';

const router = createBrowserRouter([
  {
    path: '*',
    element: (
      <div className="h-[90dvh] w-full grid place-items-center">
        <h1>Page Not Found</h1>
      </div>
    )
  },
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/login',
    loader: () => {
      if (getUserInfo() && getJwtStatus()) {
        return redirect('/');
      } else {
        return true;
      }
    },
    element: <Login />
  },
  {
    path: '/signup',
    loader: () => {
      if (getUserInfo() && getJwtStatus()) {
        return redirect('/');
      } else {
        return true;
      }
    },
    element: <SignUp />
  }
]);

function App() {
  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  );
}

export default App;
