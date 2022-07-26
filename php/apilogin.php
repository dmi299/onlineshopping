<?php
require_once("server.php");//add code php file server vào trong file apithuonghieu.php
$event=$_POST['event'];//Lấy giá trị từ biến event từ client gửi lên theo dạng post  
switch ($event) {
case "login":
	$mang=array();
		$username=$_POST['username'];
		$password=sha1($_POST['password']);
        $rs=mysqli_query($conn,"select * from users  where  username='".$username."' and `password`='".$password."'");
		//trả về ít nhất bằng 1
        if(mysqli_num_rows($rs)>0){
		while ($rows=mysqli_fetch_array($rs)){
			
            $usertemp['username']=$rows['username'];
            $usertemp['password']=$rows['password'];
			
			$usertemp['fullname']=$rows['fullname'];
			
			$usertemp['avatar']=$rows['avatar'];
			
			$usertemp['permission']=$rows['permission'];
			
		   array_push($mang,$usertemp);
		}
	
        $jsondata['success'] =1;//đăng nhập thành công
		
        $jsondata['items'] =$mang;
		
        echo json_encode($jsondata);
		}
		else{
		$jsondata['success'] =0;
		
        $jsondata['items'] =$mang;
		echo json_encode($jsondata);
		}

        mysqli_close($conn);
        break;
    }
?>