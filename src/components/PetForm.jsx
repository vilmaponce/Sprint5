import { useEffect, useState } from 'react';
import { validatePet } from '../utils/petSchema';
import { showErrorAlert } from '../utils/swalConfig';

const PetForm = ({ pet, onSubmit, loading, submitText = "Guardar" }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    planet: '',
    age: '',
    image: '',
    description: '',
    isAdopted: false,
    specialPowers: []
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name || '',
        species: pet.species || '',
        planet: pet.planet || '',
        age: pet.age !== undefined ? String(pet.age) : '',
        image: pet.image || '',
        description: pet.description || '',
        isAdopted: pet.isAdopted || false,
        specialPowers: pet.specialPowers || []
      });
    }
  }, [pet]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Validación solo para el campo nombre
    if (name === 'name') {
      // Permite solo letras (incluyendo acentos) y espacios
      if (!/^[a-zA-ZÁ-ÿ\s]*$/.test(value)) {
        return; // No actualiza el estado si no cumple
      }
    }
  
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Validación al perder el foco
  const handleBlur = (e) => {
    const { name } = e.target;
    // No validar el nombre en modo edición
    if (pet && name === 'name') return;

    setTouched(prev => ({ ...prev, [name]: true }));
    const validation = validatePet(formData, !!pet);
    setErrors(prev => ({ ...prev, [name]: validation.errors[name] || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación que considera el modo edición
    const validation = validatePet(formData, !!pet);

    // SOLUCIÓN CLAVE: Crear copia de los errores sin el error de nombre en edición
    const errorsToShow = { ...validation.errors };
    if (pet) {
      delete errorsToShow.name;
    }

    setErrors(errorsToShow);

    // Verificar si hay errores después de filtrar
    const hasErrors = Object.values(errorsToShow).some(Boolean);

    if (!validation.isValid || hasErrors) {
      await showErrorAlert(
        'Error de validación',
        Object.values(errorsToShow).filter(Boolean).join(', ')
      );
      return;
    }

    onSubmit(formData);
  };

  // Estilo mejorado para inputs
  const inputClass = (fieldName) =>
    `w-full px-5 py-3 text-lg bg-gray-700 border-2 ${errors[fieldName] ? 'border-red-500' : 'border-gray-600'
    } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${!!pet && fieldName === 'name' ? 'bg-gray-600 cursor-not-allowed' : ''
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8"> {/* Espaciado aumentado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Espaciado aumentado */}
        {/* Campo Nombre */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Nombre *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}  // Asegúrate que esto esté presente
            className={`w-full p-3 rounded-lg bg-gray-700 text-white border-2 ${errors.name ? 'border-red-500' : 'border-gray-600'
              }`}
            placeholder="Ej: Rover"
            pattern="[a-zA-ZÁ-ÿ\s]+"
            title="Solo se permiten letras y espacios"
          />
          {errors.name && <p className="mt-1 text-red-400 text-sm">{errors.name}</p>}
        </div>

        {/* Campo Especie */}
        <div className="space-y-2">
          <label htmlFor="species" className="block text-xl font-medium text-gray-300">
            Especie *
          </label>
          <select
            id="species"
            name="species"
            value={formData.species}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('species')}
          >
            <option value="">Seleccione una especie</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Ave">Ave</option>
            <option value="Reptil">Reptil</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.species && <p className="mt-2 text-lg text-red-400">{errors.species}</p>}
        </div>

        {/* Campo Planeta */}
        <div className="space-y-2">
          <label htmlFor="planet" className="block text-xl font-medium text-gray-300">
            Planeta de origen *
          </label>
          <input
            type="text"
            id="planet"
            name="planet"
            value={formData.planet}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('planet')}
            placeholder="Ej: Marte"
          />
          {errors.planet && <p className="mt-2 text-lg text-red-400">{errors.planet}</p>}
        </div>

        {/* Campo Edad */}
        <div className="space-y-2">
          <label htmlFor="age" className="block text-xl font-medium text-gray-300">
            Edad (años terrestres) *
          </label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('age')}
            placeholder="Ej: 4.5"
          />
          {errors.age && <p className="mt-2 text-lg text-red-400">{errors.age}</p>}
        </div>
      </div>

      {/* Campo Imagen */}
      <div className="space-y-2">
        <label htmlFor="image" className="block text-xl font-medium text-gray-300">
          Imagen URL *
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          onBlur={handleBlur}
          className={inputClass('image')}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        {errors.image && <p className="mt-2 text-lg text-red-400">{errors.image}</p>}
        {formData.image && !errors.image && (
          <div className="mt-4">
            <img
              src={formData.image}
              alt="Vista previa"
              className="h-40 w-full object-contain rounded-lg border-2 border-gray-600"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=Imagen+no+disponible';
              }}
            />
          </div>
        )}
      </div>

      {/* Campo Descripción */}
      <div className="space-y-2">
        <label htmlFor="description" className="block text-xl font-medium text-gray-300">
          Descripción *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          rows="6"
          className={`${inputClass('description')} min-h-[200px]`}
          placeholder="Describe a esta mascota interestelar..."
        ></textarea>
        {errors.description && <p className="mt-2 text-lg text-red-400">{errors.description}</p>}
        <p className="text-sm text-gray-400 mt-2">
          {formData.description.length}/500 caracteres
        </p>
      </div>

      {/* Poderes Especiales */}
      <div className="space-y-4">
        <label className="block text-xl font-medium text-gray-300">
          Poderes Especiales
        </label>
        <div className="space-y-3">
          {formData.specialPowers.map((power, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={power}
                onChange={(e) => {
                  const updatedPowers = [...formData.specialPowers];
                  updatedPowers[index] = e.target.value;
                  setFormData({ ...formData, specialPowers: updatedPowers });
                }}
                className="flex-1 px-4 py-3 text-lg bg-gray-700 border-2 border-gray-600 rounded-lg"
                placeholder={`Poder especial #${index + 1}`}
                maxLength="50"
              />
              <button
                type="button"
                onClick={() => {
                  const updatedPowers = formData.specialPowers.filter((_, i) => i !== index);
                  setFormData({ ...formData, specialPowers: updatedPowers });
                }}
                className="px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            if (formData.specialPowers.length < 5) {
              setFormData({
                ...formData,
                specialPowers: [...formData.specialPowers, '']
              });
            }
          }}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors text-lg"
          disabled={formData.specialPowers.length >= 5}
        >
          + Añadir Poder Especial
        </button>
      </div>

      {/* Estado de adopción */}
      <div className="flex items-center space-x-3 pt-4">
        <input
          type="checkbox"
          id="isAdopted"
          name="isAdopted"
          checked={formData.isAdopted}
          onChange={handleChange}
          className="w-5 h-5 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
        />
        <label htmlFor="isAdopted" className="text-lg text-gray-300">
          ¿Ya está adoptada?
        </label>
      </div>

      {/* Botón de envío */}
      <div className="flex justify-end pt-8">
        <button
          type="submit"
          disabled={loading}
          className={`px-8 py-4 text-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </>
          ) : (
            submitText
          )}
        </button>
      </div>
    </form>
  );
};

export default PetForm;