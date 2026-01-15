import Image from "next/image";

export default function PostCard({
  thumbnailUrl,
  title,
  description,
  id,
  createdAt,
}: {
  thumbnailUrl: string;
  title: string;
  description: string;
  id: number;
  createdAt: Date;
}) {
  const formattedDate = new Date(createdAt).toLocaleString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="w-full bg-neutral-900 rounded-lg">
      <Image
        alt=""
        width={400}
        height={200}
        src={`${thumbnailUrl}`}
        className="w-full rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="mb-2">{title}</h3>
        <p>Published {formattedDate}</p>
        <p className="my-2">{description}</p>
      </div>
    </div>
  );
}
