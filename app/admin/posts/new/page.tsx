import { PostEditor } from "@/components/admin/PostEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const topics = await prisma.topic.findMany({ orderBy: { name: "asc" } });
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-navy">New post</h1>
      <PostEditor topics={topics} />
    </div>
  );
}
