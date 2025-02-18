import {
  saveLocalStorage,
  getLocalStorage,
} from "../assets/utils/localStorage.js";
import { removeVietnameseTones } from "../assets/utils/removeVietnameseTones.js";

import tongLuong from "../assets/utils/tongLuong.js";
import validateInput from "../assets/utils/validation.js";
import xepLoai from "../assets/utils/xepLoai.js";
import { NhanVien } from "../models/NhanVien.js";

const selectElementRole = document.getElementById("chucvu");

$("#myModal").on("hidden.bs.modal", function () {
  const notificationIds = [
    "tbTKNV",
    "tbTen",
    "tbEmail",
    "tbMatKhau",
    "tbNgay",
    "tbLuongCB",
    "tbGiolam",
  ];

  notificationIds.forEach(
    (noti) => (document.getElementById(noti).innerHTML = "")
  );
});

document.getElementById("btnThem").onclick = () => {
  document.getElementById("tknv").readOnly = false;
  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("btnThemNV").style.display = "block";

  const arrInput = document.querySelectorAll(
    ".modal .form-group .form-control"
  );

  arrInput.forEach((input) => {
    if (input.id !== "datepicker") {
      return (input.value = "");
    }

    if (input.id === "datepicker") {
      const today = new Date();
      const formattedDate = `${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}/${String(today.getDate()).padStart(2, "0")}/${today.getFullYear()}`;

      return (input.value = formattedDate);
    }
  });
};

document.getElementById("btnThemNV").onclick = () => {
  const arrInput = [
    ...document.querySelectorAll(".modal .form-group .form-control"),
  ];

  const sv = new NhanVien();
  Object.assign(
    sv,
    Object.fromEntries(arrInput.map((input) => [input.id, input.value]))
  );

  const selectRole = [...selectElementRole.options].find(
    (option) => option.value === sv["chucvu"]
  );

  sv["chucvu"] = selectRole
    ? selectRole.getAttribute("data-value")
    : sv["chucvu"];

  const { tknv, name, email, password, datepicker, luongCB, gioLam } = sv;

  let valid = true;

  valid &=
    validateInput(tknv, "tbTKNV", "text", 4, 6) &
    validateInput(name, "tbTen", "name") &
    validateInput(email, "tbEmail", "email") &
    validateInput(password, "tbMatKhau", "password", 6, 10) &
    validateInput(datepicker, "tbNgay", "datepicker") &
    validateInput(luongCB, "tbLuongCB", "salary") &
    validateInput(gioLam, "tbGiolam", "workingHours");

  if (!valid) return;

  const arrSV = getLocalStorage();
  arrSV.push(sv);
  saveLocalStorage(arrSV);
  renderTable(arrSV);
  $("#myModal").modal("hide");
};

const renderTable = (listData) => {
  let contentHTML = "";

  listData.forEach((data) => {
    const typeSV = xepLoai(data.gioLam);

    const chuVuWithVietnamese = [...selectElementRole.options].find(
      (option) => option.getAttribute("data-value") === data.chucvu
    );

    const sumSV = chuVuWithVietnamese
      ? tongLuong(chuVuWithVietnamese.value, data.luongCB)
      : 0;

    contentHTML += `
    <tr>
      <td>${data.tknv}</td>
      <td>${data.name}</td>
      <td>${data.email}</td>
      <td>${data.datepicker}</td>
      <td>${data.chucvu}</td>
      <td>${sumSV}</td>
      <td>${typeSV}</td>
      <td>
        <button class="btn btn-danger mt-2" onclick="xoaNhanVien('${data.tknv}')">Xóa</button>
        <button class="btn btn-warning mt-2" onclick="chinhSuaSV('${data.tknv}')" data-toggle="modal" data-target="#myModal">Chỉnh sửa</button>
      </td>
    </tr>
  `;
  });

  document.getElementById("tableDanhSach").innerHTML = contentHTML;
};

window.xoaNhanVien = (id) => {
  const arrSV = getLocalStorage();

  const arrSVDelete = arrSV.filter((sv) => sv.tknv !== id);
  saveLocalStorage(arrSVDelete);
  renderTable(getLocalStorage());
};

window.chinhSuaSV = (id) => {
  document.getElementById("tknv").readOnly = true;
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "block";

  const arrSV = getLocalStorage();

  const svEdit = arrSV.find((sv) => sv.tknv === id);

  const arrInput = document.querySelectorAll(
    ".modal .form-group .form-control"
  );

  const selectElement = document.getElementById("chucvu");
  const selectedOption = [...selectElement].find(
    (option) => option.getAttribute("data-value") === svEdit["chucvu"]
  );

  svEdit["chucvu"] = selectedOption ? selectedOption.value : svEdit["chucvu"];

  arrInput.forEach((input) => {
    return (input.value = svEdit[input.id]);
  });
};

document.getElementById("btnCapNhat").onclick = () => {
  const arrInput = [
    ...document.querySelectorAll(".modal .form-group .form-control"),
  ];

  const svEdit = new NhanVien();
  Object.assign(
    svEdit,
    Object.fromEntries(arrInput.map((input) => [input.id, input.value]))
  );

  const selectElement = document.getElementById("chucvu");
  const selectedOption = [...selectElement.options].find(
    (option) => option.value === svEdit["chucvu"]
  );
  svEdit["chucvu"] = selectedOption
    ? selectedOption.getAttribute("data-value")
    : svEdit["chucvu"];

  const { tknv, name, email, password, datepicker, luongCB, gioLam } = svEdit;

  let valid = true;

  valid &=
    validateInput(tknv, "tbTKNV", "text", 4, 6) &
    validateInput(name, "tbTen", "name") &
    validateInput(email, "tbEmail", "email") &
    validateInput(password, "tbMatKhau", "password", 6, 10) &
    validateInput(datepicker, "tbNgay", "datepicker") &
    validateInput(luongCB, "tbLuongCB", "salary") &
    validateInput(gioLam, "tbGiolam", "workingHours");

  if (!valid) return;

  const arrSV = getLocalStorage();

  arrSV.forEach((sv, index) => {
    if (sv.tknv === svEdit.tknv) arrSV[index] = svEdit;
  });

  saveLocalStorage(arrSV);
  renderTable(arrSV);
  $("#myModal").modal("hide");
};

document.getElementById("btnTimNV").onclick = () => {
  const valueInputNVVietnamese = removeVietnameseTones(
    document.getElementById("searchName").value
  );
  const arrNV = getLocalStorage();

  const arrNVSearch = arrNV.filter((nv) => {
    const valueNVVietnamese = removeVietnameseTones(xepLoai(nv.gioLam));
    return valueNVVietnamese === valueInputNVVietnamese;
  });

  renderTable(arrNVSearch.length ? arrNVSearch : arrNV);
};

renderTable(getLocalStorage());
