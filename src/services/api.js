// src/services/api.js
import axios from 'axios';

const API_BASE = 'https://67f41a1fcbef97f40d2d61d5.mockapi.io/api/v1';
const ENDPOINT = `${API_BASE}/pets`;  // Asegúrate que "pets" coincida con tu recurso en MockAPI

export const getPets = async () => {
  const response = await axios.get(ENDPOINT);
  return response.data;
};

export const getPetById = async (id) => {
  const response = await axios.get(`${ENDPOINT}/${id}`);
  return response.data;
};

export const createPet = async (petData) => {
  const response = await axios.post(ENDPOINT, petData);
  return response.data;
};

export const updatePet = async (id, petData) => {
  const response = await axios.put(`${ENDPOINT}/${id}`, petData);
  return response.data;
};

export const deletePet = async (id) => {
  const response = await axios.delete(`${ENDPOINT}/${id}`);
  return response.data;
};