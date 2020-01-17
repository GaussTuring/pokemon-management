const utils = {
    setLocalStorage: (name, data) => {
        localStorage.setItem(name, JSON.stringify(data))
    },

    getLocalStorage: name => {
        localStorage.getItem(name)
    },

    setSessionStorage: (name, data) => {
        sessionStorage.setItem(name, JSON.stringify(data))
    },

    getSessionStorage: name => {
        return sessionStorage.getItem(name)
    }
}

export default utils
