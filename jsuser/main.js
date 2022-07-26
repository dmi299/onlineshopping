var flag_pic=0;
function swapMain(tenbien) {
  $(".formtheloai").addClass("is-hidden"); //ẩn
  $(".formsanpham").addClass("is-hidden"); //ẩn
  $(".formthuonghieu").addClass("is-hidden"); //ẩn
  $(".formnhacungcap").addClass("is-hidden"); //ẩn
  $(".formquanlydonhang").addClass("is-hidden"); //ẩn
  $(".formquanlyphanhoi").addClass("is-hidden"); //ẩn
  $(".formtaikhoannv").addClass("is-hidden"); //ẩn
  $(".formtaikhoankh").addClass("is-hidden"); //ẩn
  $("." + tenbien).removeClass("is-hidden");
}
var record = 3;
//sử dụng ajax
//dataSend: dữ liệu client gửi lên
function queryDataPost(url, dataSend, callback) {
  $.ajax({
    type: 'POST',
    url: url,
    data: dataSend,
    async: true,
    dataType: 'json',
    success: callback
  });
}
//sử dụng thư viện bootbox
function alert_error(mes) {
  bootbox.alert({
    size: "small",
    title: "",
    message: mes,
    callback: function () { /* your callback code */ }
  });
}
function alert_success(mes, callback) {
  bootbox.alert({
    size: "small",
    title: "",
    message: mes,
    callback: callback
  });
}
function alert_info(mes) {
  bootbox.alert({
    size: "small",
    title: "",
    message: mes,
    callback: function () { /* your callback code */ }
  });
}

//xử lý phân trang
function printSTT(record, pageCurr) {
  if ((pageCurr + 1) == 1) {
    return 1;
  } else {
    return record * (pageCurr + 1) - (record - 1);
  }
}
//đánh dấu số trang
function buildSlidePage(obj, codan, pageActive, totalPage) {
  var html = "";
  pageActive = parseInt(pageActive);
  for (i = 1; i <= codan; i++) {
    if (pageActive - i < 0) break;
    html = '<button type="button" class="btn btn-outline btn-default" value="' + (pageActive - i) + '">' + (pageActive - i + 1) + '</button>' + html;
  }
  if (pageActive > codan) {
    html = '<button type="button" class="btn btn-outline btn-default" value="' + (pageActive - i) + '">...</button>' + html;
  }
  html += '<button type="button" class="btn btn-outline btn-default" style="background-color: #5cb85c" value="' + pageActive + '">' + (pageActive + 1) + '</button>';
  for (i = 1; i <= codan; i++) {
    if (pageActive + i >= totalPage) break;
    html = html + '<button  type="button" class="btn btn-outline btn-default" value="' + (pageActive + i) + '">' + (pageActive + i + 1) + '</button>';
  }
  if (totalPage - pageActive > codan + 1) {
    html = html + '<button type="button" value="' + (pageActive + i) + '" class="btn btn-outline btn-default">...</button>';
  }
  obj.html(html);
}

//Hàm upload ảnh
function initUploadAllCommon() {
  'use strict';
  var resize = new window.resize();
  resize.init();

  event.preventDefault();
  var files = event.target.files;
  var countFile = files.length;
  for (var i in files) {
    if (typeof files[i] !== 'object') return false;

    (function () {

      var initialSize = files[i].size;

      resize.photo(files[i], 1200, 'file', function (resizedFile) {
        var resizedSize = resizedFile.size; 
        if (flag_pic == 0) {
          $(".progresscommon").html("Ảnh sản phẩm: Đang tải file");
        } else if (flag_pic == 1) {
          $(".progresscommonnhanvien").html("Ảnh đại diện: Đang tải file");
        } else if (flag_pic == 2) {
          $(".progresscommonkhachhang").html("Ảnh đại diện: Đang tải file");
        }
        upload(resizedFile, function (res) {
          //Lưu ý hàm này
          if (flag_pic == 0) {
            ketquauploadsanpham(JSON.parse(res));
          } else if (flag_pic == 1) {
            ketquauploadnhanvien(JSON.parse(res));
          } else if (flag_pic == 2) {
            ketquauploadkhachhang(JSON.parse(res));
          }

        });

        // This is not used in the demo, but an example which returns a data URL so yan can show the user a thumbnail before uploading th image.
        resize.photo(resizedFile, 600, 'dataURL', function (thumbnail) {
        });

      });

    }());

  }
}
var upload = function (photo, callback) {
  var formData = new FormData();
  formData.append('photo', photo);

  $.ajax({
    url: './spuploadimagestatus/process.php',
    type: 'POST',
    data: formData,
    async: true,
    xhrFields: {
      withCredentials: true
    },
    processData: false,  // tell jQuery not to process the data
    contentType: false,  // tell jQuery not to set contentType
    success: callback
  });
};

function buildUserDropdown() {

  myUser = JSON.parse(localStorage.getItem("uservegstore"));
  if (myUser == undefined || myUser == null || myUser == "") {
    location.href = "login.html";
  }
  else {
    var avatar = localStorage.getItem("avatarvegstore");

    $(".addusername").html("<div style='text-align=center;'>" + myUser.items[0].fullname + '<br><a href="#" class="btn_change_matkhau">[Đổi mật khẩu]</a>&nbsp;<a href="#" class="btn_log_out">[Logout]</a></div>');

    if (avatar == "" || avatar == undefined || avatar == "null") {
      $(".addavatar").attr("src", "images/mi.jpg");
    }
    else {
      $(".addavatar").attr("src", "filesanpham/" + avatar);
    }
  }
}

//Hàm đăg xuất
function logout() {
  localStorage.removeItem("remembervegstore");
  localStorage.removeItem("usernamevegstore");
  localStorage.removeItem("passwordvegstore");
  localStorage.removeItem("uservegstore");
  location.href = "login.html";
}

$(document).ready(function () {
  buildUserDropdown();//đã đăng nhập thành công
  $(".btn_log_out").click(function () {
    logout();
  });
  $(".btn_change_matkhau").click(function () {
    $('.showmodalchangematkhau').modal('show');
  });
 

  $(".btn_change_pass").click(function () {
    //var txtpassold=$('.txtpassold').val();
    var txtpassnew = $('.txtpassnew').val();
    var txtpassnewagain = $('.txtpassnewagain').val();
    if (txtpassnew == "" || txtpassnewagain == "") {
      alert_info("Mật khẩu không được trống");
    }
    else if (txtpassnew != txtpassnewagain) {
      alert_info("Mật khẩu cũ và mới không khớp");
    } else {
      var dataSend = {
        event: "updatepass",
        pass: txtpassnew,

        username: localStorage.getItem("usernamevegstore")
      }
      console.log(dataSend);
      $(".progesschangepass").html("<img src='images/loading.gif' width='5px' height='5px'/>");

      queryDataPost("php/apipass.php", dataSend, function (res) {
        console.log(res);
        if (res["updatepass"] == 1) {

          alert_info("Thay đổi mật khẩu thành công");
          $('.showmodalchangematkhau').modal('hide');
        } else {
          alert_info("Thay đổi mật khẩu thất bại");
        }

        $(".progesschangepass").html("");
      })
    }
  });


  $(".menutheloai").click(function () {
    $(".titlestatus").html(' <li class="breadcrumb-item"><a href="#">Danh Mục</a></li><li class="breadcrumb-item active">' + $(this).text() + '</li>');
    swapMain("formtheloai");

    //khi click thì nút thêm sẽ sáng lên, lưu và sửa sẽ mờ
    $(".btnthemtl").prop("disabled", false);
    $(".btnsuatl").prop("disabled", true);
    $(".btnluutl").prop("disabled", true);
    showDataTheLoai();

  })
  $(".menusanpham").click(function () {
    flag_pic = 0; //0 là đang trong sản phẩm
    $(".titlestatus").html(' <li class="breadcrumb-item"><a href="#">Danh Mục</a></li><li class="breadcrumb-item active">' + $(this).text() + '</li>');
    swapMain("formsanpham");
    showCBTheLoai();
    showCBNhaCC();
    $(".btnthemsp").prop("disabled", false);
    $(".btnsuasp").prop("disabled", true);
    $(".btnluusp").prop("disabled", true);
    showDataSanPham(0, record);


  })

  $(".menuthuonghieu").click(function () {
    $(".titlestatus").html(' <li class="breadcrumb-item"><a href="#">Danh Mục</a></li><li class="breadcrumb-item active">' + $(this).text() + '</li>');
    swapMain("formthuonghieu");
    $(".btnthemth").prop("disabled", false);
    $(".btnsuath").prop("disabled", true);
    $(".btnluuth").prop("disabled", true);
    showDataThuongHieu();

  })

  $(".menunhacungcap").click(function () {
    $(".titlestatus").html(' <li class="breadcrumb-item"><a href="#">Danh Mục</a></li><li class="breadcrumb-item active">' + $(this).text() + '</li>');
    swapMain("formnhacungcap");
    $(".btnthemnhacungcap").prop("disabled", false);
    $(".btnsuanhacungcap").prop("disabled", true);
    $(".btnluunhacungcap").prop("disabled", true);
    showDataNhaCungCap();

  })


  $(".menuquanlydonhang").click(function () {
    $(".titlestatus").html(' <li class="breadcrumb-item">Quản Lý Đơn Hàng</a></li></li>');
    swapMain("formquanlydonhang");
    showDataDonHang(0, record);

  })

  $(".menuquanlyphanhoi").click(function () {
    $(".titlestatus").html(' <li class="breadcrumb-item">Quản Lý Phản Hồi</a></li></li>');
    swapMain("formquanlyphanhoi");
    showDataPhanHoi();
  })

  $(".menunhanvien").click(function () {
    flag_pic = 1; //1 là ở tài khoản nhân viên
    $(".titlestatus").html(' <li class="breadcrumb-item"><a href="#">Quản lý tài khoản</a></li><li class="breadcrumb-item active">' + $(this).text() + '</li>');
    swapMain("formtaikhoannv");
    showDataNV(0, record);
  })
  $(".menukhachhang").click(function () {
    flag_pic = 2; //2 là ở tài khoản khách hàng
    $(".titlestatus").html(' <li class="breadcrumb-item"><a href="#">Quản lý tài khoản</a></li><li class="breadcrumb-item active">' + $(this).text() + '</li>');
    swapMain("formtaikhoankh");
    showDataKH(0, record);
  })
});

