import React, { ReactNode, useState } from 'react';
import { Button, Divider, Form, Input, InputNumber, Modal, Select, Switch, message } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { defaultLocale, locales } from '@app/navigation';
import { get } from 'lodash-es';
import { createTag } from '@app/actions';
import MenuItemImage from './MenuItemImage';
import { formItemLayout } from '@app/constants';
import { FormFieldWrapper } from '@app/components';

const defaultTranslationsFields = locales.reduce((acc, l) => ({ ...acc, [l]: '' }), {});

interface Props {
  categories: Category[],
  tags: Tag[],
  open: boolean;
  onConfirm: (tag: Tag) => void,
  onCancel: () => any,
  itemToEdit?: MenuItem & { key: React.Key } | null
}

type FormValues = MenuItem & { image: string[] };

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

  const { handleSubmit, control, formState, reset } = useForm<FormValues>({
    defaultValues: {
      image: [],
      Name: locales.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}),
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

  const handleOk = async (values: FormValues) => {
    setConfirmLoading(true);

    try {
      // const result = await createTag(values, { revalidatePaths: ['/tags'] });

      // onConfirm(result);

      console.log('values', values);
      reset();
      message.success(translation(
        'Dashboard.section.message.create.success',
        { entity: translation('common.entity.menuItem') },
      ));
    } catch (error) {
      message.error(translation(
        'Dashboard.section.message.create.error',
        { entity: translation('common.entity.menuItem') },
      ));
    }

    setConfirmLoading(false);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  }

  return (
    <Form
      {...formItemLayout}
      onFinish={handleSubmit(handleOk)}
    >
      <Modal
        title={translation(`Dashboard.section.menuItems.${itemToEdit ? 'edit' : 'new'}`)}
        open={open}
        onOk={handleSubmit(handleOk)}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText={translation('common.button.cancel')}
        okText={translation('common.button.ok')}
        okButtonProps={{
          disabled: !isDirty
        }}
        width="50%"
        maskClosable={false}
      >
        <FormFieldWrapper
          id="image"
          label={translation('Dashboard.section.menuItems.image')}
        >
          <Form.Item>
            <Controller
              name="image"
              control={control}
              rules={{ required: { value: true, message: translation('form.validation.required') } }}
              render={({ field }) => {
                console.log(field)
                return (
                  <MenuItemImage
                    id="image"
                    fileList={field.value}
                  />
                );
              }}
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
                  mode="tags"
                  options={categories.map(({ Name, CategoryId }) => ({ value: CategoryId, label: Name[currentLocale] }))}
                  {...field}
                />
              )}
            />
          </Form.Item>
        </FormFieldWrapper>
        
        <Divider />

        <FormFieldWrapper
          id="name"
          label={translation('common.name')}
        >
          {locales.map((l) => (
            <Form.Item
              key={l}
              layout='vertical'
              label={<span className="font-semibold">{translation(`common.locale.${l}`)}</span>}
              validateStatus={(defaultLocale === l && get(formErrors, 'Name')) ? "error" : "success"}
              help={get(formErrors, 'Name')?.message as ReactNode}
            >
              <Controller
                name={`Name.${l}`}
                control={control}
                render={({ field }) => <Input id="name" {...field} />}
                rules={{ required: { value: l === defaultLocale, message: translation('form.validation.required') } }}
              />
            </Form.Item>
          ))}
        </FormFieldWrapper>

        <Divider />

        <FormFieldWrapper
          id="description"
          label={translation('common.description')}
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

        <Divider />

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
              <InputNumber
                id="weight"
                {...field}
              />
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
              <InputNumber
                id="price"
                {...field}
              />
            )}
          />
        </FormFieldWrapper>
      </Modal>
    </Form>
  );
};

export default MenuItemModal;