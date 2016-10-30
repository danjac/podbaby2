const PLAYER = 'player';

export const save = state => window.localStorage.setItem(PLAYER, JSON.stringify(state));

export const load = () => JSON.parse(window.localStorage.getItem(PLAYER));

export const remove = () => window.localStorage.removeItem(PLAYER);
