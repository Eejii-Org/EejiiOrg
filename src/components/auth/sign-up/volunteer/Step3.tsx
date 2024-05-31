"use client";
import { Input } from "@/components";
import { useState } from "react";
export const VolunteerStep3 = () => {
  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <label className="font-medium text-lg">Хүйс</label>
        <select
          className="w-full rounded-2xl py-[14px] px-4 border border-[#CCCCCC] outline-primary"
          name="region"
        >
          {regions.map((region, index) => (
            <option value={region} key={index}>
              {region}
            </option>
          ))}
        </select>
      </div>
      <Input label="Гэрийн хаяг" type="text" name="address" />
    </>
  );
};

const regions = [
  "УБ — Баянзүрх",
  "УБ — Сүхбаатар",
  "УБ — Баянгол",
  "УБ — Чингэлтэй",
  "УБ — Хан-Уул",
  "УБ — Сонгинохайрхан",
  "УБ — Багануур",
  "УБ — Багахангай",
  "УБ — Налайх",
  "Архангай",
  "Баян-Өлгий",
  "Баянхонгор",
  "Булган",
  "Говь-Алтай",
  "Говьсүмбэр",
  "Дархан-Уул",
  "Дорноговь",
  "Дорнод",
  "Дундговь",
  "Завхан",
  "Орхон",
  "Өвөрхангай",
  "Өмнөговь",
  "Сүхбаатар",
  "Сэлэнгэ",
  "Төв",
  "Увс",
  "Ховд",
  "Хөвсгөл",
  "Хэнтий",
];
