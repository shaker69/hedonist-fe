'use client'

import { Button, Divider, Form, FormProps, Input, message, TimePicker } from "antd";
import { Dayjs } from "dayjs";
import { get } from 'lodash-es';
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { useForm, Controller } from 'react-hook-form';

import { aboutUsFieldNames } from "@app/constants";
import { defaultLocale, locales } from "@app/navigation";
import { upsertConfigs } from "@app/actions";
import { parseTimeRange } from "@app/utils";
import { FormFieldWrapper } from "@app/components";

type FormValues = {
  Address?: {
    [key: string]: string;
  };
  WorkingHours?: any;
  Instagram?: string;
};

const formatTimeRange = (items: [Dayjs, Dayjs]) => items.map(item => item.format()).join(';');

interface Props {
  configs: AppConfigs;
}

export default function SectionAbout({ configs }: Props) {
  const {
    Address,
    Instagram,
    WorkingHours,
  } = configs;

  const { handleSubmit, control, formState, reset } = useForm<FormValues>({
    defaultValues: {
      [aboutUsFieldNames.workingHours]: WorkingHours ? parseTimeRange(WorkingHours) : null,
      [aboutUsFieldNames.address]: Address || locales.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}),
      [aboutUsFieldNames.instagram]: Instagram ?? '',
    }
  });
  const translation = useTranslations();

  const formErrors = formState.errors;
  const isDirty = formState.isDirty;

  const onFinish: FormProps<FormValues>['onFinish'] = async ({ WorkingHours, ...values }) => {
    const formValues = {
      [aboutUsFieldNames.workingHours]: formatTimeRange(WorkingHours),
      ...values
    };

    const data = {
      ...configs,
      ...formValues,
    };

    const actionMessageType = configs.ConfigId ? 'update' : 'create';

    try {
      const result = await upsertConfigs(data, { revalidatePaths: ['/configs'] });

      reset({
        ...formValues,
        WorkingHours,
      });

      message.success(translation(
        `Dashboard.section.message.${actionMessageType}.success`,
        { entity: translation('common.entity.configs') },
      ));
    } catch (error) {
      message.error(translation(
        `Dashboard.section.message.${actionMessageType}.error`,
        { entity: translation('common.entity.configs') },
      ));
    };
  }

  return (
    <>
      <h1 className="text-color-primary text-3xl font-semibold my-6">{translation(`Dashboard.section.about.title`)}</h1>

      <div className="flex-auto flex flex-col p-6 bg-white rounded-xl">
        <Form
          onFinish={handleSubmit(onFinish!)}
          className="flex-auto flex flex-col"
        >
          <div className="flex-auto flex flex-col gap-3 max-w-max">
            <FormFieldWrapper
              id="workingHours"
              label={translation(`Dashboard.section.about.workingHours`)}
            >
              <Form.Item
                validateStatus={get(formErrors, aboutUsFieldNames.workingHours) && "error"}
                help={get(formErrors, aboutUsFieldNames.workingHours)?.message as ReactNode}
              >
                <Controller
                  name="WorkingHours"
                  control={control}
                  rules={{ required: { value: true, message: translation('form.validation.required') } }}
                  render={({ field }) => (
                    <TimePicker.RangePicker
                      id="workingHours"
                      {...field}
                      value={field.value}
                    />
                  )}
                />
              </Form.Item>
            </FormFieldWrapper>

            <Divider />

            <FormFieldWrapper
              id="address"
              label={translation(`Dashboard.section.about.address`)}
            >
              {locales.map((locale) => (
                <Form.Item
                  key={locale}
                  layout="vertical"
                  label={translation(`common.locale.${locale}`)}
                  validateStatus={(defaultLocale === locale && get(formErrors, [aboutUsFieldNames.address])) ? "error" : "success"}
                  help={get(formErrors, aboutUsFieldNames.address)?.message as ReactNode}
                >
                  <Controller
                    name={`Address.${locale}`}
                    control={control}
                    rules={{ required: { value: locale === defaultLocale, message: translation('form.validation.required') } }}
                    render={({ field }) => <Input id="address" {...field} />}
                  />
                </Form.Item>
              ))}
            </FormFieldWrapper>

            <Divider />

            <FormFieldWrapper
              id="instagram"
              label={translation(`Dashboard.section.about.socialNetworks`)}
            >
              <Form.Item
                layout="vertical"
                label={translation(`Dashboard.section.about.instagram`)}
              >
                <Controller
                  name="Instagram"
                  control={control}
                  render={({ field }) => <Input id="instagram" {...field} />}
                />
              </Form.Item>
            </FormFieldWrapper>
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