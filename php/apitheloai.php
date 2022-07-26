<?php
require_once("server.php");//add code php file server vào trong file apitheloai.php
$event=$_POST['event'];//Lấy giá trị từ biến event từ client gửi lên theo dạng post  

switch ($event) {
	case "insertTL":
		$maloai=$_POST['maloai'];
		$tenloai=$_POST['tenloai'];   	
	    $rs=mysqli_query($conn,"select COUNT(*) as 'total' from  theloai where maloai='".$maloai."' ");
        $row=mysqli_fetch_array($rs);
        //$row['total->lấy ra mảng $row(1)
        //json->success
        if((int)$row['total']>0){
			 $res["success"] = 2; //{success:2} //đều có nghĩa là đã trùng tên
             
		}else{//ngược lại total=0(mã tl tin học không có nằm trong csdl)->insert mới
        $sql="INSERT INTO `theloai`(`maloai`, `tenloai`) VALUES ('".$maloai."','".$tenloai."')";

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
   
        case "updateTL":
                $maloai=$_POST['maloai'];
                $tenloai=$_POST['tenloai'];   
                //Viết câu lệnh update có điều kiện where maloai=biến client
                $sql="update theloai set TenLoai='".$tenloai."' where MaLoai='".$maloai."'";      
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
        case "deleteTL":
                    $maloai=$_POST['maloai'];
                     $rs=mysqli_query($conn,"select COUNT(*) as 'total' from sanpham where maloai='".$maloai."' ");
                     $row=mysqli_fetch_array($rs);
                    if((int)$row['total']>0){
                        $res["success"]=2;//mã loại đã được dùng trong bảng sách
                    }else{
                    //Kiểm tra maloai có xuất hiện các bảng (table khác hay không nếu có thì không xóa)
                    $sql="delete  from theloai  where MaLoai='".$maloai."'";      
                        if (mysqli_query($conn, $sql)) {
                            if(mysqli_affected_rows($conn)>0){
                                
                                     $res["success"] = 1; //xoá dữ liệu thành công
                            }
                            else{
                               $res["success"] = 0 ;//Không thành công
                            }
                        } else {
                            $res["success"] = 0;  //Không thành công
                        }
                    }
                    echo json_encode($res);
                    mysqli_close($conn);
                    break;
       //Get tất cả các TheLoai
       case "getALLTL":
		$mang=array();   
        $sql=mysqli_query($conn,"select maloai, tenloai from TheLoai"); 
		while($rows=mysqli_fetch_array($sql))
        {        
            $usertemp['maloai']=$rows['maloai'];//{'maloai':'TH','tentl':'tin hoc'}
			$usertemp['tenloai']=$rows['tenloai'];  //{'maloai':'TH','tentl':'tin hoc'}
            array_push($mang,$usertemp); //[{'maloai':'TH','tentl':'tin hoc'},{'maloai':'TH','tentl':'tin hoc'}]
        }       
        $jsonData['items'] =$mang; //{items:[{'maloai':'TH','tentl':'tin hoc'},{'maloai':'TH','tentl':'tin hoc'},{'maloai':'TH','tentl':'tin hoc'}]}
        echo json_encode($jsonData);
		mysqli_close($conn);
		break;
	
		default:
        # code...
        break;
    }
?>