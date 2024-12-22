document.addEventListener('DOMContentLoaded', function() {
    function showNotification(message, type) {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.className = `notification ${type}`;
            notification.style.display = 'block';

            setTimeout(() => {
                notification.style.display = 'none';
            }, 5000);
        }
    }

    const form = document.getElementById('pendaftaran-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            let errors = [];
            
            const nama = document.getElementById('nama');
            const namaError = document.getElementById('nama-error');
            const namaRegex = /^[a-zA-Z\s]+$/;
            if (!namaRegex.test(nama.value.trim())) {
                namaError.textContent = 'Nama hanya boleh berisi huruf';
                errors.push('Nama hanya boleh berisi huruf');
                isValid = false;
            } else {
                namaError.textContent = '';
            }

            const email = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                emailError.textContent = 'Format email tidak valid';
                errors.push('Format email tidak valid');
                isValid = false;
            } else {
                emailError.textContent = '';
            }

            const noTelepon = document.getElementById('no_telepon');
            const noTeleponError = document.getElementById('no-telepon-error');
            const teleponRegex = /^[0-9]+$/;
            if (!teleponRegex.test(noTelepon.value.trim())) {
                noTeleponError.textContent = 'Nomor telepon hanya boleh berisi angka';
                errors.push('Nomor telepon hanya boleh berisi angka');
                isValid = false;
            } else {
                noTeleponError.textContent = '';
            }

            const tanggalLahir = document.getElementById('tanggal_lahir');
            if (!tanggalLahir.value) {
                errors.push('Tanggal lahir harus diisi');
                isValid = false;
            }

            const asalInstansi = document.getElementById('asal_instansi');
            if (!asalInstansi.value.trim()) {
                errors.push('Asal instansi harus diisi');
                isValid = false;
            }

            const kategoriLomba = document.getElementById('kategori_lomba');
            if (!kategoriLomba.value) {
                errors.push('Kategori lomba harus dipilih');
                isValid = false;
            }

            if (!isValid) {
                showNotification(errors.join('\n'), 'error');
                return;
            }

            form.submit();
        });

    }

    const notification = document.getElementById('notification');
    if (notification && notification.style.display === 'block') {
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }
    
    window.onload = function() {
        const notification = document.getElementById("notification");
        const form = document.getElementById("pendaftaran-form");

        if (notification && notification.classList.contains("success")) {
            form.reset();
        }
    };
});