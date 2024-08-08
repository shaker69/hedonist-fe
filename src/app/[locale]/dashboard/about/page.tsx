'use client'

import { Button, Form, FormProps, Input, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { get } from 'lodash-es';
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { useForm, Controller } from 'react-hook-form';

import { aboutUsFieldNames } from "@app/constants";
import { defaultLocale, locales } from "@app/navigation";

type FormValues = {
  address?: {
    [key: string]: string;
  };
  workingHours?: any;
  instagram?: string;
};

const formatTimeRange = (items: [Dayjs, Dayjs]) => items.map(item => item.format()).join(';');

const parseTimeRange = (rangeString: string) => rangeString.split(';').map(timeString => dayjs(timeString));

export default function SectionAbout() {
  const { handleSubmit, control, formState, getValues } = useForm<FormValues>({ defaultValues: {
    [aboutUsFieldNames.workingHours]: null,
    [aboutUsFieldNames.address]: locales.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}),
    [aboutUsFieldNames.instagram]: '',
  } });
  const translation = useTranslations();

  const formErrors = formState.errors;
  const isDirty = formState.isDirty;

  const onFinish: FormProps<FormValues>['onFinish'] = async ({ workingHours, ...values }) => {
    // TODO: request to BE
    console.log(formatTimeRange(workingHours), values);
  };

  return (
    <>
      <h1 className="text-color-primary text-3xl font-semibold my-6">{translation(`Dashboard.section.about.title`)}</h1>

      <div className="p-6 bg-white rounded-xl">
        <Form
          layout="vertical"
          onFinish={handleSubmit(onFinish)}
        >
          <div className="flex flex-col gap-10 max-w-max">
            <Form.Item
              label={<span className="text-lg">{translation(`Dashboard.section.about.workingHours`)}</span>}
              validateStatus={get(formErrors, aboutUsFieldNames.workingHours) && "error"}
              help={get(formErrors, aboutUsFieldNames.workingHours)?.message as ReactNode}
            >
              <Controller
                name="workingHours"
                control={control}
                rules={{ required: { value: true, message: translation('form.validation.required') } }}
                render={({ field }) => <TimePicker.RangePicker {...field} value={field.value} />}
              />
            </Form.Item>

            <section
              id="address-form-section"
              className="flex flex-col gap-2"
            >
              <label
                id="address-fields-label"
                className="text-lg"
              >
                {translation(`Dashboard.section.about.address`)}
              </label>

              {locales.map((locale) => (
                <Form.Item
                  key={locale}
                  label={translation(`common.locale.${locale}`)}
                  validateStatus={(defaultLocale === locale && get(formErrors, [aboutUsFieldNames.address])) ? "error" : "success"}
                  help={get(formErrors, aboutUsFieldNames.address)?.message as ReactNode}
                >
                  <Controller
                    name={`address.${locale}`}
                    control={control}
                    rules={{ required: { value: locale === defaultLocale, message: translation('form.validation.required') } }}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
              ))}
            </section>

            <Form.Item
              label={<span className="text-lg">{translation(`Dashboard.section.about.instagram`)}</span>}
            >
              <Controller
                name="instagram"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
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
