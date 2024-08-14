'use client'

import React, { useState } from 'react';
import { Button, Form, Popconfirm, Space, Table, Tag } from 'antd';
import { defaultLocale, locales } from '@app/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import IconPlus from '@public/icon-plus.svg';
import MenuItemModal from './MenuItemModal';

interface Item extends MenuItem {
  key: string;
}

interface Props {
  categories?: Category[];
  tags?: Tag[];
  menuItems?: MenuItem[];
}

const SectionMenuItems: React.FC<Props> = ({
  categories = [],
  tags = [],
  menuItems = [],
}) => {
  const translation = useTranslations();
  const [form] = Form.useForm();
  const currentLocale = useLocale();

  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const create = () => {
    setItemToEdit(null);
    setCreateModalOpen(true);
  };

  const edit = (record: Item) => {
    setItemToEdit(record);
    setEditModalOpen(true);
  };

  const columns = [
    {
      dataIndex: 'PictureURL',
      width: 150,
      render: (text: string, record: Item) => {
        return (
          <Image
            src={text}
            alt={record.Name[currentLocale]}
            width={120}
            height={90}
          />
        );
      }
    },
    {
      title: translation('common.name'),
      children: locales.map((locale) => ({
        title: translation(`common.locale.${locale}`),
        dataIndex: ['Name', locale],
        width: 200,
        editable: true,
        fixed: locale === defaultLocale,
      }))
    },
    {
      title: translation('common.subtitle'),
      children: locales.map((locale) => ({
        title: translation(`common.locale.${locale}`),
        dataIndex: ['Subtitle', locale],
        width: 250,
      }))
    },
    {
      title: translation('common.description'),
      children: locales.map((locale) => ({
        title: translation(`common.locale.${locale}`),
        dataIndex: ['Description', locale],
        width: 500,
      }))
    },
    {
      title: translation('Dashboard.section.tags.title'),
      dataIndex: 'TagIds',
      width: 150,
      render: (tagIds: string[]) => {
        return tagIds
          .map((tagId) => tags.find(({ TagId }) => TagId === tagId))
          .map((tag) => tag && <Tag key={tag.TagId}>{tag.Name[currentLocale]}</Tag>)
      }
    },
    {
      title: translation('common.action'),
      fixed: 'right' as 'right',
      width: 260,
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        return (
          <Space className="text-color-link">
            <Button
              onClick={() => {
                edit(record);
                setEditModalOpen(true);
              }}
              type='link'
            >
              {translation('common.button.edit')}
            </Button>
            <Popconfirm
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

  return (
    <section className="flex flex-col gap-8 flex-auto">
      <div className="mt-8 flex justify-between items-center">
        <h1 className="text-semibold text-3xl">{translation('Dashboard.section.menuItems.title')}</h1>
        <Button
          type="primary"
          icon={<IconPlus />}
          onClick={() => create()}
        >
          {translation('common.entity.menuItem')}
        </Button>
      </div>

      <Form form={form} component={false}>
        <Table
          className="dashboard-table-w"
          rowKey="key"
          bordered
          virtual
          scroll={{ y: window.innerHeight - 254, x: true }}
          dataSource={menuItems.map((item) => ({
            ...item,
            key: item.MenuItemId,
          }))}
          columns={columns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>

      <MenuItemModal
        open={isCreateModalOpen}
        onConfirm={console.log}
        onCancel={() => setCreateModalOpen(false)}
        tags={tags}
        categories={categories}
      />

      <MenuItemModal
        open={isEditModalOpen}
        onConfirm={console.log}
        onCancel={() => setCreateModalOpen(false)}
        tags={tags}
        itemToEdit={itemToEdit}
        categories={categories}
      />
    </section>
  );
};

export default SectionMenuItems;