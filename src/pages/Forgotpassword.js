import React from "react";
import CustomInput from "../components/CustomInput";

const Forgotpassword = () => {
  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Quên Mật Khẩu</h3>
        <p className="text-center">
        Vui lòng nhập email đăng ký của bạn để nhận email đặt lại mật khẩu.
        </p>
        <form action="">
          <CustomInput type="password" label="Email" id="email" />

          <button
            className="border-0 mt-3 px-3 py-2 text-white fw-bold w-100"
            style={{ background: "#ffd333" }}
            type="submit"
          >
            Gửi Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;

