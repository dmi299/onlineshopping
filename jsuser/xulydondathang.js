
$(document).ready(function () {

    $(".addlistDonHang").on('click', function () {
        var ngaydh = $(this).val();
        var ngaydukiengiao = $(this).val();
        var ngaythuctegiao = $(this).val();
        var hotenkh = $(this).val();
        var sdt = $(this).val();
        var email = $(this).val();

    });
});

//Xử lý các nút phân trang
$(".pagenumberdonhang").on('click', 'button', function () {
    console.log($(this).val());//xem số trang hiện tại
    showDataDonHang($(this).val(), record);
});

//hàm xử lý hoàn thành
function approve(id) {
    var dataSend = {
        id: id,

        event: "markDH"
    }
    console.log(dataSend);
    queryDataPost("php/apidondathang.php", dataSend, function (res) {
        if (res.success == 1) {
            alert_success("Đã ấn ");
            showDataDonHang();
        } else {
            alert_error("Lỗi");
        }
    });
}

//viết hàm hiển thị dữ liệu lên table
function showDataDonHang(page, record) {
    //gửi dữ liệu lên server
    var dataSend = {

        event: "getdonhangchuaxuly"
    }
    //console.log(dataSend);

    queryDataPost("php/apidondathang.php", dataSend, function (res) {
        console.log(res);
        //mảng trả về bằng 0
        if (res.items.length == 0) {
            console.log(res);
            $(".addlistdhchuaxuly").html("<tr><td colspan=10>Không tìm thấy đơn hàng nào</td><tr>");
        } else {
            var htmls = '';
            var list = res.items;
            var stt = 1;
            for (var item in list) {
                var d = list[item];
                htmls = htmls + ' <tr data-id="' + d.id + '">' +
                    '<td>' + stt + '</td>' +
                    '<td>' + d.ngaydh + '</td>' +
                    '<td>' + d.ngaydukiengiao + '</td>' +
                    '<td>' + d.ngaythuctegiao + '</td>' +
                    '<td>' + d.hotenkh + '</td>' +
                    '<td>' + d.sdt + '</td>' +
                    '<td>' + d.email + '</td>' +
                    '<td ><button onclick="approve(' + d.id + ');" class="btn btn-danger btn-hoanthanh btn-sm" style="width=120px ; margin-bottom : 10px;" active>Hoàn thành</button><button onclick="approve(' + d.id + ');" class="btn btn-success btn-dahuy" style="width=120px" active>Đã huỷ</button></td>' +
                    '</tr>';
                stt++;

            }
            console.log(htmls);
            $(".addlistdhchuaxuly").html(htmls);
        }
    });

    var dataSend = {
        page: page,
        record: record,
        event: "getdonhangdaxuly"
    }
    console.log(dataSend);

    queryDataPost("php/apidondathang.php", dataSend, function (res) {
        console.log(res);
        //mảng trả về bằng 0
        if (res.items.length == 0) {
            console.log(res);
            $(".addMarkDonHang").html("<tr><td colspan=10>Không tìm thấy đơn hàng</td><tr>");
        } else {
            var htmls = '';
            var list = res.items;
            var stt = 1;
            console.log()
            for (var item in list) {
                var d = list[item];
                if (d.trangthaidh == 0) {
                    htmls = htmls + '<tr>' +
                        '<td>' + stt + '</td>' +
                        '<td>' + d.ngaydh + '</td>' +
                        '<td>' + d.ngaydukiengiao + '</td>' +
                        '<td>' + d.ngaythuctegiao + '</td>' +
                        '<td>' + d.hotenkh + '</td>' +
                        '<td>' + d.sdt + '</td>' +
                        '<td>' + d.email + '</td>' +
                        '<td ><button class="btn btn-success" style="width=120px" disabled>Đã huỷ</button></td>' +
                        '</tr>';

                } else if (d.trangthaidh == 1){
                    htmls = htmls + '<tr>' +
                        '<td>' + stt + '</td>' +
                        '<td>' + d.ngaydh + '</td>' +
                        '<td>' + d.ngaydukiengiao + '</td>' +
                        '<td>' + d.ngaythuctegiao + '</td>' +
                        '<td>' + d.hotenkh + '</td>' +
                        '<td>' + d.sdt + '</td>' +
                        '<td>' + d.email + '</td>' +
                        '<td ><button class="btn btn-danger" style="width=120px" disabled>Hoàn thành</button></td>' +
                        '</tr>';

                }
                stt++;
            
            }
            console.log(htmls);
            $(".addMarkDonHang").html(htmls);
            buildSlidePage($('.pagenumberdonhang'), 5, res.page, res.totalpage);
        }

    });



}