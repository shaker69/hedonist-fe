'use client'

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

import { usePathname, useRouter } from "@app/navigation";
import Button from "../Button";
import ContentHolder from "../ContentHolder";

import './Tags.css';

interface Props {
  className?: string;
}

/* TODO: keep on DB */
const tagsMock = [
  { id: '0', name: '🤤' },
  { id: '1', name: 'food' },
  { id: '2', name: 'coffee' },
  { id: '3', name: 'tea' },
  { id: '4', name: 'cacao' },
  { id: '5', name: 'promo' },
];

export default function Tags({ className }: Props) {
  const stickyRef = useRef(null);

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
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('filter', selected);
    router.push(`${pathname}?${newSearchParams}`);
  }, [pathname, router, searchParams]);

  return (
    <section
      ref={stickyRef}
      className={`tags-wrapper flex bg-color-secondary ${className}`.trim()}
    >
      <ContentHolder className="flex gap-2 tags-container">
        {tagsMock.map(({ id, name }) => {
          const isActive = searchParams.get('filter') === id;
          const textColorClass = isActive ? 'secondary' : 'primary';
          const bgColorClass = isActive ? 'primary' : 'secondary';
          const btnClass = `transition-colors border rounded-full border-black py-2 px-4 bg-color-${bgColorClass} text-color-${textColorClass}`;

          return (
          <Button
            key={id}
            active={isActive}
            label={name}
            onClick={() => onSelectedChange(id)}
            className={btnClass}
          />
        )})}
      </ContentHolder>
    </section>
  );
}
