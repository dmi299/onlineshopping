
$(document).ready(function(){
	var flag=0;//giả sử người dùng chưa nhấn nút thêm hoặc nút sửa
    $(".btnthemtl").on('click',function(){
		console.log("click them");
		//1.nhấn vào nút thì nút thêm thì mờ, lưu sáng, sửa mờ
		$(".btnthemtl").prop("disabled",true);
		$(".btnluutl").prop("disabled",false);
        $(".btnsuatl").prop("disabled",true);
		$(".txtmatl").prop("disabled",false);
		$(".txtmatl").focus();
		//2.Xóa các ô text field 
		resetViewTL();
		flag=1;//người dùng đã ấn vào
	});
	 $(".btnsuatl").on('click',function(){
		console.log("click sửa");
		//1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
		$(".btnthemtl").prop("disabled",true);
		$(".btnluutl").prop("disabled",false);
        $(".btnsuatl").prop("disabled",true);
		//đổi trạng thái
		flag=2;
	});
	$(".btnlamlaitl").on('click',function(){
		resetViewTL();
		flag=0;
		$(".btnthemtl").prop("disabled",false);
		$(".btnluutl").prop("disabled",true);
        $(".btnsuatl").prop("disabled",true);
		$(".txtmatl").prop("disabled",false);
	});

	//để người dùng để biết nhấn vào nút thêm hay nút sửa
	 $(".btnluutl").on('click',function(){
		 if(flag==1){
			console.log("Thêm");
			//1.Lấy dữ liệu trên form
			var maloai=$(".txtmatl").val();			
			var tenloai=$(".txttentl").val();
			if(maloai==""){
				alert_info("Mã Loại đang bị trống");
				$(".txtmatl").focus();

			}else if(tenloai==""){
				alert_info("Tên Loại đang bị trống");
				$(".txttentl").focus();
			}else{ ///dữ liệu của ta thỏa mản
				var dataclient={
					maloai:maloai,
					tenloai:tenloai,
					event:"insertTL"
				}
				//đưa lên một biến để server biết
				queryDataPost("php/apitheloai.php", dataclient, function(dataserver){
					console.log(dataserver);
					if(dataserver.success==2){
						alert_error("Bị trùng khóa");
					}else if(dataserver.success==1){
						showDataTheLoai();
						alert_success("Thêm Thành công");
						resetViewTL();
						flag=0;
					}else {
						alert_error("Thêm Không Thành công");
					}
				});	
				
			}

		 }else if(flag==2){
			 console.log("update");
			 //1.Lấy dữ liệu trên form
			var maloai=$(".txtmatl").val();			
			var tenloai=$(".txttentl").val();
			if(maloai==""){
				alert_info("Mã TL phải là khác khoảng trống");
				
				$(".txtmatl").focus();
			}else if(tenloai==""){
				alert_info("Tên TL phải là khác khoảng trống");
				$(".txttentl").focus();
			}else{ ///dữ liệu ta thỏa mản
				var dataclient={
					maloai:maloai,
					tenloai:tenloai,
					event:"updateTL"
				}
				queryDataPost("php/apitheloai.php",dataclient,function(dataserver){
					console.log(dataserver);
					 if(dataserver.success==1){
						alert_success("Update Thành công");
						showDataTheLoai();
						resetViewTL();
						flag=0;
					}else {
						alert_error("Update không thành công");
					}
				});	
				
			}

		 }else{
			 console.log("Bạn chưa thực hiên thao tác nào");
		 }
	 });

	 $(".btnxoatl").on('click',function(){
		  var maloai=$(".txtmatl").val();
		  var tenloai=$(".txttentl").val();
	 bootbox.confirm("Bạn có chắc xóa thể loại[ "+tenloai+" ] này không?", function(result){
        if(result==true) {
            
         var dataSend = {
			 event: "deleteTL",
                maloai:maloai
            };
            queryDataPost("php/apitheloai.php", dataSend, function (data) {
              if(data.success==1){
				showDataTheLoai();
				resetViewTL();
			  }else if(data.success==2){
				  alert_info("Thể loại đã được sử dụng trong bảng sản phẩm");
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

	 $(".addListTheLoai").on('click','td',function(){
		 console.log('ab');
		var maloai= $(this).parent().attr("data-matl");
		var tenloai= $(this).parent().attr("data-tentl");
		  $(".txtmatl").val(maloai);
		$(".txttentl").val(tenloai);

		$(".btnthemtl").prop("disabled",true);
		$(".btnluutl").prop("disabled",true);
        $(".btnsuatl").prop("disabled",false);
		//không cho xoá mã
		$(".txtmatl").prop("disabled",true);
	 });
 });

 //viết hàm
 function resetViewTL(){
	$(".txtmatl").val("");
	$(".txttentl").val("");
	//nhấn vào nút thêm thì con trỏ sẽ chớp
	$(".txtmatl").focus;
 }
 //viết hàm hiển thị dữ liệu lên table
 function showDataTheLoai(){
	 //gửi dữ liệu lên server
	var dataSend={
		event:"getALLTL"
	}

	queryDataPost("php/apitheloai.php", dataSend, function (data) {
		//mảng trả về bằng 0
		if(data.items.length==0){
			console.log(data);
			$(".addListTheLoai").html("<tr><td colspan=4>Không tìm thấy record</td><tr>");
		}else{
			var htmls='';
			var list=data.items;
			var stt=1;
			for(var item in list)
			{
					var d=list[item];
					htmls=htmls+'<tr data-matl="'+d.maloai+'" data-tentl="'+d.tenloai+'">'+
                            '<td>'+stt+'</td>'+
                            '<td>'+d.maloai+'</td>'+
                            '<td>'+d.tenloai+'</td>'+                                                                                          
                          '</tr>';
					stt++;
					
			}
			
			$(".addListTheLoai").html(htmls);
		}
		
	});
 }