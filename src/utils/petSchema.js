export const validatePet = (data) => {
  const errors = {};
  let isValid = true;

  // Validación para el nombre (solo letras y espacios)
  if (!data.name?.trim()) {
    errors.name = 'El nombre es requerido';
    isValid = false;
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(data.name.trim())) {
    errors.name = 'El nombre solo puede contener letras y espacios';
    isValid = false;
  }

  // Validación para especie
  if (!data.species) {
    errors.species = 'La especie es requerida';
    isValid = false;
  }

  // Validación para planeta
  if (!data.planet?.trim()) {
    errors.planet = 'El planeta es requerido';
    isValid = false;
  }

  // Validación para edad
  if (!data.age) {
    errors.age = 'La edad es requerida';
    isValid = false;
  } else if (isNaN(Number(data.age))) {
    errors.age = 'La edad debe ser un número';
    isValid = false;
  } else if (Number(data.age) <= 0) {
    errors.age = 'La edad debe ser mayor que cero';
    isValid = false;
  }

  // petSchema.js
const validateImage = (value) => {
  // Acepta URLs http/https o rutas locales /images/pets/
  const urlPattern = /^(https?:\/\/).+\.(jpg|jpeg|png|webp|gif)$/i;
  const localPathPattern = /^\/images\/pets\/.+\.(jpg|jpeg|png|webp|gif)$/i;
  
  return urlPattern.test(value) || localPathPattern.test(value);
};

// En la validación principal
if (!data.image?.trim()) {
  errors.image = 'La imagen es requerida';
  isValid = false;
} else if (!validateImage(data.image.trim())) {
  errors.image = 'Debe ser una URL válida (http/https) o ruta local (/images/pets/...)';
  isValid = false;
}

  return {
    isValid,
    errors
  };
};