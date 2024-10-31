"use client";
import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { api } from "@/actions";
import { useRouter, useSearchParams } from "next/navigation";
const { Dragger } = Upload;

const ImageUpload: React.FC = ({
  imageType,
  onUploadSuccess,
}: {
  imageType: string;
  onUploadSuccess: any;
}) => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  console.log("slug", slug);
  console.log("imageType", imageType);
  const props: UploadProps = {
    name: "file",
    multiple: true,

    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        // Create form data
        const formData = new FormData();
        formData.append("file", file as Blob);
        formData.append("type", imageType);

        let response;

        // Make the POST request to upload

        if (imageType === "event") {
          response = await api.post(`/api/events/${slug}/images/new`, formData);
        } else {
          response = await api.post("/api/users/images/new", formData);
        }

        onSuccess && onSuccess(response.data);
        console.log("response.data", response.data);
        onUploadSuccess(response.data);
        message.success(`Таны зураг амжилттай хуулагдлаа.`);
      } catch (error) {
        onError && onError(error);
        message.error(`Алдаа гарлаа хэсэг хугацааны дараа дахин оролдоно уу.`);
      }
    },

    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Файлыг үүн дээр дарж эсвэл чирж авчирна уу
      </p>
      <p className="ant-upload-hint">
        Зураг хуулахдаа хэт том хэмжээтэй биш мөн jpg, jpeg, png өргөтгөлтэй
        байхыг анхаарна уу!.
      </p>
    </Dragger>
  );
};

export default ImageUpload;
