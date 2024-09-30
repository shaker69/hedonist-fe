'use client'

import React, { useState } from 'react';
import type { TableProps } from 'antd';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Space,
  Table,
  message,
} from 'antd';
import { omit } from 'lodash-es';
import { useTranslations } from 'next-intl';

import { deleteTag, updateTag } from '@app/actions';
import { defaultLocale, locales } from '@app/navigation';
import IconPlus from '@public/icon-plus.svg';
import { EmptyContent, NoValue } from '@app/components';
import { splitStringToLines } from '@app/utils';

import CreateTagModal from './CreateTagModal';
import { TABLE_HEIGHT_OFFSET } from '@app/constants';

interface Item extends Tag {
  key: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  required: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  required,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const translation = useTranslations();
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required,
              message: translation('form.validation.required'),
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        Array.isArray(children)
          ? children[1] ? children : <NoValue />
          : children
      )}
    </td>
  );
};

interface Props {
  tags?: Tag[];
}

const SectionTags: React.FC<Props> = ({ tags = [] }) => {
  const translation = useTranslations();
  const [form] = Form.useForm();

  // Current state of the table
  const [data, setData] = useState(() => tags.map((tag) => ({
    ...tag,
    key: tag.TagId,
  })));

  const [editingKey, setEditingKey] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);

  const isEditing = (record: Item) => record.key === editingKey;

  const onDelete = async (record: Partial<Item> & { key: React.Key }) => {
    try {
      await deleteTag(record as Tag, { revalidatePaths: ['/tags'] });

      const newData = [...data];
      const index = newData.findIndex((item) => record.TagId === item.key);

      newData.splice(index, 1);
      setData(newData);

      message.success(translation(
        'Dashboard.section.message.delete.success',
        { entity: translation('common.entity.tag') },
      ));
    } catch (error) {
      message.error(translation(
        'Dashboard.section.message.delete.error',
        { entity: translation('common.entity.tag') },
      ));
    }
  }

  const onCreate = (tag: Tag) => {
    const newData = [{ key: tag.TagId, ...tag }, ...data];
    setData(newData);
    setCreateModalOpen(false);
  }

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      setIsUpdating(true);

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        const updatedItem = {
          ...item,
          ...row,
        };

        newData.splice(index, 1, updatedItem);

        await updateTag(omit(updatedItem, 'key'), { revalidatePaths: ['/tags'] });

        message.success(translation(
          'Dashboard.section.message.update.success',
          { entity: translation('common.entity.tag') },
        ));
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }

    } catch (errInfo) {
      message.error(translation(
        'Dashboard.section.message.update.error',
        { entity: translation('common.entity.tag') },
      ));
    } finally {
      setIsUpdating(false);
    }
  };

  const columns = [
    {
      title: translation('common.name'),
      editable: false,
      children: locales.map((locale) => ({
        title: translation(`common.locale.${locale}`),
        dataIndex: ['Name', locale],
        editable: true,
        required: true,
        fixed: locale === defaultLocale ? 'left' : false,
        width: 200,
      }))
    },
    {
      title: translation('common.action'),
      dataIndex: 'operation',
      editable: false,
      width: 260,
      fixed: 'right' as 'right',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);

        return editable ? (
          <Space className="text-color-link">
            <Button
              type='link'
              onClick={() => save(record.key)}
              loading={isUpdating}
              iconPosition="end"
            >
              {translation('common.button.save')}
            </Button>
            <Popconfirm
              title={translation('common.confirmation')}
              onConfirm={cancel}
              okText={translation('common.button.ok')}
              cancelText={translation('common.button.cancel')}
            >
              <Button
                type='link'
                disabled={isUpdating}
              >
                {translation('common.button.cancel')}
              </Button>
            </Popconfirm>
          </Space>
        ) : (
          <Space className="text-color-link">
            <Button
              type='link'
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              {translation('common.button.edit')}
            </Button>
            <Popconfirm
              disabled={editingKey !== ''}
              title={translation('common.confirmation')}
              onConfirm={() => onDelete(record)}
              okText={translation('common.button.ok')}
              cancelText={translation('common.button.cancel')}
            >
              <Button type='link'>{translation('common.button.delete')}</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const mergedColumns: TableProps['columns'] = columns.map((col) => {
    if (!col.children) {
      return !col.editable
        ? col
        : {
          ...col,
          onCell: (record: Item) => ({
            record,
            inputType: col.dataIndex.includes('age') ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          })
        };
    }

    return {
      ...col,
      children: col.children.map((child) => {
        return !child.editable
          ? child
          : {
            ...child,
            onCell: (record: Item) => ({
              record,
              inputType: child.dataIndex.includes('age') ? 'number' : 'text',
              dataIndex: child.dataIndex,
              title: child.title,
              editing: isEditing(record),
              required: child.required,
            })
          };
      })
    };
  });

  return (
    <>
      <section className="flex flex-col gap-5 flex-auto">
        <div className="mt-6 flex justify-between items-center">
          <h1 className="font-semibold text-3xl">
            {translation('Dashboard.section.tags.title')}
            <span className="pl-1 text-2xl">{`(${data.length})`}</span>
          </h1>
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={() => setCreateModalOpen(true)}
          >
            {translation('common.entity.tag')}
          </Button>

          <CreateTagModal
            open={isCreateModalOpen}
            onConfirm={onCreate}
            onCancel={() => setCreateModalOpen(false)}
          />
        </div>

        {
          Boolean(data.length)
            ? (
              <section className="flex-auto bg-white rounded-xl">
                <Form form={form} component={false}>
                  <Table
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                    className="dashboard-table-w"
                    rowKey="key"
                    bordered
                    virtual
                    scroll={{ y: window.innerHeight - TABLE_HEIGHT_OFFSET, x: true }}
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                  />
                </Form>
              </section>
            )
            : (
              <EmptyContent
                label={splitStringToLines(translation('Dashboard.section.tags.empty'), { className: "text-center" })}
              />
            )
        }
      </section>
    </>
  );
};

export default SectionTags;