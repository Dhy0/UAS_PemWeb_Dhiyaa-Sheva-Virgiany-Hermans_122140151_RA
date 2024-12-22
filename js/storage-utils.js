const StorageUtils = {
    setCookie: function(name, value, days = 7) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Strict";
    },

    getCookie: function(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    deleteCookie: function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;SameSite=Strict';
    },

    setLocalStorage: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },

    getLocalStorage: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },

    removeLocalStorage: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    },

    // Session Storage Management
    setSessionStorage: function(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to sessionStorage:', e);
            return false;
        }
    },

    getSessionStorage: function(key) {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from sessionStorage:', e);
            return false;
        }
    },

    removeSessionStorage: function(key) {
        try {
            sessionStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from sessionStorage:', e);
            return false;
        }
    },

    // Form State Management
    saveFormState: function(formId) {
        const form = document.getElementById(formId);
        if (!form) return;

        const formData = {};
        const elements = form.elements;
        
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element.type !== 'submit' && element.type !== 'button') {
                formData[element.name] = element.value;
            }
        }

        this.setLocalStorage('formState_' + formId, formData);
        this.setSessionStorage('formState_' + formId, formData);
    },

    loadFormState: function(formId) {
        const form = document.getElementById(formId);
        if (!form) return;

        const formData = this.getLocalStorage('formState_' + formId) || 
                        this.getSessionStorage('formState_' + formId);
        
        if (formData) {
            Object.keys(formData).forEach(key => {
                const element = form.elements[key];
                if (element) {
                    element.value = formData[key];
                }
            });
        }
    },

    clearFormState: function(formId) {
        this.removeLocalStorage('formState_' + formId);
        this.removeSessionStorage('formState_' + formId);
    }
};