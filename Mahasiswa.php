<?php
class Mahasiswa {
    private $nama;
    private $tanggal_lahir;
    private $asal_instansi;
    private $no_telepon;
    private $email;
    private $kategori_lomba;

    // Constructor
    public function __construct($nama, $tanggal_lahir, $asal_instansi, $no_telepon, $email, $kategori_lomba) {
        $this->nama = $nama;
        $this->tanggal_lahir = $tanggal_lahir;
        $this->asal_instansi = $asal_instansi;
        $this->no_telepon = $no_telepon;
        $this->email = $email;
        $this->kategori_lomba = $kategori_lomba;
    }

    // Metode untuk menyimpan data peserta ke database
    public function simpanPeserta($conn) {
        $nama = $conn->real_escape_string($this->nama);
        $tanggal_lahir = $conn->real_escape_string($this->tanggal_lahir);
        $asal_instansi = $conn->real_escape_string($this->asal_instansi);
        $no_telepon = $conn->real_escape_string($this->no_telepon);
        $email = $conn->real_escape_string($this->email);
        $kategori_lomba = $conn->real_escape_string($this->kategori_lomba);
        $browser = $conn->real_escape_string($_SERVER['HTTP_USER_AGENT']);
        $ip_address = $conn->real_escape_string($_SERVER['REMOTE_ADDR']);

        $sql = "INSERT INTO peserta_lomba (nama, tanggal_lahir, asal_instansi, no_telepon, email, kategori_lomba, browser, ip_address) 
                VALUES ('$nama', '$tanggal_lahir', '$asal_instansi', '$no_telepon', '$email', '$kategori_lomba', '$browser', '$ip_address')";

        return $conn->query($sql);
    }

     // Metode untuk mendapatkan semua peserta
    public static function getDaftarPeserta($conn) {
        $sql = "SELECT * FROM peserta_lomba";
        $result = $conn->query($sql);
        
        $peserta = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $peserta[] = $row;
            }
        }
        return $peserta;
    }
}
?>