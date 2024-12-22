# Cyber Security Competition Website Documentation
# Ujian Akhir Semester – Mata Kuliah Pemrograman - RA

## Bagian 1: Client-side Programming (Bobot: 30%)

### 1.1 Manipulasi DOM dengan JavaScript (15%)
Membuat form input dengan minimal 4 elemen input (teks, checkbox, radio, dll.)

```javascript
// From script.js - Form handling
const form = document.getElementById('pendaftaran-form');
```

Form elements from daftar.php:
```html
<form id="pendaftaran-form" method="POST" action="">
    <input type="text" id="nama" name="nama">
    <input type="date" id="tanggal_lahir" name="tanggal_lahir">
    <input type="tel" id="no_telepon" name="no_telepon">
    <input type="email" id="email" name="email">
    <select id="kategori_lomba" name="kategori_lomba">
        <!-- options -->
    </select>
</form>
```

Tampilan tabel dari tabel_peserta.php:
```php
<table>
    <thead>
        <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Tanggal Lahir</th>
            <!-- other headers -->
        </tr>
    </thead>
    <tbody>
        <?php foreach ($peserta as $index => $p): ?>
            <tr>
                <td><?php echo $index + 1; ?></td>
                <td><?php echo htmlspecialchars($p['nama']); ?></td>
                <!-- other fields -->
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
```

### 1.2 Event Handling (15%)
Tiga event handler dan validasi JavaScript yang berbeda:

```javascript
// From script.js
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    let errors = [];
    
    // Validation 1: Name validation
    const namaRegex = /^[a-zA-Z\s]+$/;
    if (!namaRegex.test(nama.value.trim())) {
        namaError.textContent = 'Nama hanya boleh berisi huruf';
        errors.push('Nama hanya boleh berisi huruf');
        isValid = false;
    }

    // Validation 2: Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = 'Format email tidak valid';
        errors.push('Format email tidak valid');
        isValid = false;
    }

    // Validation 3: Phone number validation
    const teleponRegex = /^[0-9]+$/;
    if (!teleponRegex.test(noTelepon.value.trim())) {
        noTeleponError.textContent = 'Nomor telepon hanya boleh berisi angka';
        errors.push('Nomor telepon hanya boleh berisi angka');
        isValid = false;
    }
});
```

## Bagian 2: Server-side Programming (Bobot: 30%)

### 2.1 Pengelolaan Data dengan PHP (20%)
Penanganan POST dan validasi sisi server:

```php
// From daftar.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Input validation
    $nama = filter_input(INPUT_POST, 'nama', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    
    // Browser and IP capture
    $browser = $conn->real_escape_string($_SERVER['HTTP_USER_AGENT']);
    $ip_address = $conn->real_escape_string($_SERVER['REMOTE_ADDR']);
}
```

### 2.2 Objek PHP Berbasis OOP (10%)
Implementasi kelas dengan berbagai metode:

```php
// From Mahasiswa.php
class Mahasiswa {
    private $nama;
    private $email;
    // other properties

    // Method 1: Save participant
    public function simpanPeserta($conn) {
        $sql = "INSERT INTO peserta_lomba (nama, tanggal_lahir, ...) VALUES (...)";
        return $conn->query($sql);
    }

    // Method 2: Get participants
    public static function getDaftarPeserta($conn) {
        $sql = "SELECT * FROM peserta_lomba";
        $result = $conn->query($sql);
        return $peserta;
    }
}
```

## Bagian 3: Database Management (Bobot: 20%)

### 3.1 Pembuatan Tabel Database (5%)
```sql
-- From database.sql
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
```

### 3.2 Konfigurasi Koneksi Database (5%)
```php
// From database.php
class Database {
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'cyber_security_competition';
    public $conn;

    public function __construct() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);
    }
}
```

### 3.3 Manipulasi Data pada Database (10%)
```php
// From Mahasiswa.php - Insert data
public function simpanPeserta($conn) {
    $sql = "INSERT INTO peserta_lomba (...) VALUES (...)";
    return $conn->query($sql);
}

// Select data
public static function getDaftarPeserta($conn) {
    $sql = "SELECT * FROM peserta_lomba";
    $result = $conn->query($sql);
    return $peserta;
}
```

## Bagian 4: State Management (Bobot: 20%)

### 4.1 State Management dengan Session (10%)
```php
// From daftar.php
session_start();
$_SESSION['notification'] = [
    'type' => 'success',
    'message' => "Selamat! Pendaftaran berhasil disimpan!"
];
```

### 4.2 Pengelolaan State dengan Cookie dan Browser Storage (10%)
```javascript
// From script.js - Browser Storage
localStorage.setItem('pendaftaran_nama', nama.value);
localStorage.setItem('pendaftaran_email', email.value);

// Retrieve stored data
const storedNama = localStorage.getItem('pendaftaran_nama');
const storedEmail = localStorage.getItem('pendaftaran_email');
```
