<?php
require_once("server.php");//add code php file server vào trong file apithuonghieu.php
$event=$_POST['event'];//Lấy giá trị từ biến event từ client gửi lên theo dạng post  
switch ($event) {
case "updatepass":
		$username=$_POST['username'];
		$pass=sha1($_POST['pass']);
        $sql="update `users` set password='$pass' where username='".$username."'";
		 
            if (mysqli_query($conn,$sql)) {
				if(mysqli_affected_rows($conn)>0){
					$res[$event] = 1;
				}
				else
				{
					$res[$event] = 0;
				}
            } else {
                $res[$event] = 0;
            }
        echo json_encode($res);
        mysqli_close($conn);
        break;
}