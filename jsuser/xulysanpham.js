var urlimagesanpham = ""; //biến lưu tên tập tin hình ảnh 
var flagSanPham = 0;//giả sử người dùng chưa nhấn nút thêm hoặc nút sửa
$(document).ready(function () {
	
	$(".btnthemsp").on('click', function () {
		console.log("click them");
		//1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
		$(".btnthemsp").prop("disabled", true);
		$(".btnluusp").prop("disabled", false);
		$(".btnsuasp").prop("disabled", true);
		$(".txtmasp").prop("disabled", false);
		//2.Xóa các ô text field 
		resetViewSanPham();
		flagSanPham = 1;

		urlimagesanpham = "";
		//bị ẩn đi
		$(".imgSanPham").addClass("is-hidden");
        $("#imgSanPham").val("");
        document.querySelector("#imgSanPham").addEventListener('change', initUploadAllCommon);

	});
	$(".btnsuasp").on('click', function () {
		console.log("click them");
		//1.nhấn vào nút thì nút thêm, lưu sáng, sửa mờ
		$(".btnthemsp").prop("disabled", true);
		$(".btnluusp").prop("disabled", false);
		$(".btnsuasp").prop("disabled", true);
		flagSanPham = 2;
		document.querySelector("#imgSanPham").addEventListener('change', initUploadAllCommon);
	});
	$(".btnlamlaisp").on('click', function () {
		resetViewSanPham();
		flagSanPham = 0;
		$(".btnthemsp").prop("disabled", false);
		$(".btnluusp").prop("disabled", true);
		$(".btnsuasp").prop("disabled", true);
		$(".txtmasp").prop("disabled", false);

		urlimagesanpham = "";
		//bị ẩn đi
		$(".imgSanPham").addClass("is-hidden");
		$("#imgSanPham").val("");
		document.querySelector("#imgSanPham").removeEventListener('change', initUploadAllCommon);
	});
	$(".btnluusp").on('click', function () {
		if (flagSanPham == 1) {
			console.log("Thêm");
			//1.Lấy dữ liệu trên form
			var masp = $(".txtmasp").val();
			var tensp = $(".txttensp").val();
			var maloai = $(".cbtheloai").val();
			var mancc = $(".cbnhacc").val();
			var gia = $(".txtgia").val();
			var khuyenmai = $(".txtkhuyenmai").val();
			var mota = $(".txtmota").val();
			if (masp == "") {
				alert_info("Mã sản phẩm là khác khoảng trống");
				$(".txtmasp").focus();
			} else if (tensp == "") {
				alert_info("Tên sản phẩm phải là khác khoảng trống");
				$(".txttensp").focus();
			} else if (maloai == "0") {//chưa chọn thể loại
				alert_info("Chọn 1 thể loại cho sản phẩm");
				$(".cbtheloai").focus();
			} else if (mancc == "0") {
				alert_info("Chọn 1 nhà cung cấp cho sản phẩm");
				$(".cbnhacc").focus();
			} else { ///dữ liệu ta thỏa mản
				var dataclient = {
					masp: masp,
					tensp: tensp,
					maloai: maloai,
					mancc: mancc,
					gia: gia,
					khuyenmai: khuyenmai,
					hinhanhsp: urlimagesanpham,
					mota: mota,
					event: "insertSanPham"
					//sản phẩm có 1 đống dữ liệu gửi lên mỗi masp, tensp, ma????
				}
				console.log(dataclient);

				queryDataPost("php/apisanpham.php", dataclient, function (dataserver) {
					console.log(dataserver);
					if (dataserver.success == 2) {
						alert_error("Bị trùng khóa");
					} else if (dataserver.success == 1) {
						showDataSanPham(0, record);
						alert_success("Thêm Thành công");
						resetViewSanPham();
						flagSanPham = 0;
						document.querySelector("#imgSanPham").removeEventListener('change', initUploadAllCommon);
					} else {
						alert_error("Thêm không thành công");
					}
				});

			}
		} else if (flagSanPham == 2) {
			var masp = $(".txtmasp").val();
			var tensp = $(".txttensp").val();
			var maloai = $(".cbtheloai").val();
			var mancc = $(".cbnhacc").val();
			var gia = $(".txtgia").val();
			var khuyenmai = $(".txtkhuyenmai").val();
			var mota = $(".txtmota").val();
			if (masp == "") {
				alert_info("Mã sản phẩm là khác khoảng trống");
				// /điều kiện
				$(".txtmasp").focus();
			} else if (tensp == "") {
				alert_info("Tên sản phẩm phải là khác khoảng trống");
				$(".txttensp").focus();
			} else if (maloai == "0") {
				alert_info("Chọn 1 thể loại cho sản phẩm");
				$(".cbtheloai").focus();
			} else if (mancc == "0") {
				alert_info("Chọn 1 nhà cung cấp cho sản phẩm");
				$(".cbnhacc").focus();
			} else { ///dữ liệu ta thỏa mản
				var dataclient = {
					masp: masp,
					tensp: tensp,
					maloai: maloai,
					mancc: mancc,
					gia: gia,
					khuyenmai: khuyenmai,
					hinhanhsp: urlimagesanpham,
					mota: mota,
					event: "updateSanPham"
				}
				queryDataPost("php/apisanpham.php", dataclient, function (dataserver) {
					console.log(dataserver);
					if (dataserver.success == 1) {
						alert_success("Update Thành công");
						resetViewSanPham();
						showDataSanPham(0, record);
						flagSanPham = 0;
						document.querySelector("#imgSanPham").removeEventListener('change', initUploadAllCommon);
					} else {
						alert_error("Update không thành công");
					}
				});

			}
		} else {
			console.log("bạn chưa thao tác thêm hoặc sửa");
		}
	});



	$(".btnxoasp").on('click', function () {
		var masp = $(".txtmasp").val();
		var tensp = $(".txttensp").val();
		bootbox.confirm("Bạn có chắc xóa sản phẩm[ " + tensp + " ] này không?", function (result) {
			if (result == true) {

				var dataSend = {
					event: "deleteSP",
					masp: masp,
				};

				queryDataPost("php/apisanpham.php", dataSend, function (data) {
					if (data.success == 1) {
						alert_success("xoá thành công")
						showDataSanPham(0, record);
						resetViewSanPham();
						document.querySelector("#imgSanPham").removeEventListener('change', initUploadAllCommon);
					} else if (data.success == 2) {
						alert_info("Sản phẩm đã được sử dụng trong bảng Thể Loại");
					} else {
						alert_error("Xóa lỗi");
					}


				});


			} else {
				// alert_info("Lỗi");
			}
		});
	});


	//nhấn widnown + shift + f để sắp xxeesp lại code cài php intelephense rồi
	//xong rồi =)) làm thì gửi hết dữ liệu có trong ô text lên, lúc query bảng set full ra rồi gán hết quăng qa tí khỏi get nữa

	//Xử lý các nút mà phân trang
	$(".pagenumbersanpham").on('click', 'button', function () {
		console.log($(this).val());//xem số trang hiện tại
		showDataSanPham($(this).val(), record);
	});
	$(".btnfindsanpham").on('click', function () {
		showDataSanPham(0, record);
	});

	//nhấn phim (enter(mã 13))
	$(".txtfindsanpham").keypress(function (e) {
		if (e.which == 13) {
			showDataSanPham(0, record);
		}
	});

	//click chọn thay thế cho nút xem
	$(".addlistSanPham").on('click', 'td', function () {
		var masp = $(this).parent().attr("data-masp");
		var tensp = $(this).parent().attr("data-tensp");
		var maloai = $(this).parent().attr("data-maloai");
		var mancc = $(this).parent().attr("data-mancc");
		var gia = $(this).parent().attr("data-gia");
		var khuyenmai = $(this).parent().attr("data-khuyenmai");
		var hinhanhsp = $(this).parent().attr("data-hinhanhsp");
		var mota = $(this).parent().attr("data-mota");

		$(".txtmasp").val(masp);
		$(".txttensp").val(tensp);
		$(".cbtheloai").val(maloai);
		$(".cbnhacc").val(mancc);
		$(".txtgia").val(gia);
		$(".txtkhuyenmai").val(khuyenmai);
		urlimagesanpham = hinhanhsp;
		$(".txtmota").val(mota);
		//hiển thị lên 
		$(".imgSanPham").removeClass("is-hidden");
		$("#imgPreviewSanPham").attr("src", "filesanpham/" + urlimagesanpham);

		$(".btnthemsp").prop("disabled", true);
		$(".btnluusp").prop("disabled", true);
		$(".btnsuasp").prop("disabled", false);
		$(".txtmasp").prop("disabled", true);
	});
});

