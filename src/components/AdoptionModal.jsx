import { useState } from 'react';

const AdoptionModal = ({ pet, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    terms: false
  });

  const [errors, setErrors] = useState({
    name: { show: false, message: '' },
    email: { show: false, message: '' },
    phone: { show: false, message: '' },
    terms: { show: false, message: '' }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Validación en tiempo real
    if (name === 'name') validateName(newValue);
    else if (name === 'email') validateEmail(newValue);
    else if (name === 'phone') validatePhone(newValue);
    else if (name === 'terms') validateTerms(newValue);
  };

  const validateName = (value) => {
    const isValid = value.trim() !== '' && isNaN(Number(value));
    setErrors(prev => ({
      ...prev,
      name: {
        show: !isValid && value !== '',
        message: '¡Alerta cósmica! 🌌 El nombre no puede contener solo números'
      }
    }));
    return isValid;
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    setErrors(prev => ({
      ...prev,
      email: {
        show: !isValid && value !== '',
        message: '¡Houston, tenemos un problema! 🛰️ Email no válido'
      }
    }));
    return isValid;
  };

  const validatePhone = (value) => {
    const isValid = !isNaN(Number(value)) && value.trim() !== '';
    setErrors(prev => ({
      ...prev,
      phone: {
        show: !isValid && value !== '',
        message: '¡Señal perdida! 📡 Debe ser un número válido'
      }
    }));
    return isValid;
  };

  const validateTerms = (value) => {
    setErrors(prev => ({
      ...prev,
      terms: {
        show: !value,
        message: '¡Atención astronauta! 👨‍🚀 Debes aceptar los términos'
      }
    }));
    return value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNameValid = validateName(formData.name);
    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);
    const isTermsValid = validateTerms(formData.terms);

    if (isNameValid && isEmailValid && isPhoneValid && isTermsValid) {
      //Guardar adopción en localStorage
      const adoptions = JSON.parse(localStorage.getItem('adoptions') || '[]');
      adoptions.push({
        petId: pet.id,
        ...formData,
        date: new Date().toISOString()
      });
      localStorage.setItem('adoptions', JSON.stringify(adoptions));
      //Actualizar mascota en localStorage en el contexto de adopción
      // 2. Actualizar el contexto (nuevo)
      onSuccess({
        ...pet,
        isAdopted: true,
        adoptedAt: new Date().toISOString(),
        adoptionRecord: {
          ...formData,
          adoptionDate: new Date().toISOString(),
          petId: pet.id
        }
      });

      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border-2 border-purple-500 rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold text-purple-400">Adoptar a {pet.name}</h2>
          <span className="ml-2 text-2xl">🚀</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Campo Nombre */}
            <div>
              <label className="block text-gray-300 mb-1">Nombre completo</label>
              <input
                type="text"
                name="name"
                className={`w-full px-3 py-2 bg-gray-700 rounded text-white ${errors.name.show ? 'border-2 border-red-500' : ''
                  }`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Zorg de Andrómeda"
              />
              {errors.name.show && (
                <div className="mt-1 text-red-400 text-sm flex items-center">
                  <span className="mr-1">👽</span>
                  {errors.name.message}
                </div>
              )}
            </div>

            {/* Campo Email */}
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                name="email"
                className={`w-full px-3 py-2 bg-gray-700 rounded text-white ${errors.email.show ? 'border-2 border-red-500' : ''
                  }`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Ej: contacto@nave-madre.com"
              />
              {errors.email.show && (
                <div className="mt-1 text-red-400 text-sm flex items-center">
                  <span className="mr-1">🛸</span>
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Campo Teléfono */}
            <div>
              <label className="block text-gray-300 mb-1">Teléfono</label>
              <input
                type="tel"
                name="phone"
                className={`w-full px-3 py-2 bg-gray-700 rounded text-white ${errors.phone.show ? 'border-2 border-red-500' : ''
                  }`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ej: +34 555 42 42 42"
              />
              {errors.phone.show && (
                <div className="mt-1 text-red-400 text-sm flex items-center">
                  <span className="mr-1">📡</span>
                  {errors.phone.message}
                </div>
              )}
            </div>

            {/* Checkbox Términos */}
            <div className={`flex items-start p-2 rounded ${errors.terms.show ? 'bg-red-900 bg-opacity-20' : ''
              }`}>
              <input
                type="checkbox"
                name="terms"
                id="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mr-2 mt-1"
              />
              <label htmlFor="terms" className="text-gray-300">
                Acepto los términos de adopción galáctica
              </label>
            </div>
            {errors.terms.show && (
              <div className="text-red-400 text-sm flex items-center">
                <span className="mr-1">📜</span>
                {errors.terms.message}
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded text-white"
            >
              Confirmar Adopción
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionModal;