"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

import { apiClient } from "@/shared/api/client";

import { Button } from "../button/Button/Button";

import scss from "./ImageUpload.module.scss";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export const ImageUpload = ({ value, onChange, label }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {
      setIsUploading(true);

      const { data } = await apiClient.post("/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onChange(data.url);
    } catch (error) {
      console.error("Ошибка загрузки изображения", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={scss.upload}>
       {label && <p className="p2 primary-color-400">{label}</p>}
       
      <div className={scss["upload__contemt"]}>
        {value ? (
          <div className={scss["upload__preview"]}>
            <div className={scss["upload__img"]}>
              <Image src={value} alt="preview" fill />
            </div>

            <div className={scss["upload__btns"]}>
              <Button
                iconLeft={<X size={18} />}
                theme="remove"
                onClick={() => onChange("")}
              ></Button>
            </div>
          </div>
        ) : (
          <label className={scss["upload__box"]}>
            <Upload size={24} />

            <span>{isUploading ? "Загрузка..." : "Загрузить фото"}</span>

            <input type="file" accept="image/*" onChange={uploadImage} hidden />
          </label>
        )}
      </div>
    </div>
  );
};
