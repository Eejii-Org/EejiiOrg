import { ThankYouIllustration } from "@/components";
import Link from "next/link";
import { Button, Result } from "antd";

const SuccessPage = () => {
  return (
    <section className="flex items-center justify-center flex-col gap-4 px-4">
      <div className="w-[256px] md:w-[384px]">
        <ThankYouIllustration />
      </div>
      <h1 className="text-xl md:text-3xl text-center font-medium text-[#1E1E1E]">
        Имэйлээ баталгаажуулна уу!
      </h1>
      <p className="text-md md:text-[18px] leading-normal text-tertiary max-w-[640px] text-center">
        Манай нийгэмлэгт нэгдсэнд баярлалаа! Таны бүртгэл амжилттай болсон
        бөгөөд бид таны бүртгүүлсэн имэйл хаяг уруу баталгаажуулах холбоос
        илгээлээ.
      </p>
      <Link href="/" className="underline text-primary font-medium">
        Дахин илгээх
      </Link>
    </section>
  );
};

export default SuccessPage;
