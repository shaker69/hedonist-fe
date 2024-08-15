import React, { ReactNode, useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { defaultLocale, locales } from '@app/navigation';
import { get } from 'lodash-es';
import { createTag } from '@app/actions';
import { FormFieldWrapper } from '@app/components';

interface Props {
  open: boolean;
  onConfirm: (tag: Tag) => void,
  onCancel: () => any,
}

type FormValues = Pick<Tag, 'Name'>

const CreateTagModal: React.FC<Props> = ({ open, onCancel, onConfirm }) => {
  const translation = useTranslations();
  const [form] = Form.useForm();
  const { handleSubmit, control, formState, reset } = useForm<FormValues>({
    defaultValues: {
      Name: locales.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}),
    }
  });

  const formErrors = formState.errors;
  const isDirty = formState.isDirty;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async (values: FormValues) => {
    setConfirmLoading(true);

    try {
      const result = await createTag(values, { revalidatePaths: ['/tags'] });

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
    <Form form={form}>
      <Modal
        title={translation('Dashboard.section.tags.new')}
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
          content: "min-w-[480px]",
        }}
        width="40%"
      >
        <FormFieldWrapper
          id="name"
          label={translation('common.name')}
        >
          {locales.map((l) => (
            <Form.Item
              key={l}
              label={<span className="font-semibold">{translation(`common.locale.${l}`)}</span>}
              layout="vertical"
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
      </Modal>
    </Form>
  );
};

export default CreateTagModal;