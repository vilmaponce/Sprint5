import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingPlanet from '../components/LoadingPlanet';

// Todas las importaciones como lazy
const Home = lazy(() => import('../pages/Home'));
const PetList = lazy(() => import('../pages/PetList'));
const PetDetail = lazy(() => import('../pages/PetDetail'));
const PetCreate = lazy(() => import('../pages/PetCreate'));
const PetEdit = lazy(() => import('../pages/PetEdit'));
const NotFound = lazy(() => import('../pages/NotFound'));
const AdoptedPets = lazy(() => import('../pages/AdoptedPets'));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="min-h-screen bg-starry-night bg-cover bg-fixed">
        <Suspense fallback={<LoadingPlanet />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<PetList />} />
            <Route path="/pets/create" element={<PetCreate />} />
            <Route path="/pets/:id" element={<PetDetail />} />
            <Route path="/pets/:id/edit" element={<PetEdit />} />
            <Route path="/adopted" element={<AdoptedPets />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;