'use client'

import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Button, Form, Input, InputNumber, Popconfirm, Space, Table, Tag, Typography } from 'antd';
import { menuItems, tags } from '@app/mocks';
import { defaultLocale, locales } from '@app/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

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
      fixed: true,
      dataIndex: 'pictureURL',
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
        // width: '25%',
        editable: true,
        fixed: locale === defaultLocale,
      }))
    },
    {
      title: translation('common.subtitle'),
      children: locales.map((locale) => ({
        title: translation(`common.locale.${locale}`),
        dataIndex: ['sub', locale],
      }))
    },
    {
      title: translation('common.description'),
      children: locales.map((locale) => ({
        title: translation(`common.locale.${locale}`),
        dataIndex: ['description', locale],
      }))
    },
    {
      title: translation('common.icon'),
      dataIndex: 'icon',
    },
    {
      title: translation('Dashboard.section.tags.title'),
      dataIndex: 'tags',
      render: (tagIds: string[]) => {
        return tagIds
          .map((tagId) => tags.find(({ id }) => id === tagId))
          .map((tag) => tag && <Tag key={tag.id}>{tag.name[currentLocale]}</Tag>)
      }
    },
    {
      title: translation('common.action'),
      fixed: 'right' as 'right',
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
    <Form form={form} component={false}>
      <Table
        className="w-[1600px]"
        rowKey="key"
        bordered
        virtual
        scroll={{ y: 800, x: 2200 }}
        dataSource={originData}
        columns={columns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};

export default SectionMenuItems;