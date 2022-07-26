<?php
require_once("server.php"); //add code php file server vào trong file apisanpham.php
$event = $_POST['event']; //Lấy giá trị từ biến event từ client gửi lên theo dạng post  

switch ($event) {
    case "deleteImage":
		$filelinkanh=$_POST['linkdata'];
		
              if($filelinkanh==""){
					$res["success"] = 1;
				}else{
					$filelinkanh="../filesanpham/".$filelinkanh;
				if(unlink($filelinkanh)){
						$res["success"] = 1;
						
					}else{
						
						$res["success"] = 2;//file not exsit
					}
				}
				
		echo json_encode($res);
        mysqli_close($conn);
        break;

    case "insertSanPham":
        $masp = $_POST['masp'];
        $tensp = $_POST['tensp'];
        $maloai = $_POST['maloai'];
        $mancc = $_POST['mancc'];
        $gia = $_POST['gia'];
        $khuyenmai = $_POST['khuyenmai'];
        $hinhanhsp = $_POST['hinhanhsp'];
        $mota = $_POST['mota'];
        //kiểm tra mã sản phẩm có trùng không  		
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from  sanpham where masp='" . $masp . "'");
        $row = mysqli_fetch_array($rs);
        if ((int)$row['total'] > 0) {
            $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
        } else {
            $sql = "INSERT INTO `sanpham` (`masp`, `tensp`, `maloai`, `mancc`,`gia`,`khuyenmai`,`hinhanhsp`, `mota`) VALUES ('" . $masp . "','" . $tensp . "','" . $maloai . "', '". $mancc ."', '". $gia ."', '". $khuyenmai ."' , '". $hinhanhsp ."', '". $mota ."')";
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
    case "updateSanPham":
        $masp = $_POST['masp'];
        $tensp = $_POST['tensp'];
        $maloai = $_POST['maloai'];
        $mancc = $_POST['mancc'];
        $gia = $_POST['gia'];
        $khuyenmai = $_POST['khuyenmai'];
        $hinhanhsp = $_POST['hinhanhsp'];
        $mota = $_POST['mota'];
        //Viết câu lệnh update có điều kiện where maloai=biến client
        $sql = "update sanpham set tensp='" . $tensp . "',maloai='" . $maloai . "',mancc='" . $mancc . "', gia='" . $gia . "', khuyenmai='" . $khuyenmai . "', hinhanhsp='" . $hinhanhsp . "', mota='" . $mota . "' where masp='" . $masp . "'";
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

        case "deleteSP":
            $masp=$_POST['masp'];
            //Kiểm tra math có xuất các bảng (table khác hay không nếu có thì không xóa)
            $sql="delete  from sanpham  where MaSP='".$masp."'";      
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
    case "getSanPham":
        $mang = array();
        $record = $_POST['record']; //số dòng sẽ lấy về từ server
        $page = $_POST['page']; //số trang mà client
        $search = $_POST['search']; //Tìm kiếm dữ liệu
        $vt = $page * $record;  //page=1,record=2
        $limit = 'limit ' . $vt . ' , ' . $record;
        $sql = mysqli_query($conn, "select sp.masp,sp.tensp,sp.mancc,sp.maloai,ncc.tenncc,tl.tenloai, sp.gia, sp.khuyenmai, sp.hinhanhsp, sp.mota from sanpham sp,theloai tl, nhacungcap ncc where sp.mancc=ncc.mancc and sp.maloai=tl.maloai and (sp.masp like '%" . $search . "%' or sp.tensp like '%" . $search . "%') order by sp.masp asc " . $limit);
        while ($rows = mysqli_fetch_array($sql)) {
            //trên select không show gia, giakhuyenmai?
            $usertemp['masp'] = $rows['masp'];
            $usertemp['tensp'] = $rows['tensp'];
            $usertemp['maloai'] = $rows['maloai'];
            $usertemp['mancc'] = $rows['mancc'];
            $usertemp['tenloai'] = $rows['tenloai'];
            //tới đây nó đứng là xong,
            //sai 1 dòng, các dòng sau k thực hiện
            
            $usertemp['tenncc'] = $rows['tenncc'];
            $usertemp['gia'] = $rows['gia'];
            $usertemp['khuyenmai'] = $rows['khuyenmai'];
            $usertemp['hinhanhsp'] = $rows['hinhanhsp'];
            $usertemp['mota'] = $rows['mota'];
            array_push($mang, $usertemp);
        }
        $rs = mysqli_query($conn, "select COUNT(*) as 'total' from sanpham sp,theloai tl,nhacungcap ncc where sp.mancc=ncc.mancc and sp.maloai=tl.maloai and (sp.masp like '%" . $search . "%' or  sp.tensp like '%" . $search . "%') order by sp.masp asc ");
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
