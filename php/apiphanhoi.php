<?php
require_once("server.php"); //add code php file server vào trong file apitheloai.php
$event = $_POST['event']; //Lấy giá trị từ biến event từ client gửi lên theo dạng post  

switch ($event) {
    case "mark":
        $id = $_POST['id'];
        $NgayCapNhat = date("Y-m-d H:i:s");
        $sql = "update phanhoisp set TrangThai = 1 where id = $id";
        if (mysqli_query($conn, $sql)) {
            $res["success"] = 1;
        } else {
            $res["success"] = 0;
        }
        echo json_encode($res); //trả về cho client
        mysqli_close($conn);
        break;


        //Get tất cả các PhanHoi
    case "getPhanHoiChuaDoc":
        $mang = array();
        $sql = mysqli_query($conn, "select * from phanhoisp where trangthai=0");
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['id'] = $rows['id'];
            $usertemp['ho'] = $rows['Ho'];
            $usertemp['ten'] = $rows['Ten'];
            $usertemp['email'] = $rows['Email'];
            $usertemp['sdt'] = $rows['SDT'];
            $usertemp['tentieude'] = $rows['TenTieuDe'];
            $usertemp['noidung'] = $rows['NoiDung'];
            $usertemp['ngaytao'] = $rows['NgayTao'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

        //Get phanhoi đã đọc
    case "getMarkPhanHoi":
        $mang = array();
        $sql = mysqli_query($conn, "select * from phanhoisp where trangthai=1");
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['id'] = intval($rows['id']);
            $usertemp['ho'] = $rows['Ho'];
            $usertemp['ten'] = $rows['Ten'];
            $usertemp['email'] = $rows['Email'];
            $usertemp['sdt'] = $rows['SDT'];
            $usertemp['tentieude'] = $rows['TenTieuDe'];
            $usertemp['noidung'] = $rows['NoiDung'];
            $usertemp['ngaytao'] = $rows['NgayTao'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    default:
        # code...
        break;
}