function resetViewSanPham() {
	$(".txtmasp").val("");
	$(".txttensp").val("");
	$(".cbtheloai").val("0");
	$(".cbnhacc").val("0");
	$(".txtgia").val("");
	$(".txtkhuyenmai").val("");
	//$(".txthinhanhsp").val("");
	$(".txtmota").val("");
	$(".txtmasp").focus();
}

//Viết 2 hàm để lấy dữ liệu từ server đổ vào combox 
function showCBTheLoai() {
	var dataSend = {
		event: "getALLTL"
	}
	queryDataPost("php/apitheloai.php", dataSend, function (res) {
		if (res.items.length == 0) {
			$('.cbtheloai').html("<option value='0'>Chọn 1 thể loại sản phẩm</option>");
		} else {
			//lấy được nhiều thể loại về
			var htmls = '<option value="0">Chọn 1 thể loại sản phẩm</option>';
			var list = res.items;
			for (var item in list) {
				//lấy được môt phần tử {'matl':'TH','tentl':'tin học'}
				var d = list[item];
				htmls = htmls + '<option value="' + d.maloai + '">' + d.tenloai + '</option>'
			}
			$('.cbtheloai').html(htmls);
		}
	});

}
function showCBNhaCC() {
	var dataSend = {
		event: "getALLNCC"
	}
	queryDataPost("php/apinhacungcap.php", dataSend, function (res) {
		if (res.items.length == 0) {
			$('.cbnhacc').html("<option value='0'>Chọn 1 nhà cung cấp</option>");
		} else {
			var htmls = '<option value="0">Chọn 1 nhà cung cấp</option>';
			var list = res.items;
			for (var item in list) {
				var d = list[item];
				htmls = htmls + '<option value="' + d.mancc + '">' + d.tenncc + '</option>'
			}
			$('.cbnhacc').html(htmls);
		}
	});
}

