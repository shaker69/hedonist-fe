'use client'

import { Button, Form, FormProps, Input, message } from 'antd';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';

import { LocaleSwitcher, PageLayout } from '@app/components';
import { locales, useRouter } from '@app/navigation';

import Logo from '@public/logo-inverted.svg';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

interface Props {

}

export default function LoginPage({}: Props) {
  const params = useSearchParams();
  const t = useTranslations('Login');
  const router = useRouter();

  const localePattern = new RegExp(`^/(${locales.join('|')})`);
  const callbackUrl = params.get('callbackUrl')?.replace(localePattern, '') || '/';

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await signIn('credentials', {
      ...values,
      redirect: false,
    }).then((result) => {
      if (result?.error) {
        message.config({ top: 630 });
        message.error(t('error', { error: result.error }));
      } else {
        router.push(callbackUrl);
      }
    });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <PageLayout
      component="main"
      className="min-h-svh flex flex-col justify-center items-center bg-color-secondary"
    >
      <LocaleSwitcher className="m-8" />

      <Logo />

      <div
        id="form-wrapper"
        className="m-8 flex justify-center"
      >
        <Form
          action="/api/auth/callback/credentials"
          method="post"
          name="login"
          labelCol={{ span: 11 }}
          wrapperCol={{ span: 13 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex flex-col gap-[15px]"
        >
          <Form.Item<FieldType>
            label={t('username')}
            name="username"
            rules={[{ required: true, message: t('validation.usernameRequred') }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label={t('password')}
            name="password"
            rules={[{ required: true, message: t('validation.passwordRequred') }]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

          <Form.Item className="flex justify-center">
            <Button
              className="mt-[15px]"
              type="primary"
              htmlType="submit"
            >
              {t('submit')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  );
}
