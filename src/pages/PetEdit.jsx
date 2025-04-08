import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PetContext } from '../context/PetContext';
import { validatePet } from '../utils/petSchema';
import { showErrorAlert } from '../utils/swalConfig';
import Swal from 'sweetalert2';

const PetEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { editPet, getPetById } = useContext(PetContext);
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    planet: '',
    age: '',
    image: '',
    isAdopted: false,
    temperament: '',
    size: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar datos de la mascota
  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const petData = await getPetById(id);
        setFormData({
          name: petData.name || '',
          species: petData.species || '',
          planet: petData.planet || '',
          age: petData.age ? String(petData.age) : '',
          image: petData.image || '',
          isAdopted: petData.isAdopted || false,
          temperament: petData.temperament || '',
          size: petData.size || '',
          description: petData.description || ''
        });
      } catch (error) {
        console.error('Error fetching pet:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cargar la mascota',
          icon: 'error',
          background: '#1f2937',
          color: '#fff'
        });
        navigate('/pets');
      } finally {
        setLoading(false);
      }
    };

    fetchPetData();
  }, [id, getPetById, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    // Validación específica para el campo nombre (solo letras y espacios)
    if (name === 'name' && !/^[A-Za-zÁ-ÿ\s]*$/.test(value)) return;

    // Validación específica para el campo edad (solo números y punto decimal)
    if (name === 'age' && !/^[\d.]*$/.test(value)) return;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Validación en tiempo real para campos modificados
    if (touched[name]) {
      const validation = validatePet({ ...formData, [name]: newValue });
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

    // Validar todos los campos
    const allFieldsTouched = Object.keys(formData).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(allFieldsTouched);

    // Validación completa
    const validation = validatePet(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      await showErrorAlert('Error de validación', 'Por favor corrige los campos marcados');
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar datos para enviar (convertir age a número)
      const dataToSend = {
        ...formData,
        age: parseFloat(formData.age)
      };

      await editPet(id, dataToSend);

      Swal.fire({
        title: '¡Éxito!',
        text: 'Los cambios se guardaron correctamente',
        icon: 'success',
        background: '#1f2937',
        color: '#fff'
      });

      navigate(`/pets/${id}`);
    } catch (error) {
      console.error('Error al guardar:', error);
      Swal.fire({
        title: 'Error',
        text: error.message || 'No se pudieron guardar los cambios',
        icon: 'error',
        background: '#1f2937',
        color: '#fff'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Estilo reusable para inputs
  const inputClass = (fieldName) =>
    `w-full px-4 py-2 bg-gray-700 border ${errors[fieldName] ? 'border-red-500' : 'border-gray-600'
    } rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white text-xl">Cargando mascota...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(`/pets/${id}`)}
          className="mb-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-white"
        >
          ← Volver a detalles
        </button>

        <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Editar Mascota Intergaláctica</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">Nombre *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('name')}
                  required
                  pattern="[A-Za-zÁ-ÿ\s]+"
                  title="Solo se permiten letras y espacios"
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>

              {/* Especie */}
              <div>
                <label className="block text-gray-300 mb-2">Especie *</label>
                <select
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('species')}
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="Perro">Perro</option>
                  <option value="Gato">Gato</option>
                  <option value="Ave">Ave</option>
                  <option value="Reptil">Reptil</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.species && <p className="mt-1 text-sm text-red-400">{errors.species}</p>}
              </div>

              {/* Planeta */}
              <div>
                <label className="block text-gray-300 mb-2">Planeta *</label>
                <input
                  type="text"
                  name="planet"
                  value={formData.planet}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('planet')}
                  required
                />
                {errors.planet && <p className="mt-1 text-sm text-red-400">{errors.planet}</p>}
              </div>

              {/* Edad */}
              <div>
                <label className="block text-gray-300 mb-2">Edad (años terrestres) *</label>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('age')}
                  required
                  pattern="\d*\.?\d+"
                  title="Debe ser un número válido (ej: 3 o 4.5)"
                />
                {errors.age && <p className="mt-1 text-sm text-red-400">{errors.age}</p>}
              </div>

              {/* Imagen */}
              // En el campo de imagen
              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">Imagen *</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('image')}
                  required
                  placeholder="Ej: https://example.com/imagen.jpg o /images/pets/mascota.jpg"
                />
                {errors.image && <p className="mt-1 text-sm text-red-400">{errors.image}</p>}
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image.startsWith('/images/')
                        ? `${window.location.origin}${formData.image}`
                        : formData.image}
                      alt="Vista previa"
                      className="h-32 rounded-md object-cover border border-gray-600"
                      onError={(e) => e.target.src = '/default-pet.jpg'}
                    />
                    <p className="text-xs text-gray-400 mt-1">Vista previa</p>
                  </div>
                )}
              </div>

              {/* Descripción */}
              <div className="col-span-2">
                <label className="block text-gray-300 mb-2">Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="4"
                  className={inputClass('description')}
                  placeholder="Describe a esta mascota interestelar..."
                  maxLength="500"
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
                <p className="text-xs text-gray-400 mt-1">
                  {formData.description.length}/500 caracteres
                </p>
              </div>

              {/* Temperamento */}
              <div>
                <label className="block text-gray-300 mb-2">Temperamento</label>
                <input
                  type="text"
                  name="temperament"
                  value={formData.temperament}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('temperament')}
                  placeholder="Ej: Juguetón, tranquilo"
                />
              </div>

              {/* Tamaño */}
              <div>
                <label className="block text-gray-300 mb-2">Tamaño</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass('size')}
                >
                  <option value="">Seleccionar</option>
                  <option value="Pequeño">Pequeño</option>
                  <option value="Mediano">Mediano</option>
                  <option value="Grande">Grande</option>
                </select>
              </div>

              {/* Estado de adopción */}
              <div className="flex items-center col-span-2">
                <input
                  type="checkbox"
                  name="isAdopted"
                  id="isAdopted"
                  checked={formData.isAdopted}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="isAdopted" className="ml-2 text-gray-300">
                  ¿Ya está adoptada?
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(`/pets/${id}`)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting ||
                  !formData.name ||
                  !formData.species ||
                  !formData.planet ||
                  !formData.age ||
                  !formData.image}
                className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white ${isSubmitting ||
                  !formData.name ||
                  !formData.species ||
                  !formData.planet ||
                  !formData.age ||
                  !formData.image ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </>
                ) : (
                  'Guardar Cambios'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetEdit;