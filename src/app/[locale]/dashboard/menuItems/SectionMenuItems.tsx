'use client'

import {
  Button,
  Form,
  message,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tag,
} from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useState } from 'react';

import { defaultLocale, locales } from '@app/navigation';

import MenuItemModal from './MenuItemModal';

import IconPlus from '@public/icon-plus.svg';
import { createMenuItem, deleteMenuItem, getBase64ImageFromURL, updateMenuItem } from '@app/actions';
import { omit } from 'lodash-es';
import { getFileFromBase64, splitStringToLines } from '@app/utils';
import { EmptyContent } from '@app/components';

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

  const [itemToEdit, setItemToEdit] = useState<Omit<Item, 'key'> | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const onCloseMenuItemModal = () => {
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setItemToEdit(null);
  };

  const create = () => {
    setItemToEdit(null);
    setCreateModalOpen(true);
  };

  const onCreateMenuItem = async (values: Omit<MenuItem, 'MenuItemId'> & { imageBase64?: string }) => {
    try {
      const result = await createMenuItem(values, { revalidatePaths: ['/menu-items', '/tags'] });

      onCloseMenuItemModal();

      message.success(translation(
        'Dashboard.section.message.create.success',
        { entity: translation('common.entity.menuItem') },
      ));

      return true;
    } catch (error) {
      message.error(translation(
        'Dashboard.section.message.create.error',
        { entity: translation('common.entity.menuItem') },
      ));

      return false;
    }
  }

  const edit = async (record: Item) => {
    if (record.PictureURL) {
      const base64image = await getBase64ImageFromURL(record.PictureURL);
      const file = getFileFromBase64(base64image, `${record.MenuItemId}.jpg`);

      setItemToEdit(omit({ ...record, image: [{ ...file, originFileObj: file }] }, ['key']));
    } else {
      setItemToEdit(omit(record, ['key']));
    }

    setEditModalOpen(true);
  };

  const onEditMenuItem = async (values: MenuItem & { imageBase64?: string }) => {
    console.log(values);

    try {
      const result = await updateMenuItem(values, { revalidatePaths: ['/menu-items', '/tags'] });

      onCloseMenuItemModal();

      message.success(translation(
        'Dashboard.section.message.update.success',
        { entity: translation('common.entity.menuItem') },
      ));

      return true;
    } catch (error) {
      console.log(error);

      message.error(translation(
        'Dashboard.section.message.update.error',
        { entity: translation('common.entity.menuItem') },
      ));

      return false;
    }
  }

  const onDelete = async (record: Partial<Item> & { key: React.Key }) => {
    try {
      await deleteMenuItem(record as MenuItem, { revalidatePaths: ['/menu-items', '/tags'] });

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

  const columns = [
    {
      dataIndex: 'PictureURL',
      title: translation('Dashboard.section.menuItems.image'),
      width: 150,
      fixed: true,
      render: (text: string, record: Item) => {
        const src = `${text}?v=${record._version || 1}`;

        return (
          <Image
            key={src}
            src={src}
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
        // fixed: locale === defaultLocale,
      }))
    },
    {
      title: translation('Dashboard.section.categories.title'),
      dataIndex: 'CategoryIds',
      width: 150,
      render: (categoryIds: string[]) => {
        return categoryIds
          .map((categoryId) => categories.find(({ CategoryId }) => CategoryId === categoryId))
          .map((category) => category && <Tag key={category.CategoryId}>{category.Name[currentLocale]}</Tag>)
      }
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
      title: translation('Dashboard.section.menuItems.isRecommended'),
      editable: false,
      dataIndex: 'isRecommended',
      width: 130,
      render: (_: any, record: Item) => <Switch disabled checked={Boolean(record.isRecommended)} />,
    },
    {
      title: translation('Dashboard.section.menuItems.ingredients'),
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
      title: translation('common.action'),
      fixed: 'right' as 'right',
      width: 260,
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        return (
          <Space>
            <Button
              onClick={() => {
                edit(record);
              }}
              type='link'
            >
              {translation('common.button.edit')}
            </Button>
            <Popconfirm
              title={translation('common.confirmation')}
              onConfirm={() => onDelete(record)}
            >
              <Button type='link'>{translation('common.button.delete')}</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <section className="flex flex-col gap-8 flex-auto">
        <div className="mt-8 flex justify-between items-center">
          <h1 className="text-semibold text-3xl">
            {translation('Dashboard.section.menuItems.title')}
            <span className="pl-1 text-2xl">{`(${menuItems.length})`}</span>
          </h1>
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={() => create()}
          >
            {translation('common.entity.menuItem')}
          </Button>
        </div>

        {
          Boolean(menuItems.length)
            ? (
              <section className="flex-auto bg-white rounded-xl">
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
              </section>
            )
            : (
              <EmptyContent
                label={splitStringToLines(translation('Dashboard.section.menuItems.empty'), { className: "text-center" })}
              />
            )

        }
      </section>

      {isCreateModalOpen && (
        <MenuItemModal
          open
          onConfirm={onCreateMenuItem}
          onCancel={onCloseMenuItemModal}
          tags={tags}
          categories={categories}
        />
      )}

      {isEditModalOpen && (
        <MenuItemModal
          open
          onConfirm={onEditMenuItem}
          onCancel={onCloseMenuItemModal}
          tags={tags}
          itemToEdit={itemToEdit}
          categories={categories}
        />
      )}
    </>
  );
};

export default SectionMenuItems;