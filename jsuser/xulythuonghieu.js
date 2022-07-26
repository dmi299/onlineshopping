
$(document).ready(function(){
	var flag=0;//giả sử người dùng chưa nhấn nút thêm hoặc nút sửa
    $(".btnthemth").on('click',function(){
		console.log("click them");
		//1.nhấn vào nút thì nút thêm thì mờ, lưu sáng, sửa mờ
		$(".btnthemth").prop("disabled",true);
		$(".btnluuth").prop("disabled",false);
        $(".btnsuath").prop("disabled",true);
		$(".txtmath").prop("disabled",false);
		$(".txtmath").focus();
		//2.Xóa các ô text field 
		resetViewTH();
		flag=1;//người dùng đã ấn vào
	});
	 $(".btnsuath").on('click',function(){
		console.log("click sửa");
		//1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
		$(".btnthemth").prop("disabled",true);
		$(".btnluuth").prop("disabled",false);
        $(".btnsuath").prop("disabled",true);
		//đổi trạng thái
		flag=2;
	});
	$(".btnlamlaith").on('click',function(){
		resetViewTH();
		flag=0;
		$(".btnthemth").prop("disabled",false);
		$(".btnluuth").prop("disabled",true);
        $(".btnsuath").prop("disabled",true);
		$(".txtmath").prop("disabled",false);
	});

	//để người dùng để biết nhấn vào nút thêm hay nút sửa
	 $(".btnluuth").on('click',function(){

		 if(flag==1){
			console.log("click Lưu");
			//1.Lấy dữ liệu trên form
			var math=$(".txtmath").val();			
			var tenth=$(".txttenth").val();
            var email=$(".txtemail").val();
            var sdt=$(".txtsdt").val();
            var diachi=$(".txtdiachi").val();
			if(math==""){
				alert_info("Mã Thương Hiệu đang bị trống");
				$(".txtmath").focus();

			}else if(tenth==""){
				alert_info("Tên Thương Hiệu đang bị trống");
				$(".txttenth").focus();
			}else if(email==""){
				alert_info("Email Thương Hiệu đang bị trống");
				$(".txtemail").focus();
			// }else if(sdt==""){
			// 	alert_info("Số Điện Thoại Thương Hiệu đang bị trống");
			// 	$(".txttenth").focus();
			// }else if(diachi==""){
			// 	alert_info("Địa Chỉ Thương Hiệu đang bị trống");
			// 	$(".txtdiachi").focus();
			}

            else{ ///dữ liệu của ta thỏa mản
				var dataclient={
					math:math,
					tenth:tenth,
                    diachi: diachi,
                    sdt: sdt,
                    email: email,
					event:"insertTH"
				}
				//đưa lên một biến để server biết
				queryDataPost("php/apithuonghieu.php", dataclient, function(dataserver){
					console.log(dataserver);
					if(dataserver.success==2){
						alert_error("Bị trùng khóa");
					}else if(dataserver.success==1){
						showDataThuongHieu();
						alert_success("Thêm Thành công");
						resetViewTH();
						flag=0;
					}else {
						alert_error("Thêm Không Thành công");
					}
				});	
				
			}

		 }else if(flag==2){
			 console.log("update");
			 //1.Lấy dữ liệu trên form
			var math=$(".txtmath").val();			
			var tenth=$(".txttenth").val();
			var diachi=$(".txtdiachi").val();
			var sdt=$(".txtsdt").val();
			var email=$(".txtemail").val();
			if(math==""){
				alert_info("Mã TH phải là khác khoảng trống");
				
				$(".txtmath").focus();
			}else if(tenth==""){
				alert_info("Tên TH phải là khác khoảng trống");
				$(".txttenth").focus();
			}else{ ///dữ liệu ta thỏa mản
				var dataclient={
					math:math,
					tenth:tenth,
					diachi:diachi,
					sdt:sdt,
					email:email,
					event:"updateTH"
				}
				queryDataPost("php/apithuonghieu.php",dataclient,function(dataserver){
					console.log(dataserver);
					 if(dataserver.success==1){
						alert_success("Update Thành công");
						showDataThuongHieu();
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

	 $(".btnxoath").on('click',function(){
		  var math=$(".txtmath").val();
		  var tenth=$(".txttenth").val();
		  var diachi=$(".txtdiachi").val();
		  var sdt=$(".txtsdt").val();
		  var email=$(".txtemail").val();
	 bootbox.confirm("Bạn có chắc xóa thương hiệu[ "+tenth+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteTH",
                math:math,
				
            };
       
		
            queryDataPost("php/apithuonghieu.php", dataSend, function (data) {
              if(data.success==1){
				showDataThuongHieu();
                resetViewTH();
			  }else if(data.success==2){
				  alert_info("Thương Hiệu đã được sử dụng trong bảng SanPhamThuongHieu");
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
	$(".addlistThuongHieu").on('click','td',function(){
		var math= $(this).parent().attr("data-math");
		var tenth= $(this).parent().attr("data-tenth");
		var diachi= $(this).parent().attr("data-diachi");
		var sdt= $(this).parent().attr("data-sdt");
		var email= $(this).parent().attr("data-email");

		$(".txtmath").val(math);
		$(".txttenth").val(tenth);
		$(".txtdiachi").val(diachi);
		$(".txtsdt").val(sdt);
		$(".txtemail").val(email);

		$(".btnthemth").prop("disabled",true);
		$(".btnluuth").prop("disabled",true);
        $(".btnsuath").prop("disabled",false);
		//không cho xoá mã
		$(".txtmath").prop("disabled",true);
	});

 });

 //viết hàm
 function resetViewTH(){
	$(".txtmath").val("");
	$(".txttenth").val("");
	$(".txtdiachi").val("");
	$(".txtsdt").val("");
	$(".txtemail").val("");
	//nhấn vào nút thêm thì con trỏ sẽ chớp
	$(".txtmath").focus;

 }


 //viết hàm hiển thị dữ liệu lên table
 function showDataThuongHieu(){
	 //gửi dữ liệu lên server
	var dataSend={
		event:"getALLTH"
	}

	queryDataPost("php/apithuonghieu.php", dataSend, function (data) {
		//mảng trả về bằng 0
		if(data.items.length==0){
			console.log(data);
			$(".addlistThuongHieu").html("<tr><td colspan=4>Không tìm thấy record</td><tr>");
		}else{
			var htmls='';
			var list=data.items;
		
			var stt=1;
			for(var item in list)
			{
					var d=list[item];
					htmls=htmls+'<tr data-math="'+d.math+'" data-tenth="'+d.tenth+'" data-diachi="'+d.diachi+'" data-sdt="'+d.sdt+'" data-email="'+d.email+'" >'+
                            '<td>'+stt+'</td>'+
                            '<td>'+d.math+'</td>'+
                            '<td>'+d.tenth+'</td>'+  
                            '<td>'+d.diachi+'</td>'+ 
                            '<td>'+d.sdt+'</td>'+ 
                            '<td>'+d.email+'</td>'+                                                                                        
                          '</tr>';
					stt++;
			
			}
			
			$(".addlistThuongHieu").html(htmls);
		}
		
	});
 }