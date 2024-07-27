import ContentHolder from "./ContentHolder";

interface Props {
  className?: string;
}

export default function Tags({ className }: Props) {
  return (
    <section className={`flex bg-red-500 ${className}`.trim()}>
      <ContentHolder>
        Hi
      </ContentHolder>
    </section>
  );
}
