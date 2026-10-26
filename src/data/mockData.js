import BaChiHeoBaoCuonSot from "../assets/food/Ba_chi_heo_bao_cuon_sot.jpg";
import BaChiHeoTuoi from "../assets/food/Ba_chi_heo_tuoi.jpg";

export const categories = [
  { id: "all", name: "TẤT CẢ" },
  { id: "bo", name: "BÒ NHẬP KHẨU" },
  { id: "heo", name: "HEO" },
  { id: "ga", name: "GÀ" },
  { id: "haisan", name: "HẢI SẢN" },
  { id: "douong", name: "NƯỚC GIẢI KHÁT" },
  { id: "khac", name: "MÓN KHÁC" },
];

export const products = [
  {
    id: 101,
    name: "Chilled Meat - Ba chỉ heo tươi",
    price: 209000,
    image: BaChiHeoBaoCuonSot,
    badge: "BÒ MÁT NHẬP KHẨU",
    type: "Buffet",
    category: "heo",
  },
  {
    id: 102,
    name: "Chilled Meat - Ba chỉ heo bào cuộn sốt",
    price: 219000,
    image: BaChiHeoTuoi,
    badge: "BÒ MÁT NHẬP KHẨU",
    type: "Buffet",
    category: "heo",
  },
  {
    id: 103,
    name: "Chilled Meat - Lõi vai",
    price: 239000,
    image: "https://via.placeholder.com/150",
    badge: "BÒ MÁT NHẬP KHẨU",
    category: "bo",
  },
  {
    id: 104,
    name: "Chilled Meat - Mông bò...",
    price: 269000,
    image: "https://via.placeholder.com/150",
    badge: "BÒ MÁT NHẬP KHẨU",
    category: "bo",
  },
];