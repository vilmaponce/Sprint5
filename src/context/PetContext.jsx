import { createContext, useState, useEffect } from 'react';
import { validatePet } from '../utils/petSchema';
import { getPets, getPetById, createPet, updatePet, deletePet } from '../services/api';
import { showSuccessToast, showErrorToast } from '../utils/toastConfig';
import Swal from 'sweetalert2';

export const PetContext = createContext();//contexto para manejar todo lo relacionado con mascotas (cargar, agregar, editar, eliminar, adoptar).

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adoptedPets, setAdoptedPets] = useState(() => {
    const saved = localStorage.getItem('adoptedPets');
    return saved ? JSON.parse(saved) : [];
  });

  // Sincronización con localStorage
  useEffect(() => {
    localStorage.setItem('adoptedPets', JSON.stringify(adoptedPets));
  }, [adoptedPets]);

  // Función mejorada para obtener mascotas
  const fetchPets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPets();
      setPets(data);
      return data; // Retornamos los datos para posibles usos
    } catch (err) {
      setError("Error al cargar mascotas");
      showErrorToast("No se pudieron cargar las mascotas");
      console.error("API Error:", err);
      throw err; // Propagamos el error
    } finally {
      setLoading(false);
    }
  };

  // Función mejorada para agregar mascota
  const addPet = async (petData) => {
    try {
      const validation = validatePet(petData);
      if (!validation.isValid) {
        throw new Error(JSON.stringify(validation.errors));
      }
      
      const newPet = await createPet(petData);
      
      // Actualización optimista del estado
      setPets(prev => [...prev, newPet]);
      
      await Swal.fire({
        title: '¡Éxito!',
        text: `${newPet.name} ha sido registrada en el sistema estelar`,
        icon: 'success',
        timer: 3000
      });
      
      return newPet;
    } catch (error) {
      await Swal.fire({
        title: 'Error',
        text: 'No se pudo registrar la mascota estelar',
        icon: 'error'
      });
      console.error("Error adding pet:", error);
      throw error;
    }
  };

  // Función mejorada para editar mascota
  const editPet = async (id, petData) => {
    try {
      // SOLUCIÓN CLAVE: Pasamos true como segundo parámetro para indicar modo edición
      const validation = validatePet(petData, true);
      
      if (!validation.isValid) {
        const errorMessages = Object.values(validation.errors)
          .filter(msg => msg)
          .join(', ');
        throw new Error(errorMessages || 'Datos inválidos');
      }
      
      const updatedPet = await updatePet(id, petData);
      
      // Actualizamos ambos estados
      setPets(prev => prev.map(p => p.id === id ? updatedPet : p));
      setAdoptedPets(prev => prev.map(p => p.id === id ? updatedPet : p));
      
      await Swal.fire({
        title: '¡Actualizado!',
        text: `Los datos de ${updatedPet.name} han sido actualizados`,
        icon: 'success',
        timer: 3000
      });
      
      return updatedPet;
    } catch (error) {
      await Swal.fire({
        title: 'Error',
        text: error.message || "Error al actualizar mascota",
        icon: 'error'
      });
      console.error("Error editing pet:", error);
      throw error;
    }
  };

  // Función mejorada para eliminar mascota
  const removePet = async (id) => {
    try {
      const petToDelete = pets.find(p => p.id === id);
      
      const result = await Swal.fire({
        title: '¿Eliminar mascota?',
        text: `¿Estás seguro de eliminar a ${petToDelete?.name || 'esta mascota'}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await deletePet(id);
        
        // Actualización optimista del estado
        setPets(prev => prev.filter(p => p.id !== id));
        setAdoptedPets(prev => prev.filter(p => p.id !== id));
        
        await Swal.fire(
          '¡Eliminada!',
          'La mascota ha sido eliminada del registro estelar.',
          'success'
        );
        
        return true;
      }
      return false;
    } catch (error) {
      await Swal.fire(
        'Error',
        'No se pudo eliminar la mascota: ' + error.message,
        'error'
      );
      console.error("Error deleting pet:", error);
      throw error;
    }
  };

  // Función mejorada para adopción
  const adoptPet = async (petId, formData) => {
    try {
      const petToAdopt = pets.find(p => p.id === petId);
      
      // 1. Actualizar en la API
      const updatedPet = await updatePet(petId, {
        isAdopted: true,
        adoptedAt: new Date().toISOString()
      });

      // 2. Crear registro de adopción local
      const adoptionRecord = {
        ...formData,
        adoptionDate: new Date().toISOString(),
        petId: petId
      };

      // 3. Actualizar estados
      setPets(prev => prev.filter(pet => pet.id !== petId));
      setAdoptedPets(prev => [
        ...prev, 
        {
          ...updatedPet,
          adoptionRecord
        }
      ]);

      await Swal.fire({
        title: '¡Adopción exitosa!',
        html: `
          <div class="text-center">
            <p class="text-lg">${petToAdopt.name} tiene nuevo hogar</p>
            <div class="mt-4 p-3 bg-green-100 rounded-lg">
              <p class="text-green-800">¡Adopción confirmada!</p>
            </div>
          </div>
        `,
        icon: 'success'
      });

      return updatedPet;
    } catch (error) {
      await Swal.fire({
        title: 'Error en adopción',
        text: 'No se pudo completar el proceso de adopción',
        icon: 'error'
      });
      console.error("Error en adopción:", error);
      throw error;
    }
  };

  // Carga inicial de datos
  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchPets();
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };
    
    initializeData();
  }, []);

  return (
    <PetContext.Provider 
      value={{ 
        pets, 
        loading,
        error,
        adoptedPets,
        fetchPets, 
        addPet, 
        editPet, 
        removePet,
        getPetById,
        adoptPet
      }}
    >
      {children}
    </PetContext.Provider>

    
  );
};

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePetContext debe usarse dentro de un PetProvider');
  }
  return context;
};