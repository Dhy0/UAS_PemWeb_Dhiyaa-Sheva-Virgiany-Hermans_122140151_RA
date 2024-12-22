<?php
session_start();
require_once 'database.php';
require_once 'Mahasiswa.php';

// Inisialisasi koneksi database
$database = new Database();
$conn = $database->conn;

// Ambil daftar peserta
$peserta = Mahasiswa::getDaftarPeserta($conn);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Daftar Peserta Lomba Cyber Security</title>
    <link rel="stylesheet" href="css/styles.css">
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
        <h1>Daftar Peserta Lomba Cyber Security</h1>

        <?php if (isset($_SESSION['pendaftaran_berhasil']) && $_SESSION['pendaftaran_berhasil']): ?>
            <div class="success">
                Selamat! <?php echo htmlspecialchars($_SESSION['nama_pendaftar']); ?> berhasil terdaftar.
            </div>
            <?php 
            // Hapus session setelah ditampilkan
            unset($_SESSION['pendaftaran_berhasil']);
            unset($_SESSION['nama_pendaftar']);
            ?>
        <?php endif; ?>

        <?php if (count($peserta) > 0): ?>
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
                        <th>Browser</th>
                        <th>IP Address</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($peserta as $index => $p): ?>
                        <tr>
                            <td><?php echo $index + 1; ?></td>
                            <td><?php echo htmlspecialchars($p['nama']); ?></td>
                            <td><?php echo htmlspecialchars($p['tanggal_lahir']); ?></td>
                            <td><?php echo htmlspecialchars($p['asal_instansi']); ?></td>
                            <td><?php echo htmlspecialchars($p['no_telepon']); ?></td>
                            <td><?php echo htmlspecialchars($p['email']); ?></td>
                            <td><?php echo htmlspecialchars($p['kategori_lomba']); ?></td>
                            <td><?php echo htmlspecialchars($p['browser']); ?></td>
                            <td><?php echo htmlspecialchars($p['ip_address']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <p>Belum ada peserta terdaftar.</p>
        <?php endif; ?>
    </div>

    <script src="js/script.js"></script>
</body>
</html>