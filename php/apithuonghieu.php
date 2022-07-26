<?php
require_once("server.php");//add code php file server vào trong file apithuonghieu.php
$event=$_POST['event'];//Lấy giá trị từ biến event từ client gửi lên theo dạng post  

switch ($event) {
	case "insertTH":
		$math=$_POST['math'];
		$tenth=$_POST['tenth']; 
        $diachi=$_POST['diachi'];
        $sdt=$_POST['sdt'];
        $email=$_POST['email'];  	
	    $rs=mysqli_query($conn,"select COUNT(*) as 'total' from  thuonghieu where math='".$math."' ");
        $row=mysqli_fetch_array($rs);
        //$row['total->lấy ra mảng $row(1)
        //json->success
        if((int)$row['total']>0){
			 $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
             
		}else{//ngược lại total=0(mã th không có nằm trong csdl)->insert mới
        $sql="INSERT INTO `thuonghieu`(`math`, `tenth`, `diachi`, `sdt`, `email`) VALUES ('".$math."','".$tenth."', '".$diachi."', '".$sdt."', '".$email."')";

        //nếu thực hiên được thì có 2 khả năng
            if (mysqli_query($conn, $sql)) {
				if(mysqli_affected_rows($conn)>0){ //có thay đổi dữ liệu
					
                         $res["success"] = 1; //Insert dữ liệu thành công
				}
				else{//không thay đổi dữ liệu
					$res["success"] = 0;//Không thành công
				}
            } else {
                $res["success"] = 0;  //Không thành công
            }
        }
        echo json_encode($res);//trả về cho client
        mysqli_close($conn);
        break;
   
        case "updateTH":
                $math=$_POST['math'];
                $tenth=$_POST['tenth'];  
                $diachi=$_POST['diachi'];
                $sdt=$_POST['sdt'];
                $email=$_POST['email']; 
                //Viết câu lệnh update có điều kiện where math=biến client
                $sql="update thuonghieu set TenTH='".$tenth."' where MaTH='".$math."'";      
                    if (mysqli_query($conn, $sql)) {
                        if(mysqli_affected_rows($conn)>0){
                            
                                 $res["success"] = 1; //update dữ liệu thành công
                        }
                        else{
                            $res["success"] = 0;//Không thành công
                        }
                    } else {
                        $res["success"] = 0;  //Không thành công
                    }
               
                echo json_encode($res);
                mysqli_close($conn);
                break; 
        case "deleteTH":
                    $math=$_POST['math'];
                    //Kiểm tra math có xuất các bảng (table khác hay không nếu có thì không xóa)
                    $sql="delete  from thuonghieu  where MaTH='".$math."'";      
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

       //Get tất cả các ThuongHieu
       case "getALLTH":
		$mang=array();   
        $sql=mysqli_query($conn,"select * from ThuongHieu"); 
		while($rows=mysqli_fetch_array($sql))
        {        
            $usertemp['math']=$rows['MaTH'];
			$usertemp['tenth']=$rows['TenTH'];
            $usertemp['diachi']=$rows['DiaChi'];
            $usertemp['sdt']=$rows['SDT'];
            $usertemp['email']=$rows['Email'];  
            array_push($mang,$usertemp); 
        }       
        $jsonData['items'] =$mang; 
        //gửi dữ liệu lên cho client
        echo json_encode($jsonData);
		mysqli_close($conn);
		break;
	
		default:
        # code...
        break;
    }
?>