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
  control: any;
}

const MenuItemImage: React.FC<Props> = ({ control }) => {
  const translation = useTranslations();

  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
    <ImgCrop
      aspect={1.6}
      rotationSlider
      aspectSlider
    >
      <Form.Item
        label="Upload"
      // valuePropName="fileList"
      // getValueFromEvent={normFile}
      >
        <Controller
          name="fileList"
          control={control}
          rules={{ required: { value: true, message: translation('form.validation.required') } }}
          render={({ field }) => (
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={onPreview}
              {...field}
              onChange={onChange}
            >
              {fileList.length < 1 && '+ Upload'}
            </Upload>
          )}
        />
      </Form.Item>
    </ImgCrop>
  );
};

export default MenuItemImage;