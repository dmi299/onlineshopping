<?php
require_once("server.php");//add code php file server vào trong file apithuonghieu.php
$event=$_POST['event'];//Lấy giá trị từ biến event từ client gửi lên theo dạng post  

switch ($event) {
	case "insertNCC":
		$mancc=$_POST['mancc'];
		$tenncc=$_POST['tenncc']; 
        $diachi=$_POST['diachi'];
        $email=$_POST['email'];
        $sdt=$_POST['sdt'];  	
	    $rs=mysqli_query($conn,"select COUNT(*) as 'total' from  nhacungcap where mancc='".$mancc."' ");
        $row=mysqli_fetch_array($rs);
        //$row['total->lấy ra mảng $row(1)
        //json->success
        if((int)$row['total']>0){
			 $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
             
		}else{//ngược lại total=0(mã th không có nằm trong csdl)->insert mới
        $sql="INSERT INTO `nhacungcap`(`mancc`, `tenncc`, `diachi`, `email`, `sdt`) VALUES ('".$mancc."','".$tenncc."', '".$diachi."', '".$email."', '".$sdt."')";

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
   
        case "updateNCC":
                $mancc=$_POST['mancc'];
                $tenncc=$_POST['tenncc'];  
                $diachi=$_POST['diachi'];
                $email=$_POST['email'];
                $sdt=$_POST['sdt']; 
                //Viết câu lệnh update có điều kiện where mancc=biến client
                $sql="update nhacungcap set TenNCC='".$tenncc."' where MaNCC='".$mancc."'";      
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
        case "deleteNCC":
                    $mancc=$_POST['mancc'];
                    //Kiểm tra mancc$mancc có xuất các bảng (table khác hay không nếu có thì không xóa)
                    $sql="delete  from nhacungcap  where MaNCC='".$mancc."'";      
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

       //Get tất cả các NhaCungCap
       case "getALLNCC":
		$mang=array();   
        $sql=mysqli_query($conn,"select mancc, tenncc, diachi, email, sdt from NhaCungCap"); 
		while($rows=mysqli_fetch_array($sql))
        {        
            $usertemp['mancc']=$rows['mancc'];
			$usertemp['tenncc']=$rows['tenncc'];
            $usertemp['diachi']=$rows['diachi'];
            $usertemp['email']=$rows['email'];
            $usertemp['sdt']=$rows['sdt'];  
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