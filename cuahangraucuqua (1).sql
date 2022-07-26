-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 08, 2021 at 03:47 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cuahangraucuqua`
--

-- --------------------------------------------------------

--
-- Table structure for table `chitietdh`
--

DROP TABLE IF EXISTS `chitietdh`;
CREATE TABLE IF NOT EXISTS `chitietdh` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `MaSP` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `id_DH` int(11) NOT NULL,
  `Gia` int(11) NOT NULL,
  `SoLuong` int(11) NOT NULL,
  `GiamGia` float NOT NULL,
  `TongTien` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `MaSP` (`MaSP`),
  KEY `id_DH` (`id_DH`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `chitietdh`
--

INSERT INTO `chitietdh` (`id`, `MaSP`, `id_DH`, `Gia`, `SoLuong`, `GiamGia`, `TongTien`) VALUES
(1, 'BM004', 2, 10000, 2, 5000, 15000),
(2, 'CG003     ', 1, 15000, 5, 2000, 72800);

-- --------------------------------------------------------

--
-- Table structure for table `dondathang`
--

DROP TABLE IF EXISTS `dondathang`;
CREATE TABLE IF NOT EXISTS `dondathang` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NgayDH` timestamp NULL DEFAULT NULL,
  `NgayDuKienGiao` datetime DEFAULT NULL,
  `NgayThucTeGiao` datetime DEFAULT NULL,
  `MaNV` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `MaKH` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `trangthaidh` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `MaNV` (`MaNV`),
  KEY `MaKH` (`MaKH`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dondathang`
--

INSERT INTO `dondathang` (`ID`, `NgayDH`, `NgayDuKienGiao`, `NgayThucTeGiao`, `MaNV`, `MaKH`, `trangthaidh`) VALUES
(1, '2021-11-16 18:09:58', '2021-11-16 01:09:58', '2021-11-08 01:09:58', 'NV001', 'KH001', '0\r\n'),
(2, '2021-11-04 18:09:58', '2021-11-09 01:09:58', '2021-11-14 01:09:58', 'NV002', 'KH003', '1'),
(3, '2021-11-04 18:09:58', '2021-11-16 01:09:58', '2021-11-08 01:09:58', 'NV001', 'KH004', '1'),
(4, '2021-11-04 18:09:58', '2021-11-16 01:09:58', '2021-11-08 01:09:58', 'NV001', 'KH004', '1'),
(5, '2021-11-04 18:09:58', '2021-11-09 01:09:58', '2021-11-14 01:09:58', 'NV001', 'KH006', '1'),
(6, '2021-11-04 18:09:58', '2021-11-09 01:09:58', '2021-11-14 01:09:58', 'NV001', 'KH006', '1'),
(7, '2021-11-16 20:53:08', '2021-11-16 01:09:58', '2021-11-14 01:09:58', 'NV002', 'KH004', '1'),
(8, '2021-11-09 21:00:00', '2021-11-09 01:09:58', '2021-11-14 01:09:58', 'NV001', 'KH004', '1'),
(9, '2021-11-04 18:09:58', '2021-11-16 01:09:58', '2021-11-14 01:09:58', 'NV002', 'KH005', '1'),
(10, '2021-11-16 20:53:08', '2021-11-09 01:09:58', '2021-11-08 01:09:58', 'NV001', 'KH006', '0'),
(11, '2021-11-16 20:53:08', '2021-11-09 01:09:58', '2021-11-08 01:09:58', 'NV002', 'KH004', '0');

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
CREATE TABLE IF NOT EXISTS `khachhang` (
  `MaKH` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `HoTenKH` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `NgaySinh` date DEFAULT NULL,
  `GioiTinh` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SDT` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DiaChi` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `MatKhau` text COLLATE utf8_unicode_ci NOT NULL,
  `Avatar` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`MaKH`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`MaKH`, `HoTenKH`, `NgaySinh`, `GioiTinh`, `SDT`, `Email`, `DiaChi`, `MatKhau`, `Avatar`) VALUES
('KH001', 'Cái Thị Huyền Nương', '2001-01-18', 'Nữ', '0378423518', 'huyenuong@gmail.com', '37 Tôn Đức Thắng P.Bến Nghé,Thành phố Hồ Chí Minh, TP Hồ Chí Minh', '', '74d09674d5f79e2be7cdb015eca65245.jpeg'),
('KH002', 'Đỗ Đặng Thuỳ Trang', '1999-01-01', 'Nữ', '0352380634', 'thuytrang1999@gmail.com', '60 Trường Sơn, Thành phố Hồ Chí Minh, TP Hồ Chí Minh', '', '53a0119567937ea3580d35303cbcc65e.jpeg'),
('KH003', 'Trần Đinh Công Mẫn', '2004-04-26', 'Nam', '0985974425', 'congman2004@gmail.com', '01 Đinh Lễ P.12,, Thành phố Hồ Chí Minh, TP Hồ Chí Minh', '', ''),
('KH004', 'Nguyễn Hoài Linh', '2001-09-16', 'Nam', '0949613470', 'thuhan@gmail.com', '86 Nguyễn Cửu Vân,, Thành phố Hồ Chí Minh, TP Hồ Chí Minh', '', ''),
('KH005', 'Đinh Thị Quỳnh Như', '2001-12-12', 'Nữ', '0375703349', 'quynhnhu@gmail.com', '443/11 Lê Văn Sỹ, Thành phố Hồ Chí Minh, TP Hồ Chí Minh', '', ''),
('KH006', 'Lê Quỳnh Ngân', '2001-04-16', 'Nữ', '0756432765', 'quynhngan@gmail.com', '76 Lê Lai P.Bến Thành, Thành phố Hồ Chí Minh, TP Hồ Chí Minh', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `nhacungcap`
--

DROP TABLE IF EXISTS `nhacungcap`;
CREATE TABLE IF NOT EXISTS `nhacungcap` (
  `MaNCC` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `TenNCC` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `DiaChi` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `SDT` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`MaNCC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `nhacungcap`
--

INSERT INTO `nhacungcap` (`MaNCC`, `TenNCC`, `DiaChi`, `Email`, `SDT`) VALUES
('NCC001', 'Thực Phẩm Đồng Xanh', '34/23 Hoàng Ngọc Phách P. Phú Thọ Hòa Quận Tân Phú', 'tpdongxanh@gmail.com', '0936685268'),
('NCC002', 'Thực Phẩm Sạch Hữu Cơ Tấn Tài', '165 Nguyễn Thái Bình, Phường Cầu Kho Quận 1, TP.Hồ Chí Minh', 'thucphamtantai@gmail.com', '02862724496'),
('NCC003', 'Nông Sản Sao Khuê', 'Số 135/17/63 Đường Nguyễn Hữu Cảnh, P. 22, Q. Bình Thạnh, Tp. Hồ Chí Minh', 'saokhue@gmail.com', '0908261003'),
('NCC004', 'Thực Phẩm Tươi Rạng Đông', '12/4E Đường Bà Điểm, Ấp Bắc Lân, Xã Bà Điểm, Huyện Hóc Môn, Tp. Hồ Chí Minh', 'caohuuthien@gmail.com', '0906817486');

-- --------------------------------------------------------

--
-- Table structure for table `nhanvien`
--

DROP TABLE IF EXISTS `nhanvien`;
CREATE TABLE IF NOT EXISTS `nhanvien` (
  `MaNV` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `HoTenNV` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `NgaySinh` date DEFAULT NULL,
  `GioiTinh` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SDT` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tendangnhap` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `MatKhau` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`MaNV`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `nhanvien`
--

INSERT INTO `nhanvien` (`MaNV`, `HoTenNV`, `NgaySinh`, `GioiTinh`, `SDT`, `Email`, `tendangnhap`, `MatKhau`, `avatar`) VALUES
('NV001', 'Trần Ngọc Thịnh', '2001-02-26', 'Nam', '0384735254', 'nt226@gmail.com', 'thinh', '356a192b7913b04c54574d18c28d46e6395428ab', 'cb0bd8493e2f53b19f1733eff2a48fa2.jpeg'),
('NV002', 'Trần Đinh Diệu Mi', '2001-09-29', 'Nữ', '0766751677', 'mitrancute@gmail.com', 'mi', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', '24444f72e73accb81299fe03d2cb77fb.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `phanhoisp`
--

DROP TABLE IF EXISTS `phanhoisp`;
CREATE TABLE IF NOT EXISTS `phanhoisp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Ho` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Ten` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SDT` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `TenTieuDe` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NoiDung` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NgayTao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `NgayCapNhat` datetime DEFAULT NULL,
  `TrangThai` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `phanhoisp`
--

INSERT INTO `phanhoisp` (`id`, `Ho`, `Ten`, `Email`, `SDT`, `TenTieuDe`, `NoiDung`, `NgayTao`, `NgayCapNhat`, `TrangThai`) VALUES
(1, 'Trần', 'Mi', 'mimi.290901@gmail.com', '0766543678', 'Phản hồi về rau xanh', 'Cần bán thêm trái cây và các loại rau khác', '2021-11-01 01:18:47', '2021-11-01 08:11:15', 1),
(2, 'Trần', 'Thịnh', 'ngocthinh.260201@gmail.com', '0367823456', 'Phản hồi về chất lượng bán', 'Giao hàng nhanh, rau rất tươi ngon và xanh', '2021-11-01 01:21:58', '2021-11-01 09:40:06', 1),
(3, 'Nguyễn ', 'Duy', 'duynguyen.2305@gmail.com', '0914366688', 'Rau Sạch', 'Rau tươi', '2021-11-01 09:43:45', '2021-11-01 09:44:27', 1),
(4, 'Nguyễn ', 'Thư', 'thunguye@gmail.com', '\'0378423519', 'Phản hồi chất lượng', 'rất thích, rau tươi xanh', '2021-11-21 18:52:01', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
CREATE TABLE IF NOT EXISTS `sanpham` (
  `MaSP` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `TenSP` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `MaLoai` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `MaNCC` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `Gia` int(11) DEFAULT NULL,
  `KhuyenMai` float DEFAULT NULL,
  `hinhanhsp` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `MoTa` longtext COLLATE utf8_unicode_ci,
  `NgayTao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `NgayCapNhat` datetime DEFAULT NULL,
  PRIMARY KEY (`MaSP`),
  KEY `MaLoai` (`MaLoai`),
  KEY `MaNCC` (`MaNCC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`MaSP`, `TenSP`, `MaLoai`, `MaNCC`, `Gia`, `KhuyenMai`, `hinhanhsp`, `MoTa`, `NgayTao`, `NgayCapNhat`) VALUES
('BD002', 'Bí Đỏ', 'RA002', 'NCC003', 24000, 0.2, 'cf3ebb2388c1f1b2fdfd33cd2a1c90e2.jpeg', 'Bí đỏ có chứa lượng lớn beta carotene, khi vào trong cơ thể chất này được chuyển hóa thành Vitamin A. Đây là chất cần thiết cho mắt, giúp võng mạc hấp thụ và xử lý ánh sáng tốt hơn. Ngoài ra, bí đỏ còn chứa lutein và zeaxanthin có tác dụng chống oxy hóa giúp ngăn ngừa đục thủy tinh thể và làm chậm sự phát triển của thoái hóa điểm vàng.', '2021-10-10 23:24:44', '2021-10-15 10:18:00'),
('BM004', 'Bắp Mỹ(trái)', 'RA004', 'NCC003', 20000, 0.2, '8f31fad56a226527b511f31b95e30f98.jpeg', 'Trái Bắp Mỹ có hình dạng thon dài, đầu trái hơi nhọn, có màu vàng óng rất đẹp. Có lá (Vỏ) bao quanh trái, màu vỏ vàng nhạt và có những sợi (râu) bắp màu nâu đồng bao quanh trái sau lớp vỏ. Đặc trưng của trái Bắp Mỹ rất ngọt khi ăn sống thử, có mùi thơm, bóp vài hạt bắp thấy nước màu trắng đục. Râu bắp được dùng nấu nước mát uống giải nhiệt.', '2021-10-05 06:24:10', '2021-10-06 08:20:16'),
('CC002', 'Cà Chua', 'RA002', 'NCC004', 35000, 0.1, '1655b64a125f1206b564bab81598efd6.jpeg', 'Cà chua là một loại rau ăn trái có giá trị dinh dưỡng cao, được trồng phổ biến trên thế giới cũng như ở Việt Nam. Cà chua là loại quả giàu vitamin C, vitamin A, được bầu chọn là loại quả tốt nhất dành cho những người ăn kiêng.', '2021-10-01 08:37:11', '2021-10-12 05:20:10'),
('CG003     ', 'Củ Gừng', 'RA003', 'NCC004', 25000, 0.3, '', 'Một số nghiên cứu đã chỉ ra 1 số hợp chất có trong gừng có thể làm giảm hoạt động của tế bào gây thay đổi DNA, hình thành khối u, làm tăng độ nhạy của khối u với các phương pháp điều trị như hóa trị và xạ trị.', '2021-10-17 10:00:00', '2021-10-19 10:26:00'),
('CR002     ', 'Cà Rốt', 'RA001', 'NCC003', 20000, 0.1, '', 'Cà rốt chứa rất nhiều vitamin A, B, C đặc biệt là hàm lượng vitamin A cao rất tốt cho mắt, giúp tăng cường thị lực, bồ bổi thị lực, các vitamin này còn giúp chuyển hóa và tái tạo da, tăng sức đề kháng, phòng và trị các bệnh, giúp bổ tỳ tiêu thực, nhuận tràng, bổ can minh mục, thanh nhiệt giải độc.', '2021-10-13 01:21:00', '2021-10-15 06:16:16'),
('CT001     ', 'Cải Thìa', 'RA001', 'NCC001', 25000, 0.3, '', 'Cải thìa có tác dụng hạ huyết áp, có lợi cho tim mạch. Theo nghiên cứu thì hành tây có tác dụng giảm cholesterol (mỡ máu), giúp cho máu lưu thông tốt. Hạn chế cholesterol xấu và làm tăng cholesterol tốt (HDL). Hành tây là thực phẩm kiêm dược phẩm tốt cho hệ thống tiêu hoá, chống táo bón, đầy hơi và trào ngược axít dạ dày.', '2021-10-06 00:43:15', '2021-10-08 10:24:00'),
('CT002     ', 'Củ Cải Trắng', 'RA001', 'NCC004', 40000, 0.1, '', 'Củ cải trắng từng được ví von là nhân sâm trắng do có nhiều tác dụng trong hỗ trợ tăng cường sức khỏe, chữa bệnh. Củ cải tính hàn, có công dụng trong việc trị ho, tốt cho phổi, đặc biệt là vào mùa đông, một số người thường xuất hiện nhiều đờm khô, gây khó chịu cho phổi.', '2021-10-12 03:47:40', '2021-10-13 14:00:00'),
('CT003     ', 'Củ Tỏi', 'RA003', 'NCC003', 15000, 0.1, '', 'Tỏi rất giàu chất dinh dưỡng. Theo nghiên cứu, trong 100g tỏi có chứa 6,36g protein, 33g carbohydrates, 150g calo và các dưỡng chất như vitamin nhóm B (B1, B2, B3, B6), sắt, canxi, kali, mangan, magie, photpho,...', '2021-10-04 00:40:02', '2021-10-07 08:00:00'),
('DC001     ', 'Đậu Cove', 'RA001', 'NCC002', 12000, 0.1, '', 'Đậu cô ve hay còn được gọi là đậu que hoặc đậu ve có tên khoa học là Phaseolus vulgaris. Tên gọi và cách đọc này là từ mượn được biến âm từ tên tiếng Pháp là Haricot vert.', '2021-10-05 06:24:10', '2021-10-19 10:26:00'),
('hihi', 'hell', 'RA003', 'NCC002', 20000, 0, '5d81b9f66cdfeeee805cf0d0ddb6c08c.jpeg', 'hh', '2021-11-06 01:53:06', NULL),
('HL003     ', 'Hành Lá', 'RA003', 'NCC004', 40000, 0.2, '', 'Hành lá hay hành xanh, hành non là tên gọi chung của các loài thuộc chi Hành. Tất cả hành lá đều có lá rỗng màu xanh (giống hành tây), nhưng lại thiếu một thân hành (củ hành) phát triển hoàn chỉnh.', '2021-10-18 03:00:00', '2021-10-19 10:26:00'),
('HT002     ', 'Hành Tây', 'RA001', 'NCC001', 25000, 0, '', 'Hành tây có tác dụng hạ huyết áp, có lợi cho tim mạch. Theo nghiên cứu thì hành tây có tác dụng giảm cholesterol (mỡ máu), giúp cho máu lưu thông tốt. Hạn chế cholesterol xấu và làm tăng cholesterol tốt (HDL). Hành tây là thực phẩm kiêm dược phẩm tốt cho hệ thống tiêu hoá, chống táo bón, đầy hơi và trào ngược axít dạ dày.', '2021-10-01 08:37:11', '2021-10-06 08:20:16'),
('HT003     ', 'Hành Tím Đà Lạt', 'RA003', 'NCC004', 30000, 0.1, '', 'Hành tím có vị cay, ngọt, đậm, tính ấm, nhiều nhựa, hàm lượng vitamin cao hơn, chứa nhiều khoáng chất và có tác dụng giải cảm, diệt khuẩn, hành làm thông khí, khí đẩy huyết, huyết đẩy khí… điều hòa kinh mạch và tạng phủ', '2021-10-11 10:00:00', '2021-10-12 05:20:10'),
('k0000', 'hell', 'RA002', 'NCC003', 20000, 0, 'e1ee6ed7e28cfb28c0f640540f9628ff.jpeg', 'hih', '2021-11-05 22:16:01', NULL),
('KQ002     ', 'Khổ Qua Rừng', 'RA002', 'NCC003', 25000, 0.3, '', 'Khổ qua rừng(mướp đắng) có nhiều protein, các chất chống oxi hóa… nên nó có tác dụng rất tốt trong việc kháng khuẩn, nâng cao sức khỏe cho hệ miễn dịch. Khổ qua có thể làm hạ mức đường huyết là do trong hạt của nó chứa protein có chức năng tương tự như insulin.', '2021-10-13 01:21:00', '2021-10-15 10:18:00'),
('NT004     ', 'Ngò Tây Parsley', 'RA004', 'NCC001', 30000, 0, '', 'Parsley thường được dùng rất nhiều trong các món ăn có nhiều hương vị. Parsley có thể được dùng trong các loại sốt, súp, các món hầm. Lá parsley cắt nhỏ thường được dùng để rắc lên các món ăn lúc vừa nấu xong.', '2021-10-06 00:43:15', '2021-10-12 05:20:10');

-- --------------------------------------------------------

--
-- Table structure for table `sanphamthuonghieu`
--

DROP TABLE IF EXISTS `sanphamthuonghieu`;
CREATE TABLE IF NOT EXISTS `sanphamthuonghieu` (
  `MaTH` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `MaSP` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`MaTH`,`MaSP`),
  KEY `MaSP` (`MaSP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sanphamthuonghieu`
--

INSERT INTO `sanphamthuonghieu` (`MaTH`, `MaSP`) VALUES
('TH002', 'BM004'),
('TH003', 'BM004'),
('TH002', 'CC002'),
('TH002', 'CG003     '),
('TH001', 'CT001     '),
('TH001', 'HT003     ');

-- --------------------------------------------------------

--
-- Table structure for table `theloai`
--

DROP TABLE IF EXISTS `theloai`;
CREATE TABLE IF NOT EXISTS `theloai` (
  `MaLoai` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `TenLoai` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`MaLoai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `theloai`
--

INSERT INTO `theloai` (`MaLoai`, `TenLoai`) VALUES
('RA001', 'Rau Xanh Sạch'),
('RA002', 'Rau Ăn Củ'),
('RA003', 'Rau Củ Gia Vị'),
('RA004', 'Rau Nhập Khẩu');

-- --------------------------------------------------------

--
-- Table structure for table `thuonghieu`
--

DROP TABLE IF EXISTS `thuonghieu`;
CREATE TABLE IF NOT EXISTS `thuonghieu` (
  `MaTH` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `TenTH` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `DiaChi` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `SDT` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`MaTH`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `thuonghieu`
--

INSERT INTO `thuonghieu` (`MaTH`, `TenTH`, `DiaChi`, `SDT`, `Email`) VALUES
('TH001', 'ORGANIC FOODLES', 'Số 93 Trần Não, Phường Bình An, Quận 2, TPHCM', '0931771088', 'info@organicfood.vn'),
('TH002', 'ORGANIC FARM', '004 LÔ B5 CC 1A–1B Nguyễn Đình Chiểu, Quận 1, TPHCM', '0931771088', 'www.organicfarm.com.vn'),
('TH003', 'ORGANICA', '130 Nguyễn Đình Chiểu, Phường 6, Quận 3 - 54 đường Hoàng Văn Thụ, Phường 9, Phú Nhuận, TPHCM', '0914191134', 'www.shophuuco.com');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `fullname` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `permission` int(11) NOT NULL DEFAULT '0',
  `avatar` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `fullname`, `permission`, `avatar`) VALUES
('mi', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Trần Đinh Diệu Mi', 0, 'cute.jpg'),
('man', 'da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Trần Công Mẫn', 1, '');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`MaLoai`) REFERENCES `theloai` (`MaLoai`),
  ADD CONSTRAINT `sanpham_ibfk_2` FOREIGN KEY (`MaNCC`) REFERENCES `nhacungcap` (`MaNCC`);

--
-- Constraints for table `sanphamthuonghieu`
--
ALTER TABLE `sanphamthuonghieu`
  ADD CONSTRAINT `sanphamthuonghieu_ibfk_2` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
