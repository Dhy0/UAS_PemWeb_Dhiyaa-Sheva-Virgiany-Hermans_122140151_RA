// Fungsi untuk mengelola Cookie
const CookieManager = {
    // Menetapkan cookie dengan nama, nilai, dan masa berlaku (dalam hari)
    setCookie: function(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    },

    // Mendapatkan nilai cookie berdasarkan nama
    getCookie: function(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return null;
    },

    // Menghapus cookie berdasarkan nama
    deleteCookie: function(name) {
        this.setCookie(name, "", -1);
    }
};

// Fungsi untuk mengelola Local Storage
const StorageManager = {
    // Menyimpan data ke localStorage
    setItem: function(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },

    // Mengambil data dari localStorage
    getItem: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return null;
        }
    },

    // Menghapus data dari localStorage
    removeItem: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    },

    // Membersihkan semua data di localStorage
    clear: function() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Error clearing localStorage:', e);
            return false;
        }
    }
};

// Menggunakan storage untuk form data
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pendaftaran-form');
    
    if (form) {
        // Menyimpan data form sementara saat input berubah
        const formInputs = form.querySelectorAll('input, select');
        formInputs.forEach(input => {
            // Memuat data yang tersimpan
            const savedValue = StorageManager.getItem(`form_${input.id}`);
            if (savedValue) {
                input.value = savedValue;
            }

            // Menyimpan perubahan
            input.addEventListener('change', function() {
                StorageManager.setItem(`form_${this.id}`, this.value);
            });
        });

        // Membersihkan storage saat form berhasil disubmit
        form.addEventListener('submit', function() {
            formInputs.forEach(input => {
                StorageManager.removeItem(`form_${input.id}`);
            });
        });
    }

    // Menyimpan riwayat kunjungan menggunakan cookie
    const lastVisit = CookieManager.getCookie('lastVisit');
    if (lastVisit) {
        console.log('Kunjungan terakhir:', new Date(lastVisit).toLocaleString());
    }
    CookieManager.setCookie('lastVisit', new Date().toISOString(), 30);

    // Menampilkan status penyimpanan
    console.log('Cookie tersimpan:', document.cookie);
    console.log('Local Storage tersimpan:', localStorage);
    
    // Menampilkan informasi cookie dan storage di halaman
    const containerDiv = document.querySelector('.container');
    if (containerDiv) {
        const storageInfo = document.createElement('div');
        storageInfo.className = 'storage-info';
        storageInfo.innerHTML = `
            <h3>Informasi Penyimpanan</h3>
            <div class="storage-details">
                <h4>Cookie</h4>
                <p>Kunjungan terakhir: ${lastVisit ? new Date(lastVisit).toLocaleString() : 'Pertama kali'}</p>
            </div>
        `;
        containerDiv.appendChild(storageInfo);

        // Update local storage content
        function updateLocalStorageDisplay() {
            const localStorageContent = document.getElementById('localStorage-content');
            if (localStorageContent) {
                const items = Object.keys(localStorage).map(key => {
                    return `<div class="storage-item">
                        <strong>${key}:</strong> ${localStorage.getItem(key)}
                    </div>`;
                });
                localStorageContent.innerHTML = items.join('') || '<p>Tidak ada data tersimpan</p>';
            }
        }
        updateLocalStorageDisplay();
    }
});
