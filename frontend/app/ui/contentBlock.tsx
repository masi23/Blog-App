export default function ContentBlock({
  type,
  text,
  level,
}: {
  type: string;
  text: string;
  level: number;
}) {
  if (type === "heading") {
    switch (level) {
      case 1:
        return <h1 className="mt-8 mb-2">{text}</h1>;
      case 2:
        return <h2 className="mt-5 mb-2">{text}</h2>;
      case 3:
        return <h3 className="mt-5 mb-2">{text}</h3>;
      default:
        return <h1 className="mt-4 mb-2">{text}</h1>;
    }
  }
  if (type === "paragraph") {
    return <p className="mt-1 text-justify">{text}</p>;
  }
}