//Hàm lấy định dạng giá tiền

//Viết 1 hàm showData trên table SanPham
function showDataSanPham(page, record) {
	//var find=$('.txtfindsanpham').val();
	var dataSend = {
		page: page,
		record: record,
		search: $(".txtfindsanpham").val(),
		event: "getSanPham"
	}
	console.log(dataSend);
	//load dữ liêu
	$('.addlistSanPham').html('<tr><td colspan=9><img src="images/loading.gif" width="30px" height="30px"/></td></tr>');
	queryDataPost("php/apisanpham.php", dataSend, function (res) {
		if (res.items.length == 0) {
			console.log(res);
			//$(".addlistSanPham").html('<tr><td colspan=9>Không tìm thấy dữ liệu</td></tr>');
			//mất số trang
			$('.pagenumbersanpham').html("");
		} else {
			var stt = printSTT(record, res.page);
			var htmls = '';

			var list = res.items;
			console.log(list);
			for (var item in list) {
				var d = list[item];
				htmls = htmls + ' <tr data-masp="' + d.masp + '" data-tensp="' + d.tensp + '" data-maloai="' + d.maloai + '" data-mancc="' + d.mancc + '" data-gia="' + d.gia + '" data-khuyenmai="' + d.khuyenmai + '"  data-hinhanhsp="' + d.hinhanhsp + '" data-mota="' + d.mota + '">' +
					'<td>' + stt + '</td>' +
					'<td>' + d.masp + '</td>' +
					'<td>' + d.tensp + '</td>' +
					'<td>' + d.tenloai + '</td>' +
					'<td>' + d.tenncc + '</td>' +
					'<td>' + d.gia + '</td>' +
					//'<td>' + Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(d.gia); + '</td>'+
					'<td>' + d.khuyenmai + '</td>' +
					'<td>' + d.mota + '</td>' +
					'</tr>';
				stt++;
			}
			$(".addlistSanPham").html(htmls);
			// console.log(htmls);
			buildSlidePage($('.pagenumbersanpham'), 5, res.page, res.totalpage);
		}
	});
}

function ketquauploadsanpham(oj) {
	console.log(oj);
	if (oj.status == true) {
		$(".progresscommon").html("Ảnh sản phẩm:Tải Thành công");
		urlimagesanpham = oj.attach;
		//hiển thị lên 
		$(".imgSanPham").removeClass("is-hidden");
		$("#imgPreviewSanPham").attr("src", "filesanpham/" + urlimagesanpham);
		if (flagSanPham == 2) {
			showDataSanPham();
		}
	} else {
		$(".progresscommon").html("Ảnh sản phẩm:Tải thất bại");
	}
}
//Bắt sự kiện 
$(".btndeletefilesanpham").click(function () {

	var datasend = {
		event: "deleteImage",
		linkdata: urlimagesanpham
	}
	queryDataPost("php/apisanpham.php", datasend, function (res) {
		if (res.success == 1) {
			urlimagesanpham = "";
			//hiển thị lên 
			$(".progresscommon").html("Ảnh sản phẩm");
			$(".imgSanPham").addClass("is-hidden");
			$("#imgPreviewSanPham").attr("src", "");
		} else {
			alert_info("Lỗi xóa file");
		}
	});
});
