# Cyber Security Competition Website
# UAS Pemrograman Web - RA

# Bagian 1: Client-side Programming (30%)

## 1.1 Manipulasi DOM dengan JavaScript (15%)
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

## 1.2 Event Handling (15%)
Event handling dan validasi form di `script.js`:
```javascript
form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    let errors = [];
    
    // Validasi nama
    const namaRegex = /^[a-zA-Z\s]+$/;
    if (!namaRegex.test(nama.value.trim())) {
        errors.push('Nama hanya boleh berisi huruf');
        isValid = false;
    }

    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        errors.push('Format email tidak valid');
        isValid = false;
    }

    // Validasi nomor telepon
    const teleponRegex = /^[0-9]+$/;
    if (!teleponRegex.test(noTelepon.value.trim())) {
        errors.push('Nomor telepon hanya boleh berisi angka');
        isValid = false;
    }
});
```

# Bagian 2: Server-side Programming (30%)

## 2.1 Pengelolaan Data dengan PHP (20%)
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

## 2.2 Objek PHP Berbasis OOP (10%)
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

# Bagian 3: Database Management (20%)

## 3.1 Pembuatan Tabel Database (5%)
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

## 3.2 Konfigurasi Koneksi Database (5%)
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

## 3.3 Manipulasi Data pada Database (10%)
Di `Mahasiswa.php`:
```php
$sql = "INSERT INTO peserta_lomba (nama, tanggal_lahir, asal_instansi, no_telepon, email, kategori_lomba, browser, ip_address) 
        VALUES ('$nama', '$tanggal_lahir', '$asal_instansi', '$no_telepon', '$email', '$kategori_lomba', '$browser', '$ip_address')";
```

# Bagian 4: State Management (20%)

## 4.1 State Management dengan Session (10%)
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

## 4.2 Pengelolaan State dengan Browser Storage (10%)
Implementasi cookie dan storage di `storage-utils.js`:
```javascript
const CookieManager = {
    setCookie: function(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    },
    
    getCookie: function(name) {
        // ...
    },
    
    deleteCookie: function(name) {
        this.setCookie(name, "", -1);
    }
};

const StorageManager = {
    setItem: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    getItem: function(key) {
        return JSON.parse(localStorage.getItem(key));
    }
};
```

# Bagian Bonus: Hosting Aplikasi Web (20%)
## Link WebSite: <https://CyberBattleZone.great-site.net>

## Langkah-langkah Hosting Aplikasi Web (5%)

1. Persiapan File
   - Mengorganisir semua file proyek (PHP, CSS, JavaScript) ke dalam satu folder
   - Memastikan semua path relatif dalam kode sudah benar
   - Mengekspor database MySQL dari localhost

2. Pendaftaran di InfinityFree
   - Membuat akun di infinityfree.net
   - Memilih subdomain gratis atau menggunakan domain kustom
   - Mengaktifkan akun dan menunggu verifikasi

3. Upload File
   - Login ke control panel InfinityFree
   - Menggunakan File Manager untuk upload semua file website
   - Mengatur permission file (644 untuk file, 755 untuk folder)

4. Konfigurasi Database
   ```php
   // Mengupdate connection.php dengan kredensial InfinityFree
   private $host = "sql103.infinityfree.com"; // host database InfinityFree
   private $username = "if0_37966218"; // username database
   private $password = "Anakanak123"; // password database
   private $database = "if0_37966218_cyber_security_competition"; // nama database
   ```
   
## Pemilihan Penyedia Hosting (5%)

InfinityFree dipilih karena:
1. Fitur Gratis yang Memadai:
   - Hosting tanpa biaya
   - SSL gratis
   - Subdomain gratis
   - Database MySQL
   - Panel kontrol lengkap

2. Spesifikasi Teknis yang Mendukung:
   - PHP 7+ support
   - MySQL/MariaDB
   - 5GB disk space
   - Unlimited bandwidth
   - FTP access

3. Kesesuaian dengan Proyek:
   - Mendukung semua teknologi yang digunakan (PHP, MySQL, JavaScript)
   - Performa yang cukup untuk aplikasi skala kecil-menengah
   - Interface admin yang user-friendly

## Keamanan Aplikasi Web (5%)

1. Implementasi Keamanan Database
   ```php
   // Menggunakan prepared statements untuk mencegah SQL Injection
   $stmt = $conn->prepare("INSERT INTO peserta (nama_lengkap, umur) VALUES (?, ?)");
   $stmt->bind_param("si", $nama, $umur);
   ```

2. Validasi Input
   ```php
   // Server-side validation
   $nama = filter_input(INPUT_POST, 'nama', FILTER_SANITIZE_STRING);
   $umur = filter_input(INPUT_POST, 'umur', FILTER_VALIDATE_INT);
   ```

3. XSS Prevention
   ```php
   // Output escaping
   echo htmlspecialchars($row['nama_lengkap']);
   ```

4. Session Security
   ```php
   // Konfigurasi session yang aman
   ini_set('session.cookie_httponly', 1);
   ini_set('session.use_only_cookies', 1);
   session_start();
   ```

## Konfigurasi Server (5%)

1. PHP Configuration
   ```ini
   ; Mengatur php.ini melalui .htaccess
   php_value upload_max_filesize 10M
   php_value post_max_size 10M
   php_value max_execution_time 300
   php_value max_input_time 300
   ```

2. Server Security
   ```apache
   # Konfigurasi .htaccess untuk keamanan
   Options -Indexes
   ServerSignature Off
   
   # Protect Directory
   <FilesMatch "^\.">
     Order allow,deny
     Deny from all
   </FilesMatch>
   
   # Prevent Script Execution
   <Files ~ "\.(php|php3|php4|php5|phtml|pl|py|jsp|asp|htm|shtml|sh|cgi)$">
     deny from all
   </Files>
   ```

3. Database Configuration
   ```sql
   -- Mengoptimalkan performa database
   SET GLOBAL max_connections = 150;
   SET GLOBAL connect_timeout = 60;
   ```

4. Error Handling
   ```php
   // Konfigurasi error reporting yang aman untuk production
   error_reporting(E_ALL);
   ini_set('display_errors', 0);
   ini_set('log_errors', 1);
   ini_set('error_log', '/path/to/error.log');
   ```
