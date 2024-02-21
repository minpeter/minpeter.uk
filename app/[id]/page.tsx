import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import { getPostById, getAllPosts } from "@/lib/loader";

import "@/styles/prism-one-dark.css";
import "@/styles/code-block-custom.css";

import PostContent from "./post";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: any) {
  const post = await getPostById(params.id);

  if (!post) {
    return {
      title: "404",
      description: "Not found :/",
    };
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function Post({ params }: any) {
  const post = await getPostById(params.id);

  return (
    <article>
      {!post ? (
        <>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            404, NOT FOUND :/
          </h2>

          <div className="py-5 flex flex-col gap-4">
            <p>
              This page doesn{"'"}t exist.
              <br />
              How about reading another article?
            </p>
            <Link href="/" className={buttonVariants({ variant: "secondary" })}>
              Go to Home
            </Link>
          </div>
        </>
      ) : (
        <>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            {post.frontmatter.title}
          </h2>
          <div className="py-5">
            <span className="text-gray-400">{post.published}</span>
            <span className="px-2">|</span>
            <span className="text-gray-400">{post.hash}</span>
          </div>

          {post.content && <PostContent code={post.content} />}
        </>
      )}
    </article>
  );
}
