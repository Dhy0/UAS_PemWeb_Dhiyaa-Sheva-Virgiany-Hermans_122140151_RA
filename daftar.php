<?php
session_start();
require_once 'database.php';
require_once 'Mahasiswa.php';

$successMessage = '';
$errorMessage = '';

$nama = '';
$tanggal_lahir = '';
$asal_instansi = '';
$no_telepon = '';
$email = '';
$kategori_lomba = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama = filter_input(INPUT_POST, 'nama', FILTER_SANITIZE_STRING);
    $tanggal_lahir = filter_input(INPUT_POST, 'tanggal_lahir', FILTER_SANITIZE_STRING);
    $asal_instansi = filter_input(INPUT_POST, 'asal_instansi', FILTER_SANITIZE_STRING);
    $no_telepon = filter_input(INPUT_POST, 'no_telepon', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $kategori_lomba = filter_input(INPUT_POST, 'kategori_lomba', FILTER_SANITIZE_STRING);

    $errors = [];

    if (empty($nama)) {
        $errors[] = "Nama harus diisi";
    }

    if (empty($tanggal_lahir)) {
        $errors[] = "Tanggal lahir harus diisi";
    }

    if (empty($asal_instansi)) {
        $errors[] = "Asal instansi harus diisi";
    }

    if (empty($no_telepon)) {
        $errors[] = "Nomor telepon harus diisi";
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Email tidak valid";
    }

    if (empty($kategori_lomba)) {
        $errors[] = "Kategori lomba harus dipilih";
    }

    if (empty($errors)) {
        try {
            $database = new Database();
            $conn = $database->conn;

            $peserta = new Mahasiswa(
                $nama, 
                $tanggal_lahir, 
                $asal_instansi, 
                $no_telepon, 
                $email, 
                $kategori_lomba
            );

            if ($peserta->simpanPeserta($conn)) {
                $_SESSION['notification'] = [
                    'type' => 'success',
                    'message' => "Selamat! Pendaftaran berhasil disimpan!"
                ];

                $nama = '';
                $tanggal_lahir = '';
                $asal_instansi = '';
                $no_telepon = '';
                $email = '';
                $kategori_lomba = '';
                
                header("Location: daftar.php");
                exit();
            } else {
                $_SESSION['notification'] = [
                    'type' => 'error',
                    'message' => "Gagal menyimpan data. Silakan coba lagi."
                ];
            }
        } catch (Exception $e) {
            $_SESSION['notification'] = [
                'type' => 'error',
                'message' => "Terjadi kesalahan: " . $e->getMessage()
            ];
        }
    } else {
        $_SESSION['notification'] = [
            'type' => 'error',
            'message' => implode("<br>", $errors)
        ];
    }
}

$notification = null;
if (isset($_SESSION['notification'])) {
    $notification = $_SESSION['notification'];
    unset($_SESSION['notification']);
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Pendaftaran Lomba Cyber Security</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="icon" href="img/Cyber_security.png" type="image/x-icon" />
    <style>
        .notification {
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            display: none;
        }

        .notification.success {
            background-color: #004d00;
            color: #0f0;
            border: 1px solid #0f0;
        }

        .notification.error {
            background-color: #4d0000;
            color: #ff3333;
            border: 1px solid #ff3333;
        }
    </style>
</head>
<body>
    <nav>
        <ul>
            <li><a href="index.php">Home</a></li>
            <li><a href="daftar.php">Pendaftaran</a></li>
            <li><a href="tabel_peserta.php">Daftar Peserta</a></li>
        </ul>
    </nav>

    <div class="container">
        <h1>Pendaftaran Lomba Cyber Security</h1>
        
        <div id="notification" class="notification <?php echo $notification ? $notification['type'] : ''; ?>" 
             style="display: <?php echo $notification ? 'block' : 'none'; ?>">
            <?php echo $notification ? $notification['message'] : ''; ?>
        </div>

        <form id="pendaftaran-form" method="POST" action="">
            <div>
                <label for="nama">Nama Lengkap:</label>
                <input type="text" id="nama" name="nama" >
                <div id="nama-error" class="error"></div>
            </div>

            <div>
                <label for="tanggal_lahir">Tanggal Lahir:</label>
                <input type="date" id="tanggal_lahir" name="tanggal_lahir" >
            </div>

            <div>
                <label for="asal_instansi">Asal Instansi:</label>
                <input type="text" id="asal_instansi" name="asal_instansi" >
            </div>

            <div>
                <label for="no_telepon">Nomor Telepon:</label>
                <input type="tel" id="no_telepon" name="no_telepon" >
                <div id="no-telepon-error" class="error"></div>
            </div>

            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" >
                <div id="email-error" class="error"></div>
            </div>

            <div>
                <label for="kategori_lomba">Kategori Lomba:</label>
                <select id="kategori_lomba" name="kategori_lomba" >
                    <option value="">Pilih Kategori</option>
                    <option value="ctf">Capture The Flag (CTF)</option>
                    <option value="forensic">Forensic Analysis</option>
                    <option value="penetration">Penetration Testing</option>
                    <option value="vulnerability">Vulnerability Assessment</option>
                </select>
            </div>

            <button type="submit">Daftar</button>
        </form>
    </div>

    <script src="js/script.js"></script>
    <script src="js/storage-utils.js"></script>
</body>
</html>