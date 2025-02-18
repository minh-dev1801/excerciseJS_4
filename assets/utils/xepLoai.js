export default function xepLoai(gioLam) {
  if (gioLam >= 192) {
    return "Nhân viên xuất sắc";
  } else if (gioLam >= 176) {
    return "Nhân viên giỏi";
  } else if (gioLam >= 160) {
    return "Nhân viên khá";
  } else {
    return "Nhân viên trung bình";
  }
}
