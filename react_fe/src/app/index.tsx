import { ConfigProvider } from 'antd';
import { Fragment, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SocketProvider } from '@socket';

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  TimeScale,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
);
// import 'app/assets/styles/main.scss';
import { Loading } from './components/common/Loading';

import routes from '../routers';
import ProtectedRoute from '../routers/handlers/ProtectedRoute';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Sawarabi Gothic, sans-serif',
        },
      }}>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Navigate
                  to="/home"
                  replace
                />
              }
            />
            {routes.map((route) => {
              const Protected = route.isProtected ? ProtectedRoute : Fragment;
              const Layout = route.layout ?? Fragment;
              const Component = route.component;
              const isAdmin = route.isAdmin;
              return (
                <Route
                  key={route.key}
                  path={route.path}
                  element={
                    <Protected isAdmin={isAdmin}>
                      <Layout>
                        <Suspense fallback={<Loading size="large" />}>
                          <Component />
                        </Suspense>
                      </Layout>
                    </Protected>
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </ConfigProvider>
  );
}

export default App;
