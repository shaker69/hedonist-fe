'use client'

import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  message,
} from 'antd';
import { defaultLocale, locales } from '@app/navigation';
import { useLocale, useTranslations } from 'next-intl';

import IconPlus from '@public/icon-plus.svg';
import { deleteCategory, updateCategory } from '@app/actions';
import { omit } from 'lodash-es';
import CreateCategoryModal from './CreateCategoryModal';
import { EmptyContent, NoValue } from '@app/components';
import { splitStringToLines } from '@app/utils';

interface Item extends Category {
  key: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  required?: boolean;
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
  categories?: Category[];
  tags?: Tag[];
}

const SectionCategories: React.FC<Props> = ({ categories = [], tags = [] }) => {
  const translation = useTranslations();
  const [form] = Form.useForm();
  const currentLocale = useLocale();

  const [data, setData] = useState(() => categories.map((cat) => ({
    ...cat,
    key: cat.CategoryId,
  })));

  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;

  const onDelete = async (record: Partial<Item> & { key: React.Key }) => {
    try {
      await deleteCategory(record as Category, { revalidatePaths: ['/categories'] });

      const newData = [...data];
      const index = newData.findIndex((item) => record.CategoryId === item.key);

      newData.splice(index, 1);
      setData(newData);

      message.success(translation(
        'Dashboard.section.message.delete.success',
        { entity: translation('common.entity.category') },
      ));
    } catch (error) {
      message.error(translation(
        'Dashboard.section.message.delete.error',
        { entity: translation('common.entity.category') },
      ));
    }
  }

  const onCreate = (category: Category) => {
    const newData = [{ key: category.CategoryId, ...category }, ...data];
    setData(newData);
    setCreateModalOpen(false);
  }

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
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

        const res = await updateCategory(omit(updatedItem, 'key'), { revalidatePaths: ['/tags', '/categories'] });

        message.success(translation(
          'Dashboard.section.message.update.success',
          { entity: translation('common.entity.category') },
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
        { entity: translation('common.entity.category') },
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
        fixed: locale === defaultLocale,
        width: 200,
        required: true,
      }))
    },
    {
      title: translation('Dashboard.section.tags.title'),
      editable: false,
      dataIndex: 'TagIds',
      width: 150,
      render: (tagIds: string[], record: Item) => {
        const editable = isEditing(record);

        return (
          editable ? (
            <Form.Item
              name="TagIds"
              style={{ margin: 0 }}
            >
              <Select
                mode="tags"
                options={tags.map(({ Name, TagId }) => ({ value: TagId, label: Name[currentLocale] }))}
              />
            </Form.Item>
          ) : (
            tagIds.length
              ? (
                tagIds
                  .map((tagId) => tags.find(({ TagId }) => TagId === tagId))
                  .map((tag) => tag && <Tag key={tag.TagId}>{tag.Name[currentLocale]}</Tag>)
              )
              : <NoValue />
          )
        )
      }
    },
    {
      title: translation('common.description'),
      editable: false,
      children: locales.map((locale) => ({
        title: translation(`common.locale.${locale}`),
        dataIndex: ['Description', locale],
        editable: true,
        width: 350,
        required: false,
      }))
    },
    {
      title: translation('Dashboard.section.categories.allDay'),
      editable: false,
      dataIndex: 'isAllDay',
      width: 100,
      render: (_: any, record: Item) => {
        const editable = isEditing(record);

        return editable ? (
          (
            <Form.Item name="isAllDay">
              <Switch
                disabled={!editable}
              />
            </Form.Item>
          )
        ) : (
          <Switch disabled checked={Boolean(record.isAllDay)} />
        );
      },
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
              loading={isUpdating}
              onClick={() => save(record.key)}
            >
              {translation('common.button.save')}
            </Button>
            <Popconfirm
              title={translation('common.confirmation')}
              onConfirm={cancel}
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
              title={translation('common.confirmation')}
              onConfirm={() => onDelete(record)}
            >
              <Button
                type='link'
                disabled={editingKey !== ''}
              >
                {translation('common.button.delete')}
              </Button>
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
            {translation('Dashboard.section.categories.title')}
            <span className="pl-1 text-2xl">{`(${data.length})`}</span>
          </h1>
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={() => setCreateModalOpen(true)}
          >
            {translation('common.entity.category')}
          </Button>

          <CreateCategoryModal
            open={isCreateModalOpen}
            onConfirm={onCreate}
            onCancel={() => setCreateModalOpen(false)}
            tags={tags}
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
                    scroll={{ y: window.innerHeight - 254, x: true }}
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
                label={splitStringToLines(translation('Dashboard.section.categories.empty'), { className: "text-center" })}
              />
            )
        }
      </section>
    </>
  );
};

export default SectionCategories;