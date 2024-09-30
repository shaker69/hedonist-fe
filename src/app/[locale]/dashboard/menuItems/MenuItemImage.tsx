import React, { useState } from 'react';
import { Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useTranslations } from 'next-intl';
import { UploadChangeParam } from 'antd/es/upload';

import { getSignedUrl } from '@app/actions';
import { httpClient } from '@app/utils';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface Props {
  id: string;
  itemToEdit?: any;
  fileList: UploadFile[];
  onChange: (info: UploadChangeParam) => void;
}

const MenuItemImage: React.FC<Props> = ({ id, fileList, onChange, itemToEdit, ...rest }) => {
  const translation = useTranslations();

  const uploadImage = async (params: any) => {
    const { onSuccess, onError, file, onProgress, action } = params;

    const fileType = file.type;

    httpClient.put(action, {
      body: file,
      headers: {
        'Content-Type': fileType,
      },
    })
      .then((result) => {
        onSuccess(result, file);
      })
      .catch((error) => {
        onError(error);
        alert('ERROR ' + JSON.stringify(error));
      });
  };

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
    <>
      <ImgCrop
        aspect={1.6}
        rotationSlider
      >
        <Upload
          action={async (file) => getSignedUrl(
            itemToEdit ? `${itemToEdit?.MenuItemId}.jpg` : file.name,
            file.type,
          )}
          customRequest={uploadImage}
          method="PUT"
          id={id}
          accept="image/jpeg"
          listType="picture-card"
          fileList={fileList}
          onPreview={onPreview}
          onChange={onChange}
          maxCount={1}
          {...rest}
        >
          {fileList.length < 1 && `+ ${translation('common.button.upload')}`}
        </Upload>
      </ImgCrop >
    </>
  );
};

export default MenuItemImage;