"use client";

import { useAuth } from "@/providers";
import Link from "next/link";
import { Button, Result } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

const ResultBox = () => {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const param = searchParams.get("reason");
  console.log("searchParams?", param);

  const items = [
    {
      status: "warning",
      reason: "verify",
      title: "Та эхлээд байгууллагаа баталгаажуулна уу!",
      subTitle:
        "Та арга хэмжээ оруулахын тулд эхлээд бидэнтэй холбогдож зохих гэрээ хийх хэрэгтэй",
      btnText: "Заавар харах!",
      btnUrl: "/ццббц",
    },
    {
      status: "warning",
      reason: "nopermit",
      title: "Та арга хэмжээ оруулахын тулд эрх авах шаардлагатай",
      subTitle: "Доорх товчин дээр дарж эрхээ авна уу?",
      btnText: "Эрх авах",
      btnUrl: "/profile/permit",
    },
  ];

  const RenderWarning = () => {
    // Filter items based on the 'reason' query param
    const matchingItem = items.find((item) => item.reason === param);

    // If a matching item is found, render it
    return matchingItem ? (
      <Result
        status={matchingItem.status}
        title={matchingItem.title}
        subTitle={matchingItem.subTitle}
        extra={[
          <Link href={matchingItem.btnUrl} key={matchingItem.btnUrl}>
            <Button type="primary">{matchingItem.btnText}</Button>
          </Link>,
        ]}
      />
    ) : null; // If no matching item, render nothing or a fallback message
  };

  return (
    <div className="bg-white p-6 rounded-md">
      <RenderWarning />
    </div>
  );
};

export default ResultBox;
