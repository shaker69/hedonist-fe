import React, { useState } from 'react';
import { Form, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface Props {
  id: string;
  fileList: any;
}

const MenuItemImage: React.FC<Props> = ({ id, fileList, ...rest }) => {
  const translation = useTranslations();

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop
      aspect={1.6}
      rotationSlider
      aspectSlider
    >
      <Upload
        id={id}
        accept="image/*"
        listType="picture-card"
        fileList={fileList}
        onPreview={onPreview}
        beforeUpload={() => false}
        {...rest}
      >
        {fileList.length < 1 && `+ ${translation('common.button.upload')}`}
      </Upload>
    </ImgCrop>
  );
};

export default MenuItemImage;