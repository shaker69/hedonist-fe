'use client'

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

import { locales, usePathname, useRouter } from "@app/navigation";
import Button from "../Button";
import ContentHolder from "../ContentHolder";

import './Tags.css';
import { useLocale } from "next-intl";
import { sortBy } from "lodash-es";

interface Props {
  className?: string;
  tags: Tag[];
}

const TAG_FILTER = 'filter';

export default function Tags({ className, tags }: Props) {
  const stickyRef = useRef(null);

  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const element = stickyRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => entry.target.classList.toggle('active', entry.intersectionRatio < 1),
      { threshold: [1] }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const onSelectedChange = useCallback((selected: string) => {
    const currentSelected = searchParams.get(TAG_FILTER);
    const newSearchParams = new URLSearchParams(searchParams);

    if (currentSelected === selected) {
      newSearchParams.delete(TAG_FILTER);
    } else {
      newSearchParams.set(TAG_FILTER, selected);
    }

    router.push(`${pathname}?${newSearchParams}`);
  }, [pathname, router, searchParams]);

  return (
    <section
      ref={stickyRef}
      className={`tags-wrapper flex bg-color-secondary ${className}`.trim()}
    >
      <ContentHolder className="flex gap-2 tags-container">
        {[
          { TagId: 'isRecommended', Name: locales.reduce((r, l) => ({ ...r, [l]: '🤤' }), {}) } as Tag,
          ...sortBy(tags, 'createdAt'),
        ].map(({ TagId, Name }) => {
          const isActive = searchParams.get('filter') === TagId;
          const textColorClass = isActive ? 'secondary' : 'primary';
          const bgColorClass = isActive ? 'primary' : 'secondary';
          const btnClass = `transition-colors border rounded-full border-black py-2 px-4 bg-color-${bgColorClass} text-color-${textColorClass}`;
          

          return (
            <Button
              key={TagId}
              active={isActive}
              label={Name[currentLocale]}
              onClick={() => onSelectedChange(TagId)}
              className={btnClass}
            />
          )
        })}
      </ContentHolder>
    </section>
  );
}
