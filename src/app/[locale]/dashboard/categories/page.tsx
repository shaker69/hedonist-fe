'use client'

import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Popconfirm, Space, Table, Typography } from 'antd';
import { categories } from '@app/mocks';
import { locales } from '@app/navigation';
import { useTranslations } from 'next-intl';

interface Item extends Category {
  key: string;
}

const originData: Item[] = categories.map((cat) => ({
  ...cat,
  key: cat.id,
}));

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
          // rules={[
          //   {
          //     required: true,
          //     message: `Please Input ${title}!`,
          //   },
          // ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const SectionCategories: React.FC = () => {
  const translation = useTranslations();
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
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
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: translation('common.name'),
      editable: false,
      children: locales.map((locale) => ({
        title: translation(`common.locale.${locale}`),
        dataIndex: ['name', locale],
        editable: true,
      }))
    },
    {
      title: translation('common.icon'),
      editable: true,
      dataIndex: 'icon',
    },
    {
      title: translation('Dashboard.section.tags.title'),
      editable: true,
      dataIndex: 'tags',
      render: (_, record) => {
        return 'Mock'
      }
    },
    {
      title: translation('common.description'),
      editable: false,
      children: locales.map((locale) => ({
        title: translation(`common.locale.${locale}`),
        dataIndex: ['description', locale],
        editable: true,
      }))
    },
    {
      title: translation('common.action'),
      dataIndex: 'operation',
      editable: false,
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="text-color-link">
            <Typography.Link onClick={() => save(record.key)} style={{ marginInlineEnd: 8 }}>
              {translation('common.button.save')}
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>{translation('common.button.cancel')}</a>
            </Popconfirm>
          </span>
        ) : (
          <Space className="text-color-link">
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              {translation('common.button.edit')}
            </Typography.Link>
            <Typography.Link disabled={editingKey !== ''} onClick={console.log}>
              {translation('common.button.delete')}
            </Typography.Link>
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
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        // className="w-[1600px]"
        rowKey="key"
        bordered
        virtual
        scroll={{ x: 1800, y: 800 }}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};

export default SectionCategories;