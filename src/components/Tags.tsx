'use client'

import { useEffect, useRef } from "react";
import Button from "./Button";
import ContentHolder from "./ContentHolder";

import './Tags.css';

interface Props {
  className?: string;
}

export default function Tags({ className }: Props) {
  const stickyRef = useRef(null);

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

  return (
    <section
      ref={stickyRef}
      className={`tags-wrapper flex bg-color-secondary ${className}`.trim()}
    >
      <ContentHolder className="flex gap-2 tags-container">
        <Button label="🤤"/>
        <Button label="food" />
        <Button label="coffee" />
        <Button label="tea" />
        <Button label="cacao" />
        <Button label="other" />
      </ContentHolder>
    </section>
  );
}
