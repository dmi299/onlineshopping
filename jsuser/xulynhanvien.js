var urlimagenhanvien = "";
var flagNV= 0;
$(document).ready(function () {
	$(".btnthemnv").on('click', function () {
		//1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
		$(".btnthemnv").prop("disabled", true);
		$(".btnluunv").prop("disabled", false);
		$(".btnsuanv").prop("disabled", true);
		$(".txtmanv").prop("disabled", false);
        $(".txtmanv").focus();
		//2.Xóa các ô text field 
		resetViewNV();
		flagNV = 1;//đã ấn vào
		urlimagenhanvien = "";
        $(".imgnhanvien").addClass("is-hidden");
        $("#imgnhanvien").val("");
        document.querySelector("#imgnhanvien").addEventListener('change', initUploadAllCommon);
		
	});
	$(".btnsuanv").on('click', function () {
		//console.log("click them");
		//1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
		$(".btnthemnv").prop("disabled", true);
		$(".btnluunv").prop("disabled", false);
		$(".btnsuanv").prop("disabled", true);
        //đổi trạng thái
		flagNV = 2;
        document.querySelector("#imgnhanvien").addEventListener('change', initUploadAllCommon);
	});

	$(".btnlamlainv").on('click', function () {
        resetViewNV();
		flagNV = 0;
		$(".btnthemnv").prop("disabled", false);
		$(".btnluunv").prop("disabled", true);
		$(".btnsuanv").prop("disabled", true);
		$(".txtmanv").prop("disabled", false);
        urlimagenhanvien = "";
		//bị ẩn đi
		$(".imgnhanvien").addClass("is-hidden");
		$("#imgnhanvien").val("");
		document.querySelector("#imgnhanvien").removeEventListener('change', initUploadAllCommon);
    });
	//xoá hình ảnh
    $(".btndeletefilenhanvien").click(function () {
        var dataSend = {
            event: "deleteImage",
            linkdata: urlimagenhanvien
        }
        queryDataPost("php/apinhanvien.php", dataSend, function (res) {
            if (res.success == 1) {
                urlimagenhanvien = "";
                //hiển thị lên 
                $(".progresscommonnhanvien").html("Ảnh đại diện");
                $(".imgnhanvien").addClass("is-hidden");
                $("#imgPreviewNhanVien").attr("src", "");
            } else {
                alert_info("Lỗi xóa file");
            }
        });
    });

    //để biết ấn vào nút thêm hay nút sửa
	$(".btnluunv").on('click', function () {
		if (flagNV == 1) {
			console.log("Thêm");
			//1.Lấy dữ liệu trên form
			var manv = $(".txtmanv").val();
			var hotennv = $(".txthotennv").val();
			var ngaysinh = $(".txtngaysinhnv").val();
			var gioitinh = $(".cbgioitinhnv").val();
            var sdt = $(".txtsdtnv").val();
            var email = $(".txtemailnv").val();
            var tendangnhap = $(".txttendangnhapnv").val();
			var matkhau = $(".txtmatkhaunv").val();
			 if (hotennv == "") {
				alert_info("Tên nhân viên đang trống");
				$(".txthotennv").focus();
			} else if (ngaysinh == "") {
				alert_info("Ngày sinh đang trống");
				$(".txtngaysinhnv").focus();
			} else if (gioitinh == "") {
				alert_info("Giới tính đang trống");
				$(".cbgioitinhnv").focus();
			} 
             else if (sdt == "") {
				alert_info("Số điện thoại đang trống");
				$(".txtsdtnv").focus();
			} 
            else if (email == "") {
				alert_info("Email đang bị trống");
				$(".txtemailnv").focus();
			} 
			else if (tendangnhap == "") {
				alert_info("Tên đăng nhập đang bị trống");
				$(".txttendangnhapnv").focus();
			} 
			else if (matkhau == "") {
				alert_info("Mật khẩu đang bị trống");
				$(".txtmatkhaunv").focus();
			} 
            else { ///dữ liệu ta thỏa mản
				var dataclient = {
					manv: manv,
					hotennv: hotennv,
					ngaysinh: ngaysinh,
                    gioitinh: gioitinh,
                    sdt: sdt,
                    email: email,
                    tendangnhap : tendangnhap,
					avatar: urlimagenhanvien,
					matkhau : matkhau,
					event: "insertNV"
				}
				console.log(dataclient);
				queryDataPost("php/apinhanvien.php", dataclient, function (dataserver) {
					console.log(dataserver);
					if (dataserver.success == 2) {
						alert_error("Bị trùng khóa");
					} else if (dataserver.success == 1) {
						showDataNV(0, record);
						alert_success("Thêm Thành công");
						resetViewNV();
						resetThemHinhAnhNV();
						flagNV = 0;
						document.querySelector("#imgnhanvien").removeEventListener('change', initUploadAllCommon);
					} else {
						alert_error("Thêm không thành công");
					}
				});

			}
		} else if (flagNV == 2) {
			var manv = $(".txtmanv").val();
			var hotennv = $(".txthotennv").val();
			var ngaysinh = $(".txtngaysinhnv").val();
			var gioitinh = $(".cbgioitinhnv").val();
            var sdt = $(".txtsdtnv").val();
            var email = $(".txtemailnv").val();
            var tendangnhap = $(".txttendangnhapnv").val();
			if (hotennv == "") {
				alert_info("Tên nhân viên đang trống");
				$(".txthotennv").focus();
			} else if (ngaysinh == "") {
				alert_info("Ngày sinh đang trống");
				$(".txtngaysinhnv").focus();
			} else if (gioitinh == "") {
				alert_info("Giới tính đang trống");
				$(".cbgioitinhnv").focus();
			} 
             else if (sdt == "") {
				alert_info("Số điện thoại đang trống");
				$(".txtsdtnv").focus();
			} 
            else if (email == "") {
				alert_info("Email đang bị trống");
				$(".txtemailnv").focus();
			} 
			else if (tendangnhap == "") {
				alert_info("Tên đăng nhập đang bị trống");
				$(".txttendangnhapnv").focus();
			} 
			
            else { ///dữ liệu ta thỏa mãn
				var dataclient = {
					manv: manv,
					hotennv: hotennv,
					ngaysinh: ngaysinh,
                    gioitinh: gioitinh,
                    sdt: sdt,
                    email: email,
                    tendangnhap : tendangnhap,
					avatar: urlimagenhanvien,
					event: "updateNV"
				}
				console.log(dataclient);
				queryDataPost("php/apinhanvien.php", dataclient, function (dataserver) {
					console.log(dataserver);
					if (dataserver.success == 1) {
						alert_success("Update Thành công");
						resetViewNV();
						showDataNV(0, record);
						resetThemHinhAnhNV();
						flagNV = 0;
						document.querySelector("#imgnhanvien").removeEventListener('change', initUploadAllCommon);
					} else {
						alert_error("Update không thành công");
					}
				});

			}
		} else {
			console.log("bạn chưa thao tác thêm hoặc sửa");
		}
	});

	$(".btnxoanv").on('click', function () {
		    var manv = $(".txtmanv").val();
			var hotennv = $(".txthotennv").val();
		bootbox.confirm("Bạn có chắc xóa nhân viên[ " + hotennv + " ] này không?", function (result) {
			if (result == true) {

				var dataSend = {
					event: "deleteNV",
					manv: manv
				};

				queryDataPost("php/apinhanvien.php", dataSend, function (data) {
					if (data.success == 1) {
						xoaHinhAnhNV(urlimagenhanvien);
                        showDataNV(0, record);
                        resetViewNV();
						resetThemHinhAnhNV();
						alert_success("xoá thành công");
					} else if (data.success == 2) {
						alert_info("Nhân viên đã được sử dụng trong bảng đơn đặt hàng");
					} else {
						alert_error("Xóa lỗi");
					}
				});
			} else {
				// alert_info("Lỗi");
			}
		});
	});

	
//Xử lý các nút mà phân trang
	$(".pagenumberNV").on('click', 'button', function () {
		console.log($(this).val());//xem số trang hiện tại
		showDataNV($(this).val(), record);
	});
	$(".btnfindNV").on('click', function () {
		showDataNV(0, record);
	});

	//nhấn phím
	$(".txtfindNV").keypress(function (e) {
		if (e.which == 13) {
			showDataNV(0, record);
		}
	});

	$(".addlistNV").on('click', 'td', function () {
		flagNV=3;
        $(".txttendangnhapnv").prop("readonly", true);
		var manv = $(this).parent().attr("data-manv");
		var hotennv = $(this).parent().attr("data-hotennv");
		var ngaysinh = $(this).parent().attr("data-ngaysinhnv");
		var gioitinh = $(this).parent().attr("data-gioitinhnv");
		var sdt = $(this).parent().attr("data-sdtnv");
		var email = $(this).parent().attr("data-emailnv");
		var tendangnhap = $(this).parent().attr("data-tendangnhapnv");
		var matkhau = $(this).parent().attr("data-matkhaunv");
        var avatar = $(this).parent().attr("data-avatarnv");
		urlimagenhanvien = avatar;

		$(".txtmanv").val(manv);
		$(".txthotennv").val(hotennv);
		$(".txtngaysinhnv").val(ngaysinh);
		$(".cbgioitinhnv").val(gioitinh);
		$(".txtsdtnv").val(sdt);
		$(".txtemailnv").val(email);
		$(".txttendangnhapnv").val(tendangnhap);
		$(".txtmatkhaunv").val(matkhau);

		$(".btnthemnv").prop("disabled", true);
		$(".btnluunv").prop("disabled", true);
		$(".btnsuanv").prop("disabled", false);
		$(".txtmanv").prop("disabled", true);
		$(".txthotennv").focus();

		$(".btndeletefilenhanvien").addClass("is-hidden");
        $(".matkhaunv").addClass("is-hidden");
		
		//hiển thị lên 
        if (avatar == "" || avatar == "null") {
            $(".imgnhanvien").addClass("is-hidden");
        } else {
            $(".imgnhanvien").removeClass("is-hidden");
            $("#imgPreviewNhanVien").attr("src", "filesanpham/" + avatar);
        }
	});
});

function resetViewNV() {
		$(".txtmanv").val("");
		$(".txthotennv").val("");
		$(".txtngaysinhnv").val("");
		$(".cbgioitinhnv").val("");
		$(".txtsdtnv").val("");
		$(".txtemailnv").val("");
        $(".txttendangnhapnv").val("");
		$(".txtmatkhaunv").val("");

		$(".txmanv").focus();
		$(".txttendangnhapnv").prop("readonly", false);
		$(".btndeletefilenhanvien").removeClass("is-hidden");
		$(".matkhaunv").removeClass("is-hidden");
}

//Viết 1 hàm showData trên table NhanVien
function showDataNV(page, record) {
	//var find=$('.txtfindsanpham').val();
	var dataSend = {
		page: page,
		record: record,
		search: $(".txtfindNV").val(),
		event: "getNV"
	}
	console.log(dataSend);
	//load dữ liêu
	$('.addlistNV').html('<tr><td colspan=9><img src="images/loading.gif" width="30px" height="30px"/></td></tr>');
	queryDataPost("php/apinhanvien.php", dataSend, function (res) {
		if (res.items.length == 0) {
			console.log(res);
			$(".addlistNV").html('<tr><td colspan=9>Không tìm thấy dữ liệu</td></tr>');
			//mất số trang
			$('.pagenumberNV').html("");
		} else {
			var stt=printSTT(record,res.page);
			var htmls = '';

			var list = res.items;
            var stt=1;
			console.log(list);
			for (var item in list) {
				var d = list[item];
				htmls = htmls + ' <tr data-manv="' + d.manv + '" data-hotennv="' + d.hotennv + '" data-ngaysinhnv="' + d.ngaysinh + '" data-gioitinhnv="' + d.gioitinh + '" data-sdtnv="' + d.sdt + '" data-emailnv="' + d.email + '" data-tendangnhapnv="' + d.tendangnhap + '" data-matkhaunv="' + d.matkhau + '" data-avatarnv="' + d.avatar+'">' +
					'<td>' + stt + '</td>' +
					'<td>' + d.manv + '</td>' +
					'<td>' + d.hotennv + '</td>' +
					'<td>' + d.ngaysinh + '</td>' +
					'<td>' + d.gioitinh + '</td>' +
					'<td>' + d.sdt + '</td>' +
                    '<td>' + d.email + '</td>' +
                    '<td>' + d.tendangnhap + '</td>' +
					'</tr>';
				stt++;
			}
			$(".addlistNV").html(htmls);
			console.log(htmls);
			buildSlidePage($('.pagenumberNV'),5,res.page,res.totalpage);
		}
	});
}
function ketquauploadnhanvien(oj) {
    if (oj.status == true) {
        $(".progresscommonnhanvien").html("Ảnh đại diện: Tải thành công!!");
        urlimagenhanvien = oj.attach;
        //hiển thị lên 
        $(".imgnhanvien").removeClass("is-hidden");
        $("#imgPreviewNhanVien").attr("src", "filesanpham/" + urlimagenhanvien);
        if (flagNV == 2) {
            showDataNV(0, record);
        }
    } else {
        $(".progresscommonnhanvien").html("Ảnh đại diện: Tải thất bại");
    }
}
function resetThemHinhAnhNV() {
    urlimagenhanvien = "";
    $(".progresscommonnhanvien").html("Ảnh đại diện");
    $(".imgnhanvien").addClass("is-hidden");
    $("#imgPreviewNhanVien").attr("src", "");
    document.querySelector("#imgnhanvien").removeEventListener('change', initUploadAllCommon);

}

function xoaHinhAnhNV(urlimagenhanvien) {
    var dataSend = {
        event: "deleteImage",
        linkdata: urlimagenhanvien
    }
    queryDataPost("php/apinhanvien.php", dataSend, function (res) {
        if (res.success == 1) {
            //hiển thị lên 
            $(".progresscommonnhanvien").html("Ảnh đại diện");
            $(".imgnhanvien").addClass("is-hidden");
            $("#imgPreviewNhanVien").attr("src", "");
        } else {
            alert_info("Lỗi xóa file");
        }
    });

}



