import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content" style={{ paddingTop: '80px' }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
