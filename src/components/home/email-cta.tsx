"use client";

import { registerCustomer } from "@/actions";
import { useState } from "react";

export const EmailCta = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = () => {
    if (!mail) {
      setSuccess("error");
      return;
    }
    setLoading(true);
    try {
      registerCustomer(mail);
      setSuccess("success");
      setLoading(false);
    } catch (e) {
      console.error(e);
      setSuccess("error");
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#d5e4e5] py-9">
      <div className="container flex flex-col items-center justify-center gap-6">
        <div className="text-[#0C1B1C] text-2xl md:text-3xl font-semibold max-md:text-center">
          Тогтмол мэдээлэл авах
        </div>
        <div className="font-medium text-lg text-[#0C1B1C] text-center w-full md:w-3/5">
          Та санд нэмэгдэж буй шинэ төсөл хөтөлбөрүүд, хамрагдах боломжтой
          сургалт, арга хэмжээ зэрэг сүүлийн үеийн мэдээ, мэдээллүүдийг цаг
          алдалгүй, тогтмол авахыг хүсвэл дараах хэсэгт мэйл хаягаа бүртгүүлэхэд
          хангалттай.
        </div>
        <form
          className="flex flex-col md:flex-row gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <input
            type="email"
            placeholder="Email address"
            className="rounded-full px-6 max-md:py-3 w-80 outline-none "
            onChange={(e) => setMail(e.target.value)}
          />
          <button
            className="py-4 px-10 rounded-full bg-primary text-white font-semibold"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Мэдээлэл авах"}
          </button>
        </form>
        {success &&
          (success == "success" ? (
            <p className="text-[#BFE88C]">Амжилттай бүртгэлээ</p>
          ) : (
            <p className="text-[#FF0000]">Алдаа заалаа</p>
          ))}
      </div>
    </div>
  );
};

export default EmailCta;
