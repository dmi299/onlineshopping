<?php
require_once("server.php"); //add code php file server vào trong file apisanpham.php
$event = $_POST['event']; //Lấy giá trị từ biến event từ client gửi lên theo dạng post  

switch ($event) {
    case "deleteImage":
        $filelinkanh = $_POST['linkdata'];
        if ($filelinkanh == "") {
            $res["success"] = 1;
        } else {
            $filelinkanh = "../filesanpham/" . $filelinkanh;
            if (unlink($filelinkanh)) {
                $res["success"] = 1;
            } else {
                $res["success"] = 2; //file not exsit
            }
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "updatepass":
        $matkhaunv = sha1($_POST['matkhau']);
        $sql = "update khachhang set matkhau='$matkhau' where makh='" . $makh . "'";

        if (mysqli_query($conn, $sql)) {
            if (mysqli_affected_rows($conn) > 0) {
                $res[$event] = 1;
            } else {
                $res[$event] = 0;
            }
        } else {
            $res[$event] = 0;
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;

    case "insertKH":
        $makh = $_POST['makh'];
        $hotenkh = $_POST['hotenkh'];
        $ngaysinh = $_POST['ngaysinh'];
        $gioitinh = $_POST['gioitinh'];
        $sdt = $_POST['sdt'];
        $email = $_POST['email'];
        $diachi = $_POST['diachi'];
        $matkhau = sha1($_POST['matkhau']);
        $avatar = $_POST['avatar'];
        //kiểm tra mã khách hàng có trùng không  		
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  khachhang where makh='" . $makh . "'");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
        } else {
            $sql = "INSERT INTO khachhang(makh, hotenkh, ngaysinh, gioitinh, sdt, email, diachi, matkhau, avatar) VALUES ('" . $makh . "','" . $hotenkh . "','" . $ngaysinh . "', '". $gioitinh."', '". $sdt ."','". $email ."', '". $diachi ."','".$matkhau."','".$avatar."')";
            if (mysqli_query($conn, $sql)) {
                if (mysqli_affected_rows($conn) > 0) { //có thay đổi dữ liệu
                    $res["success"] = 1; //Insert dữ liệu thành công
                } else {
                    $res["success"] = 0; //Không thành công
                }
            } else {
                $res["success"] = 0;  //Không thành công
            }
        }
        echo json_encode($res);
        mysqli_close($conn);
        break;
    case "updateKH":
        
        $makh = $_POST['makh'];
        $hotenkh = $_POST['hotenkh'];
        $ngaysinh = $_POST['ngaysinh'];
        $gioitinh = $_POST['gioitinh'];
        $sdt = $_POST['sdt'];
        $email = $_POST['email'];
        $diachi = $_POST['diachi'];
        $avatar = $_POST['avatar'];
        //Viết câu lệnh update có điều kiện where maloai=biến client
        $sql = "update khachhang set hotenkh='" . $hotenkh . "',ngaysinh='" . $ngaysinh . "',gioitinh='" . $gioitinh . "',sdt='" . $sdt . "',email='" . $email . "',diachi='" . $diachi . "',avatar='" . $avatar . "' where makh='" . $makh . "'";
        if (mysqli_query($conn, $sql)) {
            if (mysqli_affected_rows($conn) > 0) {

                $res["success"] = 1; //update dữ liệu thành công
            } else {
                $res["success"] = 0; //Không thành công
            }
        } else {
            $res["success"] = 0;  //Không thành công
        }

        echo json_encode($res);
        mysqli_close($conn);
        break;

        case "deleteKH":
            $makh=$_POST['makh'];
            $sql="delete  from khachhang where makh='".$makh."'";      
                if (mysqli_query($conn, $sql)) {
                    if(mysqli_affected_rows($conn)>0){
                        
                             $res["success"] = 1; //update dữ liệu thành công
                    }
                    else{
                       $res["success"] = 0 ;//Không thành công
                    }
                } else {
                    $res["success"] = 0;  //Không thành công
                }
           
            echo json_encode($res);
            mysqli_close($conn);
            break;
    
        //gửi lên server
    case "getKH":
        $mang = array();
        $record = $_POST['record']; //số dòng sẽ lấy về từ server
        $page = $_POST['page']; //số trang mà client
        $search = $_POST['search']; //Tìm kiếm dữ liệu
        $vt = $page * $record;  //page=1,record=2
        $limit = 'limit ' . $vt . ' , ' . $record;
        $sql = mysqli_query($conn, "select kh.makh,kh.hotenkh,kh.ngaysinh,kh.gioitinh,kh.sdt,kh.email, kh.diachi, kh.avatar from khachhang kh where (kh.makh like '%" . $search . "%' or kh.hotenkh like '%" . $search . "%') order by kh.makh asc " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['makh'] = $rows['makh'];
            $usertemp['hotenkh'] = $rows['hotenkh'];
            $usertemp['ngaysinh'] = $rows['ngaysinh'];
            $usertemp['gioitinh'] = $rows['gioitinh'];
            $usertemp['sdt'] = $rows['sdt'];
            $usertemp['email'] = $rows['email'];
            $usertemp['diachi'] = $rows['diachi'];
            $usertemp['avatar'] = $rows['avatar'];
            array_push($mang, $usertemp);
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from khachhang kh where(kh.makh like '%" . $search . "%' or kh.hotenkh like '%" . $search . "%') order by kh.makh asc ");
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
?>
