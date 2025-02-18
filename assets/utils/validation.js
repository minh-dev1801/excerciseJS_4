export default function validateInput(
  value,
  spanId,
  type,
  numDown = 0,
  numUp = Infinity
) {
  let regex;
  let errMsg = "";

  function showError(message) {
    document.getElementById(spanId).innerHTML = message;
    document.getElementById(spanId).style.display = "block";
    return false;
  }

  function isNumber(number) {
    return /[^0-9\s]/.test(number);
  }

  function compareValues(numericValue, firstNum, lastNum) {
    return numericValue < firstNum || numericValue > lastNum;
  }

  function hideError() {
    document.getElementById(spanId).style.display = "none";
  }

  if (value.trim() === "") return showError("Vui lòng không để trống");

  if (value.length < numDown || value.length > numUp) {
    return showError(`Số ký tự trong khoảng từ ${numDown} đến ${numUp}`);
  }

  switch (type) {
    case "name":
      regex = /^[A-Za-zÀ-Ỹà-ỹ\s]+$/;
      errMsg = "Tên chỉ có thể chứa chữ cái và khoảng trắng";
      if (!regex.test(value)) return showError(errMsg);
      hideError();
      return true;

    case "email":
      regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      errMsg = "Email không đúng định dạng";
      if (!regex.test(value)) return showError(errMsg);
      hideError();
      return true;

    case "password":
      regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).+$/;
      errMsg =
        "Mật khẩu phải chứa ít nhất 1 số, 1 chữ in hoa và 1 ký tự đặc biệt";
      if (!regex.test(value)) return showError(errMsg);
      hideError();
      return true;

    case "datepicker":
      regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
      errMsg = "Ngày không đúng định dạng MM/DD/YYYY";
      if (!regex.test(value)) return showError(errMsg);

      const [month, day, year] = value.split("/").map(Number);
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() !== year ||
        date.getMonth() + 1 !== month ||
        date.getDate() !== day
      ) {
        return showError(`Tháng ${month} không có ngày ${day}`);
      }
      hideError();
      return true;

    case "salary":
      if (isNumber(value)) {
        return showError("Lương không đúng định dạng, chỉ nhập số nguyên!");
      }

      let numericValue = Number(value.replace(/\D/g, ""));
      if (compareValues(numericValue, 1000000, 20000000)) {
        return showError(
          `Số tiền phải từ ${Number(1000000).toLocaleString(
            "vi-VN"
          )} VNĐ đến ${Number(20000000).toLocaleString("vi-VN")} VNĐ`
        );
      }
      hideError();
      return true;

    case "workingHours":
      console.log();

      if (isNumber(value)) {
        return showError(
          "Số giò làm không đúng định dạng, chỉ nhập số nguyên!"
        );
      }

      const hour = Number(value.replace(/\D/g, ""));
      if (compareValues(hour, 80, 200)) {
        return showError("Số giờ làm trong tháng phải từ 80 giờ đến 200 giờ");
      }
      hideError();
      return true;

    default:
      hideError();
      return true;
  }
}
