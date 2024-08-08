'use client'

import { Button, Form, FormProps, Input, TimePicker } from "antd";
import { get } from 'lodash-es';
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { useForm, Controller } from 'react-hook-form';

import { aboutUsFieldNames } from "@app/constants";
import { defaultLocale, locales } from "@app/navigation";

type FormValues = {
};

export default function SectionConfigs() {
  const { handleSubmit, control, formState, getValues } = useForm<FormValues>({ defaultValues: {
    [aboutUsFieldNames.workingHours]: null,
    [aboutUsFieldNames.address]: locales.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}),
    [aboutUsFieldNames.instagram]: '',
  } });
  const translation = useTranslations();

  const formErrors = formState.errors;
  const isDirty = formState.isDirty;

  const onFinish: FormProps<FormValues>['onFinish'] = async (values) => {
    // TODO: request to BE
    console.log(values);
  };

  return (
    <>
      <h1 className="text-color-primary text-3xl font-semibold my-6">{translation(`Dashboard.section.configs.title`)}</h1>

      <div className="p-6 bg-white rounded-xl">
        <Form
          layout="vertical"
          onFinish={handleSubmit(onFinish)}
        >
          <div className="flex flex-col gap-10 max-w-max">
            123
          </div>

          <footer className="flex justify-end items-center">
            <Form.Item>
              <Button
                type="link"
                htmlType="reset"
                className="mr-4"
                disabled={!isDirty}
              >
                {translation('form.action.cancel')}
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isDirty}
              >
                {translation('form.action.submit')}
              </Button>
            </Form.Item>
          </footer>
        </Form>
      </div>
    </>
  )
}
