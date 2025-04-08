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
    isAdopted: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Cargar datos si existe 'pet'
  useEffect(() => {
    if (pet) {
      setFormData({
        name: pet.name || '',
        species: pet.species || '',
        planet: pet.planet || '',
        age: pet.age || '',
        image: pet.image || '',
        description: pet.description || '',
        isAdopted: pet.isAdopted || false
      });
    }
  }, [pet]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Validación en tiempo real para campos modificados
    if (touched[name]) {
      const validation = validatePet({ ...formData, [name]: value });
      setErrors(prev => ({ ...prev, [name]: validation.errors[name] || '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const validation = validatePet(formData);
    setErrors(prev => ({ ...prev, [name]: validation.errors[name] || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      species: true,
      age: true,
      image: true,
      description: true
    });

    const validation = validatePet(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      await showErrorAlert('Error de validación', 'Por favor corrige los campos marcados');
      return;
    }
    
    onSubmit(formData);
  };

  // Estilo reusable para inputs
  const inputClass = (fieldName) => 
    `w-full bg-gray-700 border ${errors[fieldName] ? 'border-red-500' : 'border-gray-600'} 
     rounded-md shadow-sm text-white p-3 focus:ring-2 focus:ring-purple-500 
     focus:border-transparent transition-all`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campo Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Nombre *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('name')}
            placeholder="Ej: Rover"
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>
        
        {/* Campo Especie */}
        <div>
          <label htmlFor="species" className="block text-sm font-medium text-gray-300 mb-1">
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
          {errors.species && <p className="mt-1 text-sm text-red-400">{errors.species}</p>}
        </div>
        
        {/* Campo Planeta */}
        <div>
          <label htmlFor="planet" className="block text-sm font-medium text-gray-300 mb-1">
            Planeta de origen
          </label>
          <input
            type="text"
            id="planet"
            name="planet"
            value={formData.planet}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputClass('planet')} ${errors.planet ? 'border-red-500' : ''}`}
            placeholder="Ej: Marte"
          />
          {errors.planet && <p className="mt-1 text-sm text-red-400">{errors.planet}</p>}
        </div>
        
        {/* Campo Edad */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">
            Edad (años terrestres)
          </label>
          <input
            type="text" // Usamos text para mejor control
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('age')}
            placeholder="Ej: 4.5"
          />
          {errors.age && <p className="mt-1 text-sm text-red-400">{errors.age}</p>}
        </div>
      </div>
      
      {/* Campo Imagen URL */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
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
        {errors.image && <p className="mt-1 text-sm text-red-400">{errors.image}</p>}
        {formData.image && !errors.image && (
          <div className="mt-2">
            <img 
              src={formData.image} 
              alt="Vista previa" 
              className="h-24 rounded-md object-cover border border-gray-600"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150?text=Imagen+no+disponible';
              }}
            />
            <p className="text-xs text-gray-400 mt-1">Vista previa</p>
          </div>
        )}
      </div>
      
      {/* Campo Descripción */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
          Descripción *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          onBlur={handleBlur}
          rows="4"
          className={inputClass('description')}
          placeholder="Describe a esta mascota interestelar..."
        ></textarea>
        {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
        <p className="text-xs text-gray-400 mt-1">{formData.description.length}/500 caracteres</p>
      </div>
      
      {/* Campo Estado de adopción */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isAdopted"
          name="isAdopted"
          checked={formData.isAdopted}
          onChange={handleChange}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
        />
        <label htmlFor="isAdopted" className="ml-2 block text-sm text-gray-300">
          ¿Ya está adoptada?
        </label>
      </div>
      
      {/* Botón de envío */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading || !validatePet(formData).isValid}
          className={`px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all flex items-center justify-center ${
            loading || !validatePet(formData).isValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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