$(document).ready(function () {
    var myUser = JSON.parse(localStorage.getItem("uservegstore"));
    console.log(myUser);
    console.log(localStorage.getItem("remembervegstore"));
    if (myUser != null || myUser != undefined) {
        var r = localStorage.getItem("remembervegstore");
        if (r == "true") {

            $(".txtemail").val(localStorage.getItem("usernamevegstore"));
            $(".txtpass").val(localStorage.getItem("passwordvegstore"));
        }
    }
    $(".btnlogin").click(function () {
        var username = $(".txtemail").val();
        var pass = $(".txtpass").val();
        if (username == "") {
            alert_info("Nhập tên đăng nhập");
        } else if (pass == "") {
            alert_info("Mật khẩu");

        } else {
            var datasend = {
                event: "login",
                username: username,
                password: pass
            };
            console.log(datasend);
            queryData("php/apilogin.php", datasend, function (data) {
                console.log(data);
                if (data.success == 1) {
                    if ($(".remember").is(':checked')) {
                        localStorage.setItem("remembervegstore", true);
                    } else {
                        localStorage.removeItem("remembervegstore");
                    }
                    localStorage.setItem("usernamevegstore", username);
                    localStorage.setItem("passwordvegstore", pass);
                    localStorage.setItem("avatarvegstore", data.items[0].avatar);
                    localStorage.setItem("uservegstore", JSON.stringify(data)); //lưu đối tượng
                    location.href = "index.html";	//chuyển sang index.html
                } else {
                    alert_success("Tài khoản chưa đúng");
                    $(".txtemail").val("");
                    $(".txtpass").val("");
                }

            });
        }
    });
});

function queryData(url, dataSend, callback) {

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
