'use client'

import { Button, Form, FormProps, message, Select } from "antd";
import { get } from 'lodash-es';
import { useLocale, useTranslations } from "next-intl";
import { useForm, Controller } from 'react-hook-form';

import { aboutUsFieldNames } from "@app/constants";
import { defaultLocale, locales } from "@app/navigation";
import { upsertConfigs } from "@app/actions";
import { FormFieldWrapper } from "@app/components";

type FormValues = {
  TagFilters: string[],
};

interface Props {
  configs: AppConfigs;
  tags: Tag[];
}

const defaultOptionValue = 'isRecommended';
const defaultOption = { value: defaultOptionValue, label: '🤤', disabled: true };

const getTagsOptions = (tags: Tag[], currentLocale: Locale) => [
  defaultOption,
  ...tags.map(({ Name, TagId }) => ({ value: TagId, label: Name[currentLocale] })),
];

export default function SectionConfigs({ configs, tags }: Props) {
  const { TagFilters } = configs;
  const currentLocale = useLocale() as Locale;

  const { handleSubmit, control, formState, reset } = useForm<FormValues>({
    defaultValues: {
      TagFilters: TagFilters ? [defaultOptionValue, ...TagFilters] : [defaultOptionValue],
    }
  });
  const translation = useTranslations();

  const formErrors = formState.errors;
  const isDirty = formState.isDirty;

  const onFinish: FormProps<FormValues>['onFinish'] = async (values) => {
    const formValues = {
      ...values,
      TagFilters: values.TagFilters?.filter((tagId) => tagId !== defaultOptionValue),
    };

    const data = {
      ...configs,
      ...formValues,
    };

    const actionMessageType = configs.ConfigId ? 'update' : 'create';

    try {
      const result = await upsertConfigs(data, { revalidatePaths: ['/configs', '/tags'] });

      reset(values);

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
      <h1 className="mt-6 text-color-primary text-3xl font-semibold">{translation(`Dashboard.section.configs.title`)}</h1>

      <div className="flex-auto flex flex-col p-6 bg-white rounded-xl">
        <Form
          onFinish={handleSubmit(onFinish)}
          className="flex-auto flex flex-col"
        >
          <div className="flex-auto flex">
            <FormFieldWrapper
              id="tags"
              label={translation(`Dashboard.section.configs.tagsFilter`)}
              labelLg
            >
              <Form.Item>
                <Controller
                  name="TagFilters"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="tags"
                      mode="tags"
                      options={getTagsOptions(tags, currentLocale)}
                      {...field}
                    />
                  )}
                />
              </Form.Item>
            </FormFieldWrapper>
            <div className={`h-full w-60`} />
          </div>

          <footer className="flex justify-end items-center">
            <Button
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
          </footer>
        </Form>
      </div>
    </section>
  )
}
