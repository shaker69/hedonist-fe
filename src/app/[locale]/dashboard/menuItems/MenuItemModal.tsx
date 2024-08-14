import React, { ReactNode, useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { defaultLocale, locales } from '@app/navigation';
import { get } from 'lodash-es';
import { createTag } from '@app/actions';
import MenuItemImage from './MenuItemImage';

interface Props {
  categories: Category[],
  tags: Tag[],
  open: boolean;
  onConfirm: (tag: Tag) => void,
  onCancel: () => any,
  itemToEdit?: MenuItem & { key: React.Key } | null
}

type FormValues = Pick<Tag, 'Name'>

const MenuItemModal: React.FC<Props> = ({
  open,
  onCancel,
  onConfirm,
  categories,
  itemToEdit,
}) => {
  const translation = useTranslations();
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
      // const result = await createTag(values, { revalidatePaths: ['/tags'] });
      
      // onConfirm(result);

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
        width="60%"
      >
        <MenuItemImage control={control} />
      </Modal>
    </Form>
  );
};

export default MenuItemModal;