
$(document).ready(function(){
	var flag=0;//giả sử người dùng chưa nhấn nút thêm hoặc nút sửa
    $(".btnthemncc").on('click',function(){
		console.log("click them");
		//1.nhấn vào nút thì nút thêm thì mờ, lưu sáng, sửa mờ
		$(".btnthemncc").prop("disabled",true);
		$(".btnluuncc").prop("disabled",false);
        $(".btnsuancc").prop("disabled",true);
		$(".txtmancc").prop("disabled",false);
		$(".txtmancc").focus();
		//2.Xóa các ô text field 
		resetViewNCC();
		flag=1;//người dùng đã ấn vào
	});
	 $(".btnsuancc").on('click',function(){
		console.log("click sửa");
		//1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
		$(".btnthemncc").prop("disabled",true);
		$(".btnluuncc").prop("disabled",false);
        $(".btnsuancc").prop("disabled",true);
		//đổi trạng thái
		flag=2;
	});
	$(".btnlamlaincc").on('click',function(){
		resetViewNCC();
		flag=0;
		$(".btnthemncc").prop("disabled",false);
		$(".btnluuncc").prop("disabled",true);
        $(".btnsuancc").prop("disabled",true);
		$(".txtmancc").prop("disabled",false);
	});

	//để người dùng để biết nhấn vào nút thêm hay nút sửa
	 $(".btnluuncc").on('click',function(){

		 if(flag==1){
			console.log("click Lưu");
			//1.Lấy dữ liệu trên form
			var mancc=$(".txtmancc").val();			
			var tenncc=$(".txttenncc").val();
            var diachi=$(".txtdiachi").val();
            var email=$(".txtemail").val();
            var sdt=$(".txtsdt").val();
			if(mancc==""){
				alert_info("Mã Nhà Cung Cấp đang bị trống");
				$(".txtmancc").focus();

			}else if(tenncc==""){
				alert_info("Tên Nhà Cung Cấp đang bị trống");
				$(".txttenncc").focus();

			// }else if(email==""){
			// 	alert_info("Email Nhà Cung Cấp đang bị trống");
			// 	$(".txtemail").focus();
			// }else if email==""){
			// 	alert_info("Số Điện Thoại Nhà Cung Cấp đang bị trống");
			// 	$(".txttenncc").focus();
			// }else if(diachi==""){
			// 	alert_info("Địa Chỉ Nhà Cung Cấp đang bị trống");
			// 	$(".txtdiachi").focus();
			}

            else{ ///dữ liệu của ta thỏa mản
				var dataclient={
					mancc:mancc,
					tenncc:tenncc,
                    diachi: diachi,
                    email: email,
                    sdt: sdt,
					event:"insertNCC"
				}
				//đưa lên một biến để server biết
				queryDataPost("php/apinhacungcap.php", dataclient, function(dataserver){
					console.log(dataserver);
					if(dataserver.success==2){
						alert_error("Bị trùng khóa");
					}else if(dataserver.success==1){
						showDataNhaCungCap();
						alert_success("Thêm Thành công");
						resetViewNCC();
						flag=0;
					}else {
						alert_error("Thêm Không Thành công");
					}
				});	
				
			}

		 }else if(flag==2){
			 console.log("update");
			 //1.Lấy dữ liệu trên form
			var mancc=$(".txtmancc").val();			
			var tenncc=$(".txttenncc").val();
			var diachi=$(".txtdiachi").val();
			var email=$(".txtemail").val();
			var sdt=$(".txtsdt").val();
			if(mancc==""){
				alert_info("Mã NCC phải là khác khoảng trống");
				
				$(".txtmancc").focus();
			}else if(tenncc==""){
				alert_info("Tên NCC phải là khác khoảng trống");
				$(".txttenncc").focus();
			}else{ ///dữ liệu ta thỏa mản
				var dataclient={
					mancc:mancc,
					tenncc:tenncc,
					diachi:diachi,
				    email: email,
					sdt:sdt,
					event:"updateNCC"
				}
				queryDataPost("php/apinhacungcap.php",dataclient,function(dataserver){
					console.log(dataserver);
					 if(dataserver.success==1){
						alert_success("Update Thành công");
						showDataNhaCungCap();
						flag=0;
					}else {
						alert_error("Update Không Thành công");
					}
				});	
				
			}

		 }else{
			 console.log("Bạn chưa thực hiên thao tác nào");
		 }
	 });

	 $(".btnxoancc").on('click',function(){
		  var mancc=$(".txtmancc").val();
		  var tenncc=$(".txttenncc").val();
		  var diachi=$(".txtdiachi").val();
		  var email=$(".txtemail").val();
		  var sdt=$(".txtsdt").val();
	 bootbox.confirm("Bạn có chắc xóa nhà cung cấp[ "+tenncc+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteNCC",
                mancc:mancc,
				
            };
       
		
            queryDataPost("php/apinhacungcap.php", dataSend, function (data) {
              if(data.success==1){
				alert_success("xoá thành công")
				showDataNhaCungCap();
                resetViewNCC();
			  }else if(data.success==2){
				  alert_info("Nhà Cung Cấp đã được sử dụng trong bảng Sản Phẩm");
			  }else{
				  alert_error("Xóa lỗi");
			  }
            });
			
			
        }else
        {
            // alert_info("Lỗi");
        }
	 });
	 });

	 //vấn đề nằm chỗ này cú pháp $(".tenclass") 
	$(".addlistNhaCungCap").on('click','td',function(){
		console.log("ab");
		var mancc= $(this).parent().attr("data-mancc");
		var tenncc= $(this).parent().attr("data-tenncc");
		var diachi= $(this).parent().attr("data-diachi");
		var email= $(this).parent().attr("data-email");
		var sdt= $(this).parent().attr("data-sdt");

		$(".txtmancc").val(mancc);
		$(".txttenncc").val(tenncc);
		$(".txtdiachi").val(diachi);
		$(".txtemail").val (email);
		$(".txtsdt").val(sdt);

		$(".btnthemncc").prop("disabled",true);
		$(".btnluuncc").prop("disabled",true);
        $(".btnsuancc").prop("disabled",false);
		//không cho xoá mã
		$(".txtmancc").prop("disabled",true);
	});

 });

 //viết hàm
 function resetViewNCC(){
	$(".txtmancc").val("");
	$(".txttenncc").val("");
	$(".txtdiachi").val("");
	$(".txtemail").val("");
	$(".txtsdt").val("");
	//nhấn vào nút thêm thì con trỏ sẽ chớp
	$(".txtmancc").focus;

 }


 //viết hàm hiển thị dữ liệu lên table
 function showDataNhaCungCap(){
	 //gửi dữ liệu lên server
	var dataSend={
		event:"getALLNCC"
	}

	queryDataPost("php/apinhacungcap.php", dataSend, function (data) {
		//mảng trả về bằng 0
		if(data.items.length==0){
			console.log(data);
			$(".addlistNhaCungCap").html("<tr><td colspan=4>Không tìm thấy record</td><tr>");
		}else{
			var htmls='';
			var list=data.items;
		
			var stt=1;
			for(var item in list)
			{
					var d=list[item];
					htmls=htmls+'<tr data-mancc="'+d.mancc+'" data-tenncc="'+d.tenncc+'" data-diachi="'+d.diachi+'" data-email="'+d.email+'" data-sdt="'+d.sdt+'" >'+
                            '<td>'+stt+'</td>'+
                            '<td>'+d.mancc+'</td>'+
                            '<td>'+d.tenncc+'</td>'+  
                            '<td>'+d.diachi+'</td>'+ 
                            '<td>'+d.email+'</td>'+ 
                            '<td>'+d.sdt+'</td>'+                                                                                        
                          '</tr>';
					stt++;
			
			}
			 console.log(list); //cái này show cái data.items
			//console.log(htmls);
			
			$(".addlistNhaCungCap").html(htmls);
		}
		
	});
 }