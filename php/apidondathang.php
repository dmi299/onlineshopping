<?php
require_once("server.php"); //add code php file server vào trong file apitheloai.php
$event = $_POST['event']; //Lấy giá trị từ biến event từ client gửi lên theo dạng post  

switch ($event) {
    case "markDH":
        $id = $_POST['id'];
        $sql = "update dondathang set trangthaidh = 1 where id = $id";
        if (mysqli_query($conn, $sql)) {
            $res["success"] = 1;
        } else {
            $res["success"] = 0;
        }
        echo json_encode($res); //trả về cho client
        mysqli_close($conn);
        break;


    //Get tất cả các DonDatHang đã hoàn thành
    case "getdonhangchuaxuly":
        $mang = array();
        $sql = mysqli_query($conn, "select dh.id, dh.ngaydh, dh.ngaydukiengiao, dh.ngaythuctegiao, dh.makh, kh.hotenkh, kh.sdt, kh.email from dondathang dh, nhanvien nv, khachhang kh where dh.manv=nv.manv and dh.makh=kh.makh and dh.trangthaidh=0");
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['id'] = $rows['id'];
            $usertemp['ngaydh'] = $rows['ngaydh'];
            $usertemp['ngaydukiengiao'] = $rows['ngaydukiengiao'];
            $usertemp['ngaythuctegiao'] = $rows['ngaythuctegiao'];
            $usertemp['makh'] = $rows['makh'];
            $usertemp['hotenkh'] = $rows['hotenkh'];
            $usertemp['sdt'] = $rows['sdt'];
            $usertemp['email'] = $rows['email'];
            array_push($mang, $usertemp);
        }
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    case "getdonhangdaxuly":
        $mang = array();
        $record = $_POST['record']; //số dòng sẽ lấy về từ server
        $page = $_POST['page']; //số trang mà client
        $vt = $page * $record;  //page=1,record=2
        $limit = 'limit ' . $vt . ' , ' . $record;
        $sql = mysqli_query($conn, "select dh.id, dh.ngaydh, dh.ngaydukiengiao, dh.ngaythuctegiao, dh.makh, kh.hotenkh, kh.sdt, kh.email, dh.trangthaidh from dondathang dh, nhanvien nv, khachhang kh where dh.manv=nv.manv and dh.makh=kh.makh " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['id'] =intval($rows['id']);
            $usertemp['ngaydh'] = $rows['ngaydh'];
            $usertemp['ngaydukiengiao'] = $rows['ngaydukiengiao'];
            $usertemp['ngaythuctegiao'] = $rows['ngaythuctegiao'];
            $usertemp['makh'] = $rows['makh'];
            $usertemp['hotenkh'] = $rows['hotenkh'];
            $usertemp['sdt'] = $rows['sdt'];
            $usertemp['email'] = $rows['email'];
            $usertemp['trangthaidh'] = $rows['trangthaidh'];
            array_push($mang, $usertemp);
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from dondathang dh, nhanvien nv, khachhang kh where dh.manv=nv.manv and dh.makh=kh.makh ");
        $row = mysqli_fetch_array($rs);
        $jsonData['total'] = (int)$row['total'];
        $jsonData['totalpage'] = ceil($row['total'] / $record);
        $jsonData['page'] = (int)$page;
        $jsonData['items'] = $mang;
        echo json_encode($jsonData);
        mysqli_close($conn);
        break;

    default:
        # code...
        break;

}
