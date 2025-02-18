export default function tongLuong(chucVu, luongCoBan) {
  switch (chucVu) {
    case "ceo":
      return luongCoBan * 3;
    case "manager":
      return luongCoBan * 2;
    case "staff":
      return luongCoBan * 1;
    default:
      return luongCoBan;
  }
}
