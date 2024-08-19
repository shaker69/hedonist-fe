import React from 'react';
import { Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useTranslations } from 'next-intl';
import { UploadChangeParam } from 'antd/es/upload';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface Props {
  id: string;
  fileList: UploadFile[];
  onChange: (info: UploadChangeParam) => void;
}

const MenuItemImage: React.FC<Props> = ({ id, fileList, onChange, ...rest }) => {
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
    /* TODO: adjust to work with react-hook-form */
    // <ImgCrop
    //   aspect={1.6}
    //   rotationSlider
    //   aspectSlider
    // >
      <Upload
        id={id}
        accept="image/*"
        listType="picture-card"
        fileList={fileList}
        onPreview={onPreview}
        beforeUpload={() => false}
        onChange={onChange}
        maxCount={1}
        {...rest}
      >
        {fileList.length < 1 && `+ ${translation('common.button.upload')}`}
      </Upload>
    // </ImgCrop>
  );
};

export default MenuItemImage;