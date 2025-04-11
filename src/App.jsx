// src/App.jsx
import { PetProvider } from './context/PetContext';
import AppRouter from './Router/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarCursor from './components/StarCursor';

function App() {
  return (
    <PetProvider>
      <AppRouter />
      <StarCursor />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </PetProvider>
  );
}

export default App;
