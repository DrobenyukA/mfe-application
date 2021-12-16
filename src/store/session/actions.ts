import { User } from './types';

export const SET_USER = '@session/SET_USER';

export const setUser = (user: User|null) => ({ type: SET_USER, payload: user });
