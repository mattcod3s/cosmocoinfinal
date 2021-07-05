import axios from 'axios';

const url = "https://cosmocoin.herokuapp.com/dashboard";
const dropdownUrl = "https://cosmocoin.herokuapp.com/dashboard/dropdown";
const loginUrl = "https://cosmocoin.herokuapp.com/login"

export const fetchCryptos = () => axios.get(url);
export const addCryptos = (newCrypto) => axios.post(url, newCrypto);
export const updateCryptos = (id, updatedCrypto) => axios.patch(`${url}/${id}`, updatedCrypto);
export const deleteCryptos = (id) => axios.delete(`${url}/${id}`);

export const signIn = (loginFormData) => axios.post(`${loginUrl}/signin`, loginFormData);
export const signUp = (registrationFormData) => axios.post(`${loginUrl}/signup`, registrationFormData);

export const fetchDropdown = () => axios.get(dropdownUrl);  