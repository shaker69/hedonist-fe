import React, { ReactNode, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
  UploadFile,
} from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { defaultLocale, locales } from '@app/navigation';
import { get, omit } from 'lodash-es';
import MenuItemImage from './MenuItemImage';
import { formItemLayout } from '@app/constants';
import { FormFieldWrapper } from '@app/components';

const defaultTranslationsFields = locales.reduce((acc, l) => ({ ...acc, [l]: '' }), {});

interface Props {
  categories: Category[],
  tags: Tag[],
  open: boolean;
  onConfirm: (menuItem: MenuItem & { imageBase64?: string }) => Promise<boolean>,
  onCancel: () => any,
  itemToEdit?: MenuItem & { image?: UploadFile[] } | null
}

type FormValues = MenuItem & {
  image: UploadFile[];
};

const MenuItemModal: React.FC<Props> = ({
  open,
  onCancel,
  onConfirm,
  categories,
  tags,
  itemToEdit,
}) => {
  const translation = useTranslations();
  const currentLocale = useLocale();

  const { handleSubmit, control, formState, reset, getFieldState, getValues } = useForm<FormValues>({
    defaultValues: {
      image: itemToEdit?.image || [],
      Name: itemToEdit?.Name || defaultTranslationsFields,
      TagIds: itemToEdit?.TagIds || [],
      CategoryIds: itemToEdit?.CategoryIds || [],
      Currency: itemToEdit?.Currency ?? 'GEL',
      Description: itemToEdit?.Description || defaultTranslationsFields,
      isRecommended: itemToEdit?.isRecommended || false,
      Price: itemToEdit?.Price || 0,
      Subtitle: itemToEdit?.Subtitle || defaultTranslationsFields,
      Weight: itemToEdit?.Weight || 0,
    }
  });

  const formErrors = formState.errors;
  const isDirty = formState.isDirty;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async ({ image, ...values }: FormValues) => {
    setConfirmLoading(true);

    const { isDirty } = getFieldState('image');

    const imageBase64: string | undefined = isDirty ? await new Promise((res, rej) => {
      if (!image[0]?.originFileObj) return res(undefined);

      const reader = new FileReader();
      reader.readAsDataURL(image[0].originFileObj);
      reader.onloadend = () => res(reader.result?.toString().split(',')[1]);
      reader.onerror = rej;
    }) : undefined;

    const success = await onConfirm(omit({
      ...(itemToEdit || {}),
    ...values,
      imageBase64,
    }, ['image']));

    if (success) {
      reset();
    }

    setConfirmLoading(false);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  }

  return (
    <Form
      component={false}
      {...formItemLayout}
      onFinish={handleSubmit(handleOk)}
    >
      <Modal
        title={<span className="text-xl">{translation(`Dashboard.section.menuItems.${itemToEdit ? 'edit' : 'new'}`)}</span>}
        open={open}
        onOk={handleSubmit(handleOk)}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText={translation('common.button.cancel')}
        okText={translation('common.button.ok')}
        okButtonProps={{
          disabled: !isDirty
        }}
        classNames={{
          body: "flex flex-col gap-5"
        }}
        width="50%"
        maskClosable={false}
      >
        <FormFieldWrapper
          id="image"
          label={translation('Dashboard.section.menuItems.image')}
          sub={translation('Dashboard.section.menuItems.fieldDescription.image')}
        >
          <Form.Item
            // validateStatus={get(formErrors, 'image') && "error"}
            // help={get(formErrors, 'image')?.message as ReactNode}
          >
            <Controller
              name="image"
              control={control}
              // rules={{ required: { value: true, message: translation('form.validation.required') } }}
              render={({ field }) => (
                <MenuItemImage
                  id="image"
                  fileList={field.value}
                  onChange={({ fileList }) => { field.onChange(fileList) }}
                />
              )}
            />
          </Form.Item>
        </FormFieldWrapper>

        <FormFieldWrapper
          id="tags"
          label={translation('Dashboard.section.tags.title')}
        >
          <Form.Item>
            <Controller
              name="TagIds"
              control={control}
              render={({ field }) => (
                <Select
                  id="tags"
                  mode="tags"
                  options={tags.map(({ Name, TagId }) => ({ value: TagId, label: Name[currentLocale] }))}
                  {...field}
                />
              )}
            />
          </Form.Item>
        </FormFieldWrapper>

        <FormFieldWrapper
          id="categories"
          label={translation('Dashboard.section.categories.title')}
        >
          <Form.Item>
            <Controller
              name="CategoryIds"
              control={control}
              render={({ field }) => (
                <Select
                  id="categories"
                  mode="multiple"
                  options={categories.map(({ Name, CategoryId }) => ({ value: CategoryId, label: Name[currentLocale] }))}
                  {...field}
                />
              )}
            />
          </Form.Item>
        </FormFieldWrapper>

        <FormFieldWrapper
          id="name"
          label={translation('common.name')}
        >
          {locales.map((l) => (
            <Form.Item
              key={l}
              layout='vertical'
              label={<span className="font-semibold">{translation(`common.locale.${l}`)}</span>}
              validateStatus={(Boolean(l === defaultLocale || itemToEdit?.MenuItemId) && get(formErrors, ['Name', l])) ? "error" : "success"}
              help={get(formErrors, ['Name', l])?.message as ReactNode}
            >
              <Controller
                name={`Name.${l}`}
                control={control}
                render={({ field }) => <Input id="name" {...field} />}
                rules={{
                  required: {
                    value: Boolean(l === defaultLocale || itemToEdit?.MenuItemId),
                    message: translation('form.validation.required'),
                  } }}
              />
            </Form.Item>
          ))}
        </FormFieldWrapper>

        <FormFieldWrapper
          id="description"
          label={translation('common.description')}
          sub={translation('Dashboard.section.menuItems.fieldDescription.description')}
        >
          {locales.map((l) => (
            <Form.Item
              key={l}
              layout='vertical'
              label={<span className="font-semibold">{translation(`common.locale.${l}`)}</span>}
              validateStatus={(defaultLocale === l && get(formErrors, 'Description')) ? "error" : "success"}
              help={get(formErrors, 'Description')?.message as ReactNode}
            >
              <Controller
                name={`Description.${l}`}
                control={control}
                render={({ field }) => <Input.TextArea id="description" {...field} />}
              />
            </Form.Item>
          ))}
        </FormFieldWrapper>

        <FormFieldWrapper
          id="ingredients"
          label={translation('Dashboard.section.menuItems.ingredients')}
        >
          {locales.map((l) => (
            <Form.Item
              key={l}
              layout='vertical'
              label={<span className="font-semibold">{translation(`common.locale.${l}`)}</span>}
              validateStatus={(defaultLocale === l && get(formErrors, 'Description')) ? "error" : "success"}
              help={get(formErrors, 'Subtitle')?.message as ReactNode}
            >
              <Controller
                name={`Subtitle.${l}`}
                control={control}
                render={({ field }) => <Input.TextArea id="ingredients" {...field} />}
              />
            </Form.Item>
          ))}
        </FormFieldWrapper>

        <FormFieldWrapper
          id="isRecommended"
          label={translation('Dashboard.section.menuItems.isRecommended')}
          sub={translation('Dashboard.section.menuItems.fieldDescription.isRecommended')}
        >
          <Form.Item>
            <Controller
              name="isRecommended"
              control={control}
              render={({ field }) => <Switch id="isRecommended" {...field} />}
            />
          </Form.Item>
        </FormFieldWrapper>

        <FormFieldWrapper
          id="weight"
          label={translation('Dashboard.section.menuItems.weight', { unit: translation('common.unit.gram.short') })}
        >
          <Controller
            name="Weight"
            control={control}
            render={({ field }) => (
              <Input
                id="weight"
                className="ant-col-xs-24 ant-col-sm-18"
                {...field}
              />
              // <InputNumber
              //   id="weight"
              //   {...field}
              // />
            )}
          />
        </FormFieldWrapper>

        <FormFieldWrapper
          id="price"
          label={translation('Dashboard.section.menuItems.price', { unit: '₾' })}
        >
          <Controller
            name="Price"
            control={control}
            render={({ field }) => (
              <Input
                id="price"
                className="ant-col-xs-24 ant-col-sm-18"
                {...field}
              />
              // <InputNumber
              //   id="price"
              //   {...field}
              // />
            )}
          />
        </FormFieldWrapper>
      </Modal>
    </Form>
  );
};

export default MenuItemModal;