<?php
require_once("server.php");//add code php file server vào trong file apitheloai.php
$event=$_GET['event'];//Lấy giá trị từ biến event từ client gửi lên theo dạng post  

switch ($event) {
       //Get tất cả các PhanHoi
       case "getALLPhanHoi":
		$mang=array();   
        $sql=mysqli_query($conn,"select * from phanhoisp"); 
		while($rows=mysqli_fetch_array($sql))
        {        
            $usertemp['ho']=$rows['Ho'];
			$usertemp['ten']=$rows['Ten']; 
            $usertemp['email']=$rows['Email'];
            $usertemp['sdt']=$rows['SDT'];
            $usertemp['tentieude']=$rows['TenTieuDe'];
            $usertemp['noidung']=$rows['NoiDung'];
            $usertemp['ngaytao']=$rows['NgayTao'];
            array_push($mang,$usertemp); 
        }       
        $jsonData['items'] =$mang; 
        echo json_encode($jsonData);
		mysqli_close($conn);
		break;
	
		default:
        # code...
        break;
    }
?>