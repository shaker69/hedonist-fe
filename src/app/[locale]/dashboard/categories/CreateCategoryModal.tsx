import React, { ReactNode, useState } from 'react';
import { Form, Input, Modal, Select, message } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { defaultLocale, locales } from '@app/navigation';
import { get } from 'lodash-es';
import { createCategory } from '@app/actions';

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
    },
  });

  const formErrors = formState.errors;
  const isDirty = formState.isDirty;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async (values: FormValues) => {
    setConfirmLoading(true);

    try {
      const result = await createCategory(values);

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

  const handleCancel = () => {
    reset();
    onCancel();
  }

  return (
    <Form
      form={form}
      component={false}
      layout="vertical"
    >
      <Modal
        title={translation('Dashboard.section.categories.new')}
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
        }}
      >
        <fieldset
          id="address-form-section"
          className="flex flex-col gap-4"
        >
          <legend
            id="tag-fields-label"
            className="text-lg font-semibold mb-4"
          >
            {translation('common.name')}
          </legend>

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
        </fieldset>

        <label>
          <span className="flex text-lg font-semibold mb-4">{translation(`Dashboard.section.tags.title`)}</span>

          <Form.Item>
            <Controller
              name="TagIds"
              control={control}
              render={({ field }) => (
                <Select
                  mode="tags"
                  options={tags.map(({ Name, TagId }) => ({ value: TagId, label: Name[currentLocale] }))}
                  {...field}
                />
              )}
            />
          </Form.Item>
        </label>

        <fieldset
          id="address-form-section"
          className="flex flex-col gap-4"
        >
          <legend
            id="tag-fields-label"
            className="text-lg font-semibold pb-4"
          >
            {translation('common.description')}
          </legend>

          {locales.map((l) => (
            <Form.Item
              key={l}
              label={translation(`common.locale.${l}`)}
              validateStatus={(defaultLocale === l && get(formErrors, 'Description')) ? "error" : "success"}
              help={get(formErrors, 'Description')?.message as ReactNode}
            >
              <Controller
                name={`Description.${l}`}
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          ))}
        </fieldset>
      </Modal>
    </Form>
  );
};

export default CreateCategoryModal;