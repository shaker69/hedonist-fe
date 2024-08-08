'use client'

import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Button, Form, Input, InputNumber, Popconfirm, Space, Table, message } from 'antd';
import { omit } from 'lodash-es';
import { useTranslations } from 'next-intl';

import { updateTag } from '@app/actions';
import { defaultLocale, locales } from '@app/navigation';
import IconPlus from '@public/icon-plus.svg';

interface Item extends Tag {
  key: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
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
  const [data, setData] = useState(() => tags.map((tag) => ({
    ...tag,
    key: tag.TagId,
  })));
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;

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

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        const updatedItem = {
          ...item,
          ...row,
        };

        newData.splice(index, 1, updatedItem);

        await updateTag(omit(updatedItem, 'key'));

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
            >
              {translation('common.button.save')}
            </Button>
            <Popconfirm
              title={translation('common.confirmation')}
              onConfirm={cancel}
            >
              <Button type='link'>{translation('common.button.cancel')}</Button>
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
              onConfirm={() => console.log('delete')}
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
            })
          };
      })
    };
  });

  return (
    <section className="flex flex-col gap-8 flex-auto">
      <div className="mt-8 flex justify-between items-center">
        <h1 className="text-semibold text-3xl">{translation('Dashboard.section.tags.title')}</h1>
        <Button
          type="primary"
          icon={<IconPlus />}
        >
          {translation('common.entity.tag')}
        </Button>
      </div>

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
          scroll={{ y: window.innerHeight - 254, x: true }}
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </section>
  );
};

export default SectionTags;