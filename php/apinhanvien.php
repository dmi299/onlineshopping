<?php
require_once("server.php"); //add code php file server vào trong file apisanpham.php
$event = $_POST['event']; //Lấy giá trị từ biến event từ client gửi lên theo dạng POST  

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
        $tendangnhapnv = $_POST['tendangnhap'];
        $matkhaunv = sha1($_POST['matkhau']);
        $sql = "update nhanvien set matkhau='$matkhau' where tendangnhap='" . $tendangnhap . "'";

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

    case "insertNV":
        $manv = $_POST['manv'];
        $hotennv = $_POST['hotennv'];
        $ngaysinh = $_POST['ngaysinh'];
        $gioitinh = $_POST['gioitinh'];
        $sdt = $_POST['sdt'];
        $email = $_POST['email'];
        $tendangnhap = $_POST['tendangnhap'];
        $matkhau = sha1($_POST['matkhau']);
        $avatar = $_POST['avatar'];
        //kiểm tra mã khách hàng có trùng không  		
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  nhanvien where manv='" . $manv . "'");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
        } else {
            $sql = "INSERT INTO nhanvien(manv, hotennv, ngaysinh, gioitinh, sdt, email, tendangnhap, matkhau, avatar) VALUES ('" . $manv . "','" . $hotennv . "','" . $ngaysinh . "', '". $gioitinh."', '". $sdt ."','". $email ."', '". $tendangnhap ."', '". $matkhau ."', '". $avatar ."')";
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
    case "updateNV":
        $manv = $_POST['manv'];
        $hotennv = $_POST['hotennv'];
        $ngaysinh = $_POST['ngaysinh'];
        $gioitinh = $_POST['gioitinh'];
        $sdt = $_POST['sdt'];
        $email = $_POST['email'];
        $tendangnhap = $_POST['tendangnhap'];
        $avatar = $_POST['avatar'];
        //Viết câu lệnh update có điều kiện where manv=biến client
        $sql = "update nhanvien set hotennv='" . $hotennv . "',ngaysinh='" . $ngaysinh . "',gioitinh='" . $gioitinh . "',sdt='" . $sdt . "', email='" . $email . "', tendangnhap='" . $tendangnhap . "', avatar='" . $avatar . "' where manv='" . $manv . "'";
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

        case "deleteNV":
            $manv=$_POST['manv'];
            $sql="delete  from nhanvien where manv='".$manv."'";      
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
    case "getNV":
        $mang = array();
        $record = $_POST['record']; //số dòng sẽ lấy về từ server
        $page = $_POST['page']; //số trang mà client
        $search = $_POST['search']; //Tìm kiếm dữ liệu
        $vt = $page * $record;  //page=1,record=2
        $limit = 'limit ' . $vt . ' , ' . $record;
        $sql = mysqli_query($conn, "select nv.manv,nv.hotennv,nv.ngaysinh,nv.gioitinh,nv.sdt,nv.email, nv.tendangnhap, nv.matkhau, nv.avatar from nhanvien nv where (nv.manv like '%" . $search . "%' or nv.hotennv like '%" . $search . "%') order by nv.manv asc " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {
            $usertemp['manv'] = $rows['manv'];
            $usertemp['hotennv'] = $rows['hotennv'];
            $usertemp['ngaysinh'] = $rows['ngaysinh'];
            $usertemp['gioitinh'] = $rows['gioitinh'];
            $usertemp['sdt'] = $rows['sdt'];
             $usertemp['matkhau'] = $rows['matkhau'];
            $usertemp['avatar'] = $rows['avatar'];
            $usertemp['email'] = $rows['email'];
            $usertemp['tendangnhap'] = $rows['tendangnhap'];
            array_push($mang, $usertemp);
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from nhanvien nv where(nv.manv like '%" . $search . "%' or nv.hotennv like '%" . $search . "%') order by nv.manv asc ");
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
