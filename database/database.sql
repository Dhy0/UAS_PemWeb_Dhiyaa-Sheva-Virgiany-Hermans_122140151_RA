-- Buat Database
CREATE DATABASE cyber_security_competition;
-- Gunakan Database
USE cyber_security_competition;

-- Buat Tabel Peserta Lomba
CREATE TABLE peserta_lomba (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    asal_instansi VARCHAR(255) NOT NULL,
    no_telepon VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    kategori_lomba VARCHAR(50) NOT NULL,
    browser VARCHAR(255),
    ip_address VARCHAR(50),
    tanggal_daftar TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);