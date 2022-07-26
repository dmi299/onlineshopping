var urlimagekhachhang = "";
var flagKH = 0;
$(document).ready(function () {
	$(".btnthemkh").on('click', function () {
		//1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
		$(".btnthemkh").prop("disabled", true);
		$(".btnluukh").prop("disabled", false);
		$(".btnsuakh").prop("disabled", true);
		$(".txtmakh").prop("disabled", false);
		$(".txtmakh").focus();
		//2.Xóa các ô text field 
		resetViewKH();
		flagKH = 1;//đã ấn vào
		urlimagekhachhang = "";
		$(".imgkhachhang").addClass("is-hidden");
		$("#imgkhachhang").val("");
		document.querySelector("#imgkhachhang").addEventListener('change', initUploadAllCommon);
	});
	$(".btnsuakh").on('click', function () {
		console.log("click them");
		//1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
		$(".btnthemkh").prop("disabled", true);
		$(".btnluukh").prop("disabled", false);
		$(".btnsuakh").prop("disabled", true);
		//đổi trạng thái
		flagKH = 2;
		document.querySelector("#imgkhachhang").addEventListener('change', initUploadAllCommon);
	});
	$(".btnlamlaikh").on('click', function () {
		resetViewKH();
		flagKH = 0;
		$(".btnthemkh").prop("disabled", false);
		$(".btnluukh").prop("disabled", true);
		$(".btnsuakh").prop("disabled", true);
		$(".txtmakh").prop("disabled", false);
		urlimagekhachhang = "";
		$(".imgkhachhang").addClass("is-hidden");
		$("#imgkhachhang").val("");
		document.querySelector("#imgkhachhang").removeEventListener('change', initUploadAllCommon);
	});
	//xoá hình ảnh
	$(".btndeletefilekhachhang").click(function () {
		var dataSend = {
			event: "deleteImage",
			linkdata: urlimagekhachhang
		}
		queryDataPost("php/apikhachhang.php", dataSend, function (res) {
			if (res.success == 1) {
				urlimagekhachhang = "";
				//hiển thị lên 
				$(".progresscommonkhachhang").html("Ảnh đại diện");
				$(".imgkhachhang").addClass("is-hidden");
				$("#imgPreviewKhachHang").attr("src", "");
			} else {
				alert_info("Lỗi xóa file");
			}
		});
	});

	//để biết ấn vào nút thêm hay nút sửa
	$(".btnluukh").on('click', function () {
		if (flagKH == 1) {
			console.log("Thêm");
			//1.Lấy dữ liệu trên form
			var makh = $(".txtmakh").val();
			var hotenkh = $(".txthotenkh").val();
			var ngaysinh = $(".txtngaysinhkh").val();
			var gioitinh = $(".cbgioitinhkh").val();
			var sdt = $(".txtsdtkh").val();
			var email = $(".txtemailkh").val();
			var diachi = $(".txtdiachikh").val();
			var matkhau = $(".txtmatkhaukh").val();
			if (hotenkh == "") {
				alert_info("Tên khách hàng đang trống");
				$(".txthotenkh").focus();
			} else if (ngaysinh == "") {
				alert_info("Ngày sinh đang trống");
				$(".txtngaysinhkh").focus();
			} else if (gioitinh == "") {
				alert_info("Giới tính đang trống");
				$(".cbgioitinhkh").focus();
			}
			else if (sdt == "") {
				alert_info("Số điện thoại đang trống");
				$(".txtsdtkh").focus();
			}
			else { ///dữ liệu ta thỏa mản
				var dataclient = {
					makh: makh,
					hotenkh: hotenkh,
					ngaysinh: ngaysinh,
					gioitinh: gioitinh,
					sdt: sdt,
					email: email,
					diachi: diachi,
					matkhau: matkhau,
					avatar: urlimagekhachhang,
					event: "insertKH"
				}
				console.log(dataclient);

				queryDataPost("php/apikhachhang.php", dataclient, function (dataserver) {
					console.log(dataserver);
					if (dataserver.success == 2) {
						alert_error("Bị trùng khóa");
					} else if (dataserver.success == 1) {
						alert_success("Thêm Thành công");
						showDataKH(0,record);
						resetViewKH();
						flagKH = 0;
						document.querySelector("#imgkhachhang").removeEventListener('change', initUploadAllCommon);
						$(".btnthemkh").prop("disabled", false);
						$(".btnluukh").prop("disabled", true);
						$(".btnsuakh").prop("disabled", true);
						$(".txtmakh").prop("disabled", false);
						urlimagekhachhang = "";
						$(".imgkhachhang").addClass("is-hidden");
						$("#imgkhachhang").val("");

					} else {
						alert_error("Thêm không thành công");
					}
				});

			}
		} else if (flagKH == 2) {
			//1.Lấy dữ liệu trên form
			var makh = $(".txtmakh").val();
			var hotenkh = $(".txthotenkh").val();
			var ngaysinh = $(".txtngaysinhkh").val();
			var gioitinh = $(".cbgioitinhkh").val();
			var sdt = $(".txtsdtkh").val();
			var email = $(".txtemailkh").val();
			var diachi = $(".txtdiachikh").val();
			var matkhau = $(".txtmatkhaukh").val();
			 if (hotenkh == "") {
				alert_info("Tên khách hàng đang trống");
				$(".txthotenkh").focus();
			} else if (ngaysinh == "") {
				alert_info("Ngày sinh đang trống");
				$(".txtngaysinhkh").focus();
			} else if (gioitinh == "") {
				alert_info("Giới tính đang trống");
				$(".cbgioitinhkh").focus();
			}
			else if (sdt == "") {
				alert_info("Số điện thoại đang trống");
				$(".txtsdtkh").focus();
			}
			else { ///dữ liệu ta thỏa mản
				var dataclient = {
					makh: makh,
					hotenkh: hotenkh,
					ngaysinh: ngaysinh,
					gioitinh: gioitinh,
					sdt: sdt,
					email: email,
					diachi: diachi,
					matkhau: matkhau,
					avatar: urlimagekhachhang,
					event: "updateKH"
				}
				console.log(dataclient);
				queryDataPost("php/apikhachhang.php", dataclient, function (dataserver) {
					console.log(dataserver);
					if (dataserver.success == 1) {
						alert_success("Update Thành công");
						showDataKH(0,record);
						resetViewKH();
						flagKH = 0;
						document.querySelector("#imgkhachhang").removeEventListener('change', initUploadAllCommon);
						$(".btnthemkh").prop("disabled", false);
						$(".btnluukh").prop("disabled", true);
						$(".btnsuakh").prop("disabled", true);
						$(".txtmakh").prop("disabled", false);
						urlimagekhachhang = "";
						$(".imgkhachhang").addClass("is-hidden");
						$("#imgkhachhang").val("");
					} else {
						alert_error("Update không thành công");
					}
				});

			}
		} else {
			console.log("bạn chưa thao tác thêm hoặc sửa");
		}
	});

	$(".btnxoakh").on('click', function () {
		var makh = $(".txtmakh").val();
		var hotenkh = $(".txthotenkh").val();
		bootbox.confirm("Bạn có chắc xóa khách hàng[ " + hotenkh + " ] này không?", function (result) {
			if (result == true) {
				var dataSend = {
					event: "deleteKH",
					makh: makh
				};

				queryDataPost("php/apikhachhang.php", dataSend, function (data) {
					if (data.success == 1) {
						showDataKH(0,record);
						resetViewKH();
						alert_success("xoá thành công");
						$(".btnthemkh").prop("disabled", false);
						$(".btnluukh").prop("disabled", true);
						$(".btnsuakh").prop("disabled", true);
						$(".txtmakh").prop("disabled", false);
						urlimagekhachhang = "";
						$(".imgkhachhang").addClass("is-hidden");
						$("#imgkhachhang").val("");
					} else if (data.success == 2) {
						alert_info("Khách hàng đã được sử dụng trong bảng đơn đặt hàng");
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
	$(".pagenumberKH").on('click', 'button', function () {
		console.log($(this).val());//xem số trang hiện tại
		showDataKH($(this).val(), record);
	});
	$(".btnfindKH").on('click', function () {
		showDataKH(0, record);
	});

	//nhấn phim (enter(mã 13))
	$(".txtfindKH").keypress(function (e) {
		if (e.which == 13) {
			showDataKH(0, record);
		}
	});

	//click chọn thay thế cho nút xem
	$(".addlistKH").on('click', 'td', function () {
		flagKH = 3;
		var makh = $(this).parent().attr("data-makh");
		var hotenkh = $(this).parent().attr("data-hotenkh");
		var ngaysinh = $(this).parent().attr("data-ngaysinh");
		var gioitinh = $(this).parent().attr("data-gioitinh");
		var sdt = $(this).parent().attr("data-sdt");
		var email = $(this).parent().attr("data-email");
		var diachi = $(this).parent().attr("data-diachi");
		var avatar = $(this).parent().attr("data-avatar");
		urlimagekhachhang = avatar;

		$(".txtmakh").val(makh);
		$(".txthotenkh").val(hotenkh);
		$(".txtngaysinhkh").val(ngaysinh);
		$(".cbgioitinhkh").val(gioitinh);
		$(".txtsdtkh").val(sdt);
		$(".txtemailkh").val(email);
		$(".txtdiachikh").val(diachi);

		$(".btnthemkh").prop("disabled", true);
		$(".btnluukh").prop("disabled", true);
		$(".btnsuakh").prop("disabled", false);
		$(".txtmakh").prop("disabled", true);
		$(".matkhaukh").addClass("is-hidden");
		//hiển thị lên 
		if (avatar == "" || avatar == "null") {
			$(".imgkhachhang").addClass("is-hidden");
		} else {
			$(".imgkhachhang").removeClass("is-hidden");
			$("#imgPreviewKhachHang").attr("src", "filesanpham/" + avatar);
		}
	});
});

function resetViewKH() {
	$(".txtmakh").val("");
	$(".txthotenkh").val("");
	$(".txtngaysinhkh").val("");
	$(".cbgioitinhkh").val("");
	$(".txtsdtkh").val("");
	$(".txtemailkh").val("");
	$(".txtmatkhaukh").val("");
	$(".txtdiachikh").val("");

	$(".txtmakh").focus();
	$(".btndeletefilekhachhang").removeClass("is-hidden");
	$(".matkhaukh").removeClass("is-hidden");
}

//Viết 1 hàm showData trên table Khachhang
function showDataKH(page, record) {
	//var find=$('.txtfindsanpham').val();
	var dataSend = {
		page: page,
		record: record,
		search: $(".txtfindKH").val(),
		event: "getKH"
	}
	console.log(dataSend);
	//load dữ liêu
	$('.addlistKH').html('<tr><td colspan=9><img src="images/loading.gif" width="30px" height="30px"/></td></tr>');
	queryDataPost("php/apikhachhang.php", dataSend, function (res) {
		if (res.items.length == 0) {
			console.log(res);
			//$(".addlistSanPham").html('<tr><td colspan=9>Không tìm thấy dữ liệu</td></tr>');
			//mất số trang
			$('.pagenumberKH').html("");
		} else {
			var stt = printSTT(record, res.page);
			var htmls = '';

			var list = res.items;
			var stt = 1;
			console.log(list);
			for (var item in list) {
				var d = list[item];
				htmls = htmls + ' <tr data-makh="' + d.makh +
					'" data-hotenkh="' + d.hotenkh +
					'" data-ngaysinh="' + d.ngaysinh +
					'" data-gioitinh="' + d.gioitinh +
					'" data-sdt="' + d.sdt +
					'" data-email="' + d.email +
					'" data-avatar="' + d.avatar +
					'" data-diachi="' + d.diachi + '">' +

					'<td>' + stt + '</td>' +
					'<td>' + d.makh + '</td>' +
					'<td>' + d.hotenkh + '</td>' +
					'<td>' + d.ngaysinh + '</td>' +
					'<td>' + d.gioitinh + '</td>' +
					'<td>' + d.sdt + '</td>' +
					'<td>' + d.email + '</td>' +
					'<td>' + d.diachi + '</td>' +

					'</tr>';
				stt++;
			}
			$(".addlistKH").html(htmls);
			console.log(htmls);
			buildSlidePage($('.pagenumberKH'), 5, res.page, res.totalpage);
		}
	});
}

function ketquauploadkhachhang(oj) {
	if (oj.status == true) {
		$(".progresscommonkhachhang").html("Ảnh đại diện: Tải thành công!!");
		urlimagekhachhang = oj.attach;
		//hiển thị lên 
		$(".imgkhachhang").removeClass("is-hidden");
		$("#imgPreviewKhachHang").attr("src", "filesanpham/" + urlimagekhachhang);
		if (flagKH == 2) {
			showDataKH(0, record);
		}
	} else {
		$(".progresscommonkhachhang").html("Ảnh đại diện: Tải thất bại");
	}
}

function xoaHinhAnhKH(urlimagekhachhang) {
	var dataSend = {
		event: "deleteImage",
		linkdata: urlimagekhachhang
	}
	queryDataPost("php/apikhachhang.php", dataSend, function (res) {
		if (res.success == 1) {
			//hiển thị lên 
			$(".progresscommonkhachhang").html("Ảnh đại diện");
			$(".imgkhachhang").addClass("is-hidden");
			$("#imgPreviewKhachHang").attr("src", "");
		} else {
			alert_info("Lỗi xóa file");
		}
	});

}


