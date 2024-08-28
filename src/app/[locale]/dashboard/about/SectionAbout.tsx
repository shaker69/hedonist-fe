'use client'

import {
  Button,
  Form,
  FormProps,
  Input,
  message,
  TimePicker,
} from "antd";
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
    <section className="flex-auto flex flex-col gap-5">
      <h1 className="mt-6 text-color-primary text-3xl font-semibold">{translation(`Dashboard.section.about.title`)}</h1>

      <div className="flex-auto flex p-6 bg-white rounded-xl">
        <Form
          id="about-form"
          onFinish={handleSubmit(onFinish!)}
          className="flex-auto flex flex-col gap-5"
        >
          <div className="flex-auto flex">
            <div className="flex-auto flex flex-col gap-14">
              <FormFieldWrapper
                id="workingHours"
                label={translation(`Dashboard.section.about.workingHours`)}
                labelLg
              >
                <Form.Item
                  style={{ marginBottom: 0 }}
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

              <FormFieldWrapper
                id="address"
                label={translation(`Dashboard.section.about.address`)}
                labelLg
              >
                {locales.map((locale) => (
                  <Form.Item
                    key={locale}
                    layout="vertical"
                    label={<span className="font-semibold">{translation(`common.locale.${locale}`)}</span>}
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

              <FormFieldWrapper
                id="instagram"
                label={translation(`Dashboard.section.about.socialNetworks`)}
                labelLg
              >
                <Form.Item
                  layout="vertical"
                  label={<span className="font-semibold">{translation(`Dashboard.section.about.instagram`)}</span>}
                >
                  <Controller
                    name="Instagram"
                    control={control}
                    render={({ field }) => <Input id="instagram" {...field} />}
                  />
                </Form.Item>
              </FormFieldWrapper>
            </div>
            <div className={`h-full w-60`} />
          </div>

          <footer className="flex justify-end items-center">
            <Button
              htmlType="reset"
              form="about-form"
              className="mr-4"
              disabled={!isDirty}
              onClick={() =>reset()}
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
          </footer>
        </Form>
      </div>
    </section>
  )
}