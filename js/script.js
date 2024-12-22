document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk menampilkan notifikasi
    function showNotification(message, type) {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.textContent = message;
            notification.className = `notification ${type}`;
            notification.style.display = 'block';

            // Otomatis sembunyikan notifikasi setelah 5 detik
            setTimeout(() => {
                notification.style.display = 'none';
            }, 5000);
        }
    }

    // Validasi Form
    const form = document.getElementById('pendaftaran-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            let errors = [];
            
            // Validasi Nama (hanya huruf)
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

            // Validasi Email
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

            // Validasi Nomor Telepon (hanya angka)
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

            // Validasi tanggal lahir
            const tanggalLahir = document.getElementById('tanggal_lahir');
            if (!tanggalLahir.value) {
                errors.push('Tanggal lahir harus diisi');
                isValid = false;
            }

            // Validasi asal instansi
            const asalInstansi = document.getElementById('asal_instansi');
            if (!asalInstansi.value.trim()) {
                errors.push('Asal instansi harus diisi');
                isValid = false;
            }

            // Validasi kategori lomba
            const kategoriLomba = document.getElementById('kategori_lomba');
            if (!kategoriLomba.value) {
                errors.push('Kategori lomba harus dipilih');
                isValid = false;
            }

            if (!isValid) {
                // Tampilkan pesan error
                showNotification(errors.join('\n'), 'error');
                return;
            }

            // Jika semua validasi berhasil
            // Simpan ke local storage sebelum submit
            localStorage.setItem('pendaftaran_nama', nama.value);
            localStorage.setItem('pendaftaran_email', email.value);

            // Submit form
            form.submit();
        });

        // Cek data tersimpan di local storage
        const storedNama = localStorage.getItem('pendaftaran_nama');
        const storedEmail = localStorage.getItem('pendaftaran_email');
        if (storedNama) {
            document.getElementById('nama').value = storedNama;
        }
        if (storedEmail) {
            document.getElementById('email').value = storedEmail;
        }
    }

    // Auto-hide notification yang ada saat halaman dimuat
    const notification = document.getElementById('notification');
    if (notification && notification.style.display === 'block') {
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }
});