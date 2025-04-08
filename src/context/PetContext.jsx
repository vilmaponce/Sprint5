import { createContext, useState, useEffect } from 'react';
import { validatePet } from '../utils/petSchema';
import { getPets, getPetById, createPet, updatePet, deletePet } from '../services/api';
import { showSuccessToast, showErrorToast } from '../utils/toastConfig';
import { confirmDelete } from '../utils/swalConfig';

export const PetContext = createContext();

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPets();
      setPets(data);
    } catch (err) {
      setError("Error al cargar mascotas");
      showErrorToast("No se pudieron cargar las mascotas");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addPet = async (petData) => {
    try {
      const validation = validatePet(petData);
      if (!validation.isValid) {
        throw new Error(JSON.stringify(validation.errors));
      }
      const newPet = await createPet(petData);
      setPets(prev => [...prev, newPet]);
      showSuccessToast("Mascota creada exitosamente");
      return newPet;
    } catch (error) {
      showErrorToast("Error al crear mascota");
      console.error("Error adding pet:", error);
      throw error;
    }
  };

  const editPet = async (id, petData) => {
    try {
      const validation = validatePet(petData);
      if (!validation.isValid) {
        throw new Error(JSON.stringify(validation.errors));
      }
      const updatedPet = await updatePet(id, petData);
      setPets(prev => prev.map(p => p.id === id ? updatedPet : p));
      showSuccessToast("Mascota actualizada");
      return updatedPet;
    } catch (error) {
      showErrorToast("Error al actualizar mascota");
      console.error("Error editing pet:", error);
      throw error;
    }
  };

  const removePet = async (id) => {
    try {
      const result = await confirmDelete();
      if (result.isConfirmed) {
        await deletePet(id);
        setPets(prev => prev.filter(p => p.id !== id));
        showSuccessToast("Mascota eliminada");
      }
    } catch (error) {
      showErrorToast("Error al eliminar mascota");
      console.error("Error deleting pet:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <PetContext.Provider 
      value={{ 
        pets, 
        loading,
        error,
        fetchPets, 
        addPet, 
        editPet, 
        removePet,
        getPetById
      }}
    >
      {children}
    </PetContext.Provider>
  );
};