class Storage {

    getSessionStorage = (key) => sessionStorage.getItem(key);
    setSessionStorage = (key, value) => sessionStorage.setItem(key, value);

    getLocalStorage = (key) => localStorage.getItem(key);
    setLocalStorage = (key, value) => localStorage.setItem(key, value);
}

export default new Storage();