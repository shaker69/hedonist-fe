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
import { get, omit } from 'lodash-es';
import { useLocale, useTranslations } from 'next-intl';
import { useForm, Controller, FormProvider } from 'react-hook-form';

import { FormFieldWrapper } from '@app/components';
import { formItemLayout } from '@app/constants';
import { defaultLocale, locales } from '@app/navigation';

import MenuItemImage from './MenuItemImage';

import HintRu from '@public/structure-hint/ru.svg';
import HintEn from '@public/structure-hint/en.svg';
import HintKa from '@public/structure-hint/ka.svg';

const defaultTranslationsFields = locales.reduce((acc, l) => ({ ...acc, [l]: '' }), {});

const hintComponentDict = {
  ru: HintRu,
  ka: HintKa,
  en: HintEn,
}

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
  const currentLocale = useLocale() as Locale;

  const formMethods = useForm<FormValues>({
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

  const { handleSubmit, control, formState, reset, getFieldState, getValues } = formMethods;

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
      PictureURL: isDirty && !imageBase64 ? undefined : itemToEdit?.PictureURL,
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

  const validateNumericInput = (value?: string | number) => {
    if (!value) return true;

    const regex = /^[0-9./]*$/;

    if (!regex.test(typeof value === 'string' ? value : value.toString())) {
      return translation('form.validation.priceWeightChars');
    }
    return true;
  };

  const HintComponent = hintComponentDict[currentLocale];

  return (
    <FormProvider {...formMethods}>
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
        okText={translation('common.button.completed')}
        okButtonProps={{
          disabled: !isDirty
        }}
        style={{ top: 50 }}
        classNames={{
          body: "modal-body",
          footer: "modal-footer",
          header: "modal-header",
        }}
        width={800}
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
          label={translation('Dashboard.section.menuItems.structure')}
          sub={<HintComponent />}
        >
          <Form.Item
            layout="vertical"
            label={<span className="font-semibold">{translation('Dashboard.section.tags.title')}</span>}
          >
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

          <Form.Item
            layout="vertical"
            label={<span className="font-semibold">{translation('Dashboard.section.categories.title')}</span>}
          >
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
                  }
                }}
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
          <Form.Item
            validateStatus={formErrors.Weight ? 'error' : ''}
            help={formErrors.Weight ? formErrors.Weight.message : null}
          >
            <Controller
              name="Weight"
              control={control}
              rules={{ validate: validateNumericInput }}
              render={({ field }) => (
                <Input
                  style={{ width: '120px' }}
                  id="weight"
                  {...field}
                />
                // <InputNumber
                //   id="weight"
                //   {...field}
                // />
              )}
            />
          </Form.Item>
        </FormFieldWrapper>

        <FormFieldWrapper
          id="price"
          label={translation('Dashboard.section.menuItems.price', { unit: '₾' })}
        >
          <Form.Item
            validateStatus={formErrors.Price ? 'error' : ''}
            help={formErrors.Price ? formErrors.Price.message : null}
          >
            <Controller
              name="Price"
              control={control}
              rules={{ validate: validateNumericInput }}
              render={({ field }) => (
                <Input
                  style={{ width: '120px' }}
                  id="price"
                  {...field}
                />
                // <InputNumber
                //   id="price"
                //   {...field}
                // />
              )}
            />
          </Form.Item>
        </FormFieldWrapper>
      </Modal>
    </Form>
    </FormProvider>
  );
};

export default MenuItemModal;