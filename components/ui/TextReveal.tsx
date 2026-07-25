type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
};

export default function TextReveal({
  text,
  className = "",
  delay = 0,
  as = "h2",
}: TextRevealProps) {
  const words = text.split(" ");
  const Tag = as;

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <span
            className="text-reveal-word inline-block"
            style={{ animationDelay: `${delay + i * 0.05}s` }}
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
    </Tag>
  );
}
