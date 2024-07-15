import { ThankYouIllustration } from "@/components";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <section className="flex items-center justify-center flex-col gap-4 px-4">
      <div className="w-[256px] md:w-[384px]">
        <ThankYouIllustration />
      </div>
      <h1 className="text-xl md:text-3xl text-center font-medium text-[#1E1E1E]">
        Манай нийгэмлэгт нэгдсэнд баярлалаа!
      </h1>
      <p className="text-md md:text-[18px] leading-normal text-tertiary max-w-[640px] text-center">
        Таны бүртгэл амжилттай болсон бөгөөд одоо та манай платформын санал
        болгож буй бүх зүйлийг судлахад бэлэн боллоо.
      </p>
      <Link href="/" className="underline text-primary font-medium">
        Нүүр хуудас руу шилжих
      </Link>
    </section>
  );
};

export default SuccessPage;
