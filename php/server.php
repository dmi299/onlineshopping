<?php
$hostname = 'localhost';
$username = 'root';
$password = '';
$dbname = "cuahangraucuqua";

$conn = mysqli_connect($hostname, $username, $password,$dbname,3306);
if (!$conn) {
 die('Không thể kết nối: ' . mysqli_connect_error());
 exit();
}
//echo 'Kết nối thành công';
mysqli_set_charset($conn,"utf8");

//mysql_set_charset('utf8', $con);

?>
