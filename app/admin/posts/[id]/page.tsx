import { notFound } from "next/navigation";
import { PostEditor } from "@/components/admin/PostEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const [post, topics] = await Promise.all([
    prisma.article.findUnique({ where: { id } }),
    prisma.topic.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-navy">Edit post</h1>
      <PostEditor post={post} topics={topics} />
    </div>
  );
}
