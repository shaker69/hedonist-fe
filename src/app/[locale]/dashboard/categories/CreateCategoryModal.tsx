import { Divider, Form, Input, Modal, Select, Switch, message } from 'antd';
import { get } from 'lodash-es';
import React, { ReactNode, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLocale, useTranslations } from 'next-intl';

import { createCategory } from '@app/actions';
import { FormFieldWrapper } from '@app/components';
import { defaultLocale, locales } from '@app/navigation';

interface Props {
  open: boolean;
  onConfirm: (category: Category) => void,
  onCancel: () => any,
  tags: Tag[];
}

type FormValues = Omit<Category, 'CategoryId'>

const CreateCategoryModal: React.FC<Props> = ({ open, onCancel, onConfirm, tags }) => {
  const translation = useTranslations();
  const currentLocale = useLocale();
  const [form] = Form.useForm();
  const { handleSubmit, control, formState, reset } = useForm<FormValues>({
    defaultValues: {
      Name: locales.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}),
      TagIds: [],
      Description: locales.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}),
      isAllDay: false,
    },
  });

  const formErrors = formState.errors;
  const isDirty = formState.isDirty;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async (values: FormValues) => {
    setConfirmLoading(true);

    try {
      const result = await createCategory(values, { revalidatePaths: ['/tags', '/categories'] });

      onConfirm(result);
      reset();
      message.success(translation(
        'Dashboard.section.message.create.success',
        { entity: translation('common.entity.tag') },
      ));
    } catch (error) {
      message.error(translation(
        'Dashboard.section.message.create.error',
        { entity: translation('common.entity.tag') },
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
      form={form}
      component={false}
    >
      <Modal
        title={<span className="text-xl">{translation('Dashboard.section.categories.new')}</span>}
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
          body: 'flex flex-col gap-8',
          content: "min-w-[480px]",
        }}
        width="60%"
      >
        <FormFieldWrapper
          label={translation('common.name')}
          id="name"
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
                rules={{ required: { value: l === defaultLocale, message: translation('form.validation.required') } }}
                render={({ field }) => <Input id="name" {...field} />}
              />
            </Form.Item>
          ))}
        </FormFieldWrapper>

        <FormFieldWrapper
          id="tags"
          label={translation('Dashboard.section.tags.title')}
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
        </FormFieldWrapper>

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

        <FormFieldWrapper
          id="isAllDay"
          label={translation('Dashboard.section.categories.allDay')}
        >
          <Form.Item>
            <Controller
              name="isAllDay"
              control={control}
              render={({ field }) => <Switch id="isAllDay" {...field} />}
            />
          </Form.Item>
        </FormFieldWrapper>
      </Modal>
    </Form>
  );
};

export default CreateCategoryModal;