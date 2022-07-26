
$(document).ready(function () {


    $(".addlistPhanHoi").on('click', function () {
        var ho = $(this).val();
        var ten = $(this).val();
        var email = $(this).val();
        var sdt = $(this).val();
        var tentieude = $(this).val();
        var noidung = $(this).val();
        var ngaytao = $(this).val()

    });
});
//viết hàm đọc phản hồi
function markRead(id) {
    var dataSend = {
        id: id,
        event: "mark"
    }
    console.log(dataSend);
    queryDataPost("php/apiphanhoi.php", dataSend, function (res) {
        if (res.success == 1) {
            alert_success("Đánh dấu đã đọc!!");
            showDataPhanHoi();
        } else {
            alert_error("Lỗi");
        }
    });
}

//viết hàm hiển thị dữ liệu lên table
function showDataPhanHoi() {
    //gửi dữ liệu lên server
    var dataSend = {

        event: "getPhanHoiChuaDoc"
    }
    //console.log(dataSend);

    queryDataPost("php/apiphanhoi.php", dataSend, function (res) {
        console.log(res);
        //mảng trả về bằng 0
        if (res.items.length == 0) {
            console.log(res);
            $(".addlistPhanHoiChuaDoc").html("<tr><td colspan=10>Không tìm thấy phản hồi chưa đọc</td><tr>");
        } else {
            var htmls = '';
            var list = res.items;
            var stt = 1;
            for (var item in list) {
                var d = list[item];
                htmls = htmls + ' <tr data-id="' + d.id + '">' +
                    '<td>' + stt + '</td>' +
                    '<td>' + d.ho + '</td>' +
                    '<td>' + d.ten + '</td>' +
                    '<td>' + d.email + '</td>' +
                    '<td>' + d.sdt + '</td>' +
                    '<td>' + d.tentieude + '</td>' +
                    '<td>' + d.noidung + '</td>' +
                    '<td>' + d.ngaytao + '</td>' +
                    '<td ><button onclick="markRead('+d.id+');" class="btn btn-danger btn-da-doc" style="width=120px" active>Đã đọc</button></td>' +
                    '</tr>';
                stt++;

            }
            console.log(htmls);
            $(".addlistPhanHoiChuaDoc").html(htmls);
        }

    });

    var dataSend = {
        event: "getMarkPhanHoi"
    }
    //console.log(dataSend);

    queryDataPost("php/apiphanhoi.php", dataSend, function (res) {
        console.log(res);
        //mảng trả về bằng 0
        if (res.items.length == 0) {
            console.log(res);
            $(".addMarkPhanHoi").html("<tr><td colspan=10>Không tìm thấy phản hồi đã đọc</td><tr>");
        } else {
            var htmls = '';
            var list = res.items;
            var stt = 1;
            for (var item in list) {
                var d = list[item];
                htmls = htmls + '<tr>' +
                    '<td>' + stt + '</td>' +
                    '<td>' + d.ho + '</td>' +
                    '<td>' + d.ten + '</td>' +
                    '<td>' + d.email + '</td>' +
                    '<td>' + d.sdt + '</td>' +
                    '<td>' + d.tentieude + '</td>' +
                    '<td>' + d.noidung + '</td>' +
                    '<td>' + d.ngaytao + '</td>' +
                    '<td ><button class="btn btn-danger" style="width=120px" disabled>Đã đọc</button></td>' +
                    '</tr>';
                stt++;

            }
            console.log(htmls);
            $(".addMarkPhanHoi").html(htmls);
        }

    });
}