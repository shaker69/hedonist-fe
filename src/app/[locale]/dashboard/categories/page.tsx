'use client'

import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Button, Form, Input, InputNumber, Popconfirm, Select, Space, Table, Tag, Typography } from 'antd';
import { categories, tags } from '@app/mocks';
import { defaultLocale, locales } from '@app/navigation';
import { useLocale, useTranslations } from 'next-intl';

import IconPlus from '@public/icon-plus.svg';

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
  const currentLocale = useLocale();
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

  // const handleTagsChange = (value: string) => {
  //   const tagIds = new Set([
  //     ...tags.map(({ id }) => id),
  //     ...data.flatMap((el) => el.tags),
  //   ]);

  //   const newTags = new Set(value).difference(tagIds);

  //   console.log(tagIds);
  //   console.log(value);
  //   console.log(newTags);
  // };

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
        fixed: locale === defaultLocale,
        width: 250,
      }))
    },
    {
      title: translation('Dashboard.section.tags.title'),
      editable: false,
      dataIndex: 'tags',
      width: 250,
      render: (tagIds: string[], record: Item) => {
        const editable = isEditing(record);

        return (
          editable ? (
            <Form.Item
              name="tags"
              style={{ margin: 0 }}
            >
              <Select
                mode="tags"
                // onChange={handleTagsChange}
                options={tags.map(({ id, name }) => ({ value: id, label: name[currentLocale] }))}
              />
            </Form.Item>
          ) : (
            tagIds
              .map((tagId) => tags.find(({ id }) => id === tagId))
              .map((tag) => tag && <Tag key={tag.id}>{tag.name[currentLocale]}</Tag>)
          )
        )
      }
    },
    {
      title: translation('common.description'),
      editable: false,
      children: locales.map((locale) => ({
        title: translation(`common.locale.${locale}`),
        dataIndex: ['description', locale],
        editable: true,
        width: 350,
      }))
    },
    {
      title: translation('common.action'),
      dataIndex: 'operation',
      editable: false,
      fixed: 'right' as 'right',
      width: 260,
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

  const mergedColumns = columns.map((col) => {
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
        <h1 className="text-semibold text-3xl">{translation('Dashboard.section.categories.title')}</h1>
        <Button
          type="primary"
          icon={<IconPlus />}
        >
          {translation('common.entity.category')}
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

export default SectionCategories;