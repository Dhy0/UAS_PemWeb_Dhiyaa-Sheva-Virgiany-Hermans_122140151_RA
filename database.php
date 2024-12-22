<?php
class Database {
    private $host = 'localhost';
    private $username = 'root';
    private $password = '';
    private $database = 'cyber_security_competition';
    public $conn;

    public function __construct() {
        // Membuat koneksi
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);

        // Memeriksa koneksi
        if ($this->conn->connect_error) {
            die("Koneksi gagal: " . $this->conn->connect_error);
        }
    }

    public function __destruct() {
        // Menutup koneksi
        $this->conn->close();
    }
}
?>