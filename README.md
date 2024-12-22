# Cyber Security Competition Website
# UAS Pemrograman Web - RA

## Bagian 1: Client-side Programming (30%)

### 1.1 Manipulasi DOM dengan JavaScript (15%)
Form input dengan 4+ elemen yang berbeda dapat ditemukan di `daftar.php`:
```html
<!-- Form dengan berbagai elemen input -->
<form id="pendaftaran-form" method="POST" action="">
    <input type="text" id="nama" name="nama">             <!-- Input text -->
    <input type="date" id="tanggal_lahir" name="tanggal_lahir"> <!-- Input date -->
    <input type="tel" id="no_telepon" name="no_telepon"> <!-- Input telephone -->
    <input type="email" id="email" name="email">         <!-- Input email -->
    <select id="kategori_lomba" name="kategori_lomba">   <!-- Input select -->
        <option value="">Pilih Kategori</option>
        <option value="ctf">Capture The Flag (CTF)</option>
        <option value="forensic">Forensic Analysis</option>
        <option value="penetration">Penetration Testing</option>
        <option value="vulnerability">Vulnerability Assessment</option>
    </select>
</form>
```

Tampilan data dalam tabel HTML di `tabel_peserta.php`:
```php
<table>
    <thead>
        <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Tanggal Lahir</th>
            <th>Asal Instansi</th>
            <th>Nomor Telepon</th>
            <th>Email</th>
            <th>Kategori Lomba</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($peserta as $index => $p): ?>
            <tr>
                <td><?php echo $index + 1; ?></td>
                <td><?php echo htmlspecialchars($p['nama']); ?></td>
                <!-- ... other fields ... -->
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>
```

### 1.2 Event Handling (15%)
Di `script.js`, terdapat implementasi 3 event handling berbeda:

1. Form submission validation:
```javascript
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    let errors = [];
    // ... validation logic
});
```

2. Nama validation dengan regex:
```javascript
const namaRegex = /^[a-zA-Z\s]+$/;
if (!namaRegex.test(nama.value.trim())) {
    namaError.textContent = 'Nama hanya boleh berisi huruf';
    errors.push('Nama hanya boleh berisi huruf');
    isValid = false;
}
```

3. Email format validation:
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email.value.trim())) {
    emailError.textContent = 'Format email tidak valid';
    errors.push('Format email tidak valid');
    isValid = false;
}
```

## Bagian 2: Server-side Programming (30%)

### 2.1 Pengelolaan Data dengan PHP (20%)
Di `daftar.php`:
```php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama = filter_input(INPUT_POST, 'nama', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    // ... other input processing
    
    // Browser dan IP capture
    $browser = $_SERVER['HTTP_USER_AGENT'];
    $ip_address = $_SERVER['REMOTE_ADDR'];
}
```

### 2.2 Objek PHP Berbasis OOP (10%)
Class `Mahasiswa` di `Mahasiswa.php` dengan dua metode:
```php
class Mahasiswa {
    // Method 1: Menyimpan data peserta
    public function simpanPeserta($conn) {
        $sql = "INSERT INTO peserta_lomba (...) VALUES (...)";
        return $conn->query($sql);
    }

    // Method 2: Mengambil daftar peserta
    public static function getDaftarPeserta($conn) {
        $sql = "SELECT * FROM peserta_lomba";
        $result = $conn->query($sql);
        return $peserta;
    }
}
```

## Bagian 3: Database Management (20%)

### 3.1 Pembuatan Tabel Database (5%)
Di `database.sql`:
```sql
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
Di `database.php`:
```php
class Database {
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'cyber_security_competition';
    
    public function __construct() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);
    }
}
```

### 3.3 Manipulasi Data pada Database (10%)
Di `Mahasiswa.php`:
```php
$sql = "INSERT INTO peserta_lomba (nama, tanggal_lahir, asal_instansi, no_telepon, email, kategori_lomba, browser, ip_address) 
        VALUES ('$nama', '$tanggal_lahir', '$asal_instansi', '$no_telepon', '$email', '$kategori_lomba', '$browser', '$ip_address')";
```

## Bagian 4: State Management (20%)

### 4.1 State Management dengan Session (10%)
Di berbagai file:
```php
// Start session di setiap file
session_start();

// Menyimpan notifikasi ke session
$_SESSION['notification'] = [
    'type' => 'success',
    'message' => "Selamat! Pendaftaran berhasil disimpan!"
];

// Menggunakan dan menghapus session data
if (isset($_SESSION['notification'])) {
    $notification = $_SESSION['notification'];
    unset($_SESSION['notification']);
}
```

### 4.2 Pengelolaan State dengan Browser Storage (10%)
Di `storage-utils.js`:
```javascript
const StorageUtils = {
    // Cookie Management
    setCookie: function(name, value, days = 7) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Strict";
    },

    getCookie: function(name) {
        // Implementation
    },

    deleteCookie: function(name) {
        // Implementation
    },

    // Local Storage Management
    setLocalStorage: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};
```

