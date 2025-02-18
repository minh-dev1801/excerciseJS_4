export function saveLocalStorage(data) {
  localStorage.setItem("SinhVien", JSON.stringify(data));
}

export function getLocalStorage() {
  return JSON.parse(localStorage.getItem("SinhVien")) || [];
}
