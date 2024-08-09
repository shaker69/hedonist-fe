import React, { ReactNode, useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { defaultLocale, locales } from '@app/navigation';
import { get } from 'lodash-es';
import { createTag } from '@app/actions';

interface Props {
  open: boolean;
  onConfirm: (tag: Tag) => void,
  onCancel: () => any,
}

type FormValues = Pick<Tag, 'Name'>

const CreateTagModal: React.FC<Props> = ({ open, onCancel, onConfirm }) => {
  const translation = useTranslations();
  const [form] = Form.useForm();
  const { handleSubmit, control, formState, getValues } = useForm<FormValues>({
    defaultValues: {
      Name: locales.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}),
    }
  });

  const formErrors = formState.errors;
  const isDirty = formState.isDirty;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const handleOk = async (values: FormValues) => {
    setConfirmLoading(true);

    try {
      const result = await createTag(values);
      
      onConfirm(result);
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

  return (
    <Form
      form={form}
      component={false}
      layout="vertical"
    >
      <Modal
        title={translation('Dashboard.section.tags.new')}
        open={open}
        onOk={handleSubmit(handleOk)}
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        cancelText={translation('common.button.cancel')}
        okText={translation('common.button.ok')}
        okButtonProps={{
          disabled: !isDirty
        }}
      >
        <section
          id="address-form-section"
          className="flex flex-col gap-2"
        >
          <label
            id="tag-fields-label"
            className="text-lg font-semibold"
          >
            {translation('common.name')}
          </label>

          {locales.map((l) => (
            <Form.Item
              key={l}
              label={translation(`common.locale.${l}`)}
              validateStatus={(defaultLocale === l && get(formErrors, 'Name')) ? "error" : "success"}
              help={get(formErrors, 'Name')?.message as ReactNode}
            >
              <Controller
                name={`Name.${l}`}
                control={control}
                rules={{ required: { value: l === defaultLocale, message: translation('form.validation.required') } }}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          ))}
        </section>
      </Modal>
    </Form>
  );
};

export default CreateTagModal;