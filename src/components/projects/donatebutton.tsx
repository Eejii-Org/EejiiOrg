"use client";

import { useState } from "react";
import { Button } from "../button";
import Image from "next/image";
import axios from "axios";
import { getCookie } from "cookies-next";

export const DonateButton = ({ slug }: { slug: string }) => {
  const [value, setValue] = useState<number | string>(10000);
  const [donateOpen, setDonateOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [donateData, setDonateData] = useState<any>(null);
  const donate = async () => {
    setError(null);
    setLoading(true);
    // const token = getCookie("token");
    // if (!token) {
    //   setError("Эхлээд бүртгүүлнэ үү.");
    //   setLoading(false);
    //   return;
    // }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${slug}/donate`,
        {
          amount: value,
          method: "qpay",
          isPublicAmount: true,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      console.log(donateData);
      setDonateData(res.data);
    } catch (e) {
      console.log(e);
      setError("Алдаа гарлаа! Та бидэнд яаралтай мэдэгдэнэ үү. Баярлалаа.");
    }
    setLoading(false);
  };
  if (loading) {
    return (
      <div className="p-3 text-primary text-lg font-semibold text-center">
        Уншиж байна...
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-3 text-red-600 text-lg font-semibold text-center">
        {error}
      </div>
    );
  }
  return (
    <>
      <Button className={`w-full`} onClick={() => setDonateOpen(true)}>
        ХАНДИВ ӨГӨХ
      </Button>
      <div
        className={`fixed top-1/2 left-1/2 ${
          donateOpen ? "fixed flex flex-col p-8 md:flex-row" : "hidden"
        } z-30 gap-6 w-[400px] -translate-x-1/2 -translate-y-1/2`}
      >
        <form
          className={`p-4 md:p-8 rounded-2xl ${
            !donateData ? "md:min-w-[400px]" : ""
          } flex-1 flex flex-col justify-between gap-8 bg-white`}
          onSubmit={(e) => {
            e.preventDefault();
            donate();
          }}
        >
          <div className="flex items-center justify-center">
            <Image
              src="/assets/logo.png"
              alt="EejiiIcon"
              className="object-contain"
              height={42}
              width={168}
            />
          </div>
          {donateData ? (
            <div className="flex-1 flex flex-col justify-between items-center">
              <div className="flex items-center justify-center flex-1">
                <Image
                  src={"data:image/png;base64, " + donateData.details.qr_image}
                  alt="PaymentQR"
                  width={300}
                  height={300}
                />
              </div>
              <Button
                className="py-4 max-w-[400px] w-full !text-[18px]"
                onClick={() => {
                  setDonateData(null);
                  setDonateOpen(false);
                }}
              >
                Дуусгах
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-col flex-1 gap-4">
                {/* <div className="flex flex-row border rounded-xl box-border mb-8">
              <button
                onClick={() => setSelectedPayment("onetime")}
                className={`flex-1 py-3 box-border ${
                  selectedPyament == "onetime"
                    ? "font-semibold text-black  border border-primary bg-[#EBF3F4] rounded-xl"
                    : "font-medium text-black/70"
                }`}
              >
                Нэг удаа
              </button>
              <button
                onClick={() => setSelectedPayment("monthly")}
                className={`flex-1 py-3 pr-2 box-border flex items-center justify-center gap-1 ${
                  selectedPyament == "monthly"
                    ? "font-semibold text-black border border-primary bg-[#EBF3F4] rounded-xl"
                    : "font-medium text-black/70"
                }`}
              >
                <HeartIcon />
                Сар бүр
              </button>
            </div> */}
                <div className="hidden md:grid grid-cols-3 gap-4">
                  {[5000, 10000, 20000, 50000, 100000, 500000].map(
                    (tugrug, index) => (
                      <button
                        onClick={() => setValue(tugrug)}
                        className="py-[10px] rounded-lg border border-[#CCCCCC] flex items-center justify-center hover:bg-[#CCCCCC] transition-all"
                        key={index}
                      >
                        ₮{tugrug}
                      </button>
                    )
                  )}
                </div>
                <div className="flex flex-row gap-2 items-center rounded-2xl border border-[#CCCCCC] px-4">
                  <div className="text-xl  text-black/70">₮</div>
                  <input
                    required
                    className={`outline-none w-full py-3 md:py-[14px] text-xl md:text-2xl text-primary font-bold`}
                    value={value}
                    type="number"
                    onChange={(e) => {
                      if (e.target.value == "") {
                        setValue("");
                      } else {
                        setValue(Number(e.target.value));
                      }
                    }}
                  />
                </div>
              </div>
              <Button
                className="md:py-4 w-full md:!text-[18px]"
                disabled={loading}
                type="submit"
              >
                {loading ? "Loading..." : "Хандив өгөх"}
              </Button>
            </>
          )}
        </form>
      </div>
      <div
        className={`z-20 w-screen h-screen fixed top-0 left-0 ${
          donateOpen ? "fixed flex" : "hidden"
        } bg-black/40 items-center justify-center`}
        onClick={() => setDonateOpen(false)}
      ></div>
    </>
  );
};
