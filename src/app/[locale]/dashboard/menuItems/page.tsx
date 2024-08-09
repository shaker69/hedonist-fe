'use client'

import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Button, Form, Input, InputNumber, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import { menuItems, tags } from '@app/mocks';
import { defaultLocale, locales } from '@app/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import IconPlus from '@public/icon-plus.svg';

interface Item extends MenuItem {
  key: string;
}

const originData: Item[] = menuItems.map((item) => ({
  ...item,
  key: item.id,
}));

const SectionMenuItems: React.FC = () => {
  const translation = useTranslations();
  const [form] = Form.useForm();
  const currentLocale = useLocale();

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    console.log('edit');
  };

  const columns = [
    {
      dataIndex: 'pictureURL',
      width: 150,
      render: (text: string, record: Item) => {
        return (
          <Image
            src={text}
            alt={record.name[currentLocale]}
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
        dataIndex: ['name', locale],
        width: 250,
        editable: true,
        fixed: locale === defaultLocale,
      }))
    },
    {
      title: translation('common.subtitle'),
      children: locales.map((locale) => ({
        title: translation(`common.locale.${locale}`),
        dataIndex: ['sub', locale],
        width: 250,
      }))
    },
    {
      title: translation('common.description'),
      children: locales.map((locale) => ({
        title: translation(`common.locale.${locale}`),
        dataIndex: ['description', locale],
        width: 500,
      }))
    },
    {
      title: translation('Dashboard.section.tags.title'),
      dataIndex: 'tags',
      width: 300,
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
              onClick={() => edit(record)}
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
          dataSource={originData}
          columns={columns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </section>
  );
};

export default SectionMenuItems;