import { ApplicationState } from '../';

export const getUser = ({ session }: ApplicationState) => session.user;
