export const validatePet = (petData, isEditMode = false) => {
  const errors = {};
  let isValid = true;

  // Validación condicional del nombre
  // Solo validar nombre en creación
  if (!isEditMode) {
    if (!petData.name?.trim()) {
      errors.name = 'El nombre es requerido';
      isValid = false;
    }
  }
  // Validaciones que aplican siempre
  if (!petData.species) {
    errors.species = 'La especie es requerida';
    isValid = false;
  }

  if (!petData.planet?.trim()) {
    errors.planet = 'Planeta de origen requerido';
    isValid = false;
  }
  // Resto de validaciones básicas...
  if (!petData.image?.trim()) {
    errors.image = 'La imagen es requerida';
    isValid = false;
  }

  return { isValid, errors };
};