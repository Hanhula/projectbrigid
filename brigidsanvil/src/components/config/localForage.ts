import localforage from 'localforage';

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: 'brigidsAnvil',
  storeName: 'anvilStore',
  version: 1,
});

export default localforage;
