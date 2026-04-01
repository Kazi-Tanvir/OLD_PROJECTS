import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import Layout from '@/components/layout/Layout';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Departments from '@/pages/Departments';
import Events from '@/pages/Events';
import Executives from '@/pages/Executives';
import Projects from '@/pages/Projects';
import Gallery from '@/pages/Gallery';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="departments" element={<Departments />} />
          <Route path="events" element={<Events />} />
          <Route path="executives" element={<Executives />} />
          <Route path="projects" element={<Projects />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
