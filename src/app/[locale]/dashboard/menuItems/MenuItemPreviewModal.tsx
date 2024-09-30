import { Modal, UploadFile } from "antd";

import imagePlaceholder from '@public/image-placeholder.svg?url';
import emoji from '@public/emoji.png';
import Image from "next/image";
import { Control, useFormContext, useFormState } from "react-hook-form";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { formatCurrency } from "@app/utils";

interface Props {
  open?: boolean;
  onCancel: () => void;
}

export const MenuItemPreviewModal: React.FC<Props> = ({
  open,
  onCancel,
}) => {
  const formatter = useFormatter();
  const { getValues } = useFormContext();
  const currentLocale = useLocale();
  const translation = useTranslations();

  const { Name, isRecommended, Price, image, Subtitle } = getValues();

  return (
    <Modal
      title={<span className="text-xl">{translation(`common.preview`)}</span>}
      open={open}
      onCancel={onCancel}
      footer={null}
      classNames={{
        body: 'flex justify-center pt-6',
        content: 'preview-content',
      }}
      width={420}
    >
      <figure
        style={{
          width: 390,
          height: 240,
        }}
        className={`h-60 max-w-sm relative bg-slate-600 rounded-2xl border border-stone-800`}
      >
        <img
          style={{
            objectFit: "cover",
            width: '100%',
            height: '100%',
          }}
          className="max-h-full rounded-2xl"
          src={image[0]?.thumbUrl}
          alt="preview"
        />

        <figcaption className="absolute bottom-0 bg-color-primary text-color-secondary rounded-2xl w-full">
          <section className="relative px-4 py-3 flex flex-col gap-1">
            {isRecommended && (
              <Image
                className="absolute -top-5 -right-2 w-10 h-10 rotate-12"
                priority
                src={emoji}
                alt="isRecommended"
              />
            )}

            <h3 className="font-medium text-sm/[17px]">{Name?.[currentLocale]}</h3>
            {/* TODO: requirements says that ingredients stored in subtitle, but... just for future */}
            {/* {!!ingredientsString?.length && <p className="text-xxs/[0.75rem] text-color-text-secondary">{ingredientsString}</p>} */}
            <p className="text-xxs/[0.75rem] text-color-text-secondary">{Subtitle?.[currentLocale]}</p>
            {!!Price && <p className="font-medium text-sm/[17px]">{formatCurrency(formatter, Price)}</p>}
          </section>
        </figcaption>
      </figure>
    </Modal>
  )
};
