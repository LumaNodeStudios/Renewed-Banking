import { writable } from "svelte/store";

export const visibility = writable(false);
export const loading = writable(false);
export const notify = writable("");
export let activeAccount = writable(null);
export const atm = writable(false);
export const currency = writable("USD");

export let popupDetails = writable({
    account: {},
    actionType: "",
});

export const theme = writable({
    primary: '#6fd2f3',
    primaryDark: '#4fb9dd',
    primaryText: '#0f0f10'
});

export const bankName = writable('RENEWED');
export const bankSubtitle = writable('Financial Services');

export const accounts = writable<any>([

]);

export const translations = writable<any>();
