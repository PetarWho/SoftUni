import page from '../node_modules/page/page.mjs';
import * as httpClient from './httpService.js';

const baseUrl = 'http://localhost:3030/data/donation';

export const getForPet = (petId) => httpClient.get(`${baseUrl}?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
export const getForPetFromPerson = (petId, userId) => httpClient.get(`${baseUrl}?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

export const donate = (petId) => httpClient.post(baseUrl, {petId});