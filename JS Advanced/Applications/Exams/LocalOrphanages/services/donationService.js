import page from '../node_modules/page/page.mjs';
import * as httpClient from './httpService.js';

const baseUrl = 'http://localhost:3030/data/donations';

export const getForPost = (postId) => httpClient.get(`${baseUrl}?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
export const getFromSpecificUser = (postId, userId) => httpClient.get(`${baseUrl}?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);

export const donate = (postId) => httpClient.post(baseUrl, {postId});