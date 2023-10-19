"use client";

import type { MDXComponents } from "mdx/types";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Link from "next/link";

import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";

import { allPosts } from "@/.contentlayer/generated";

const mdxComponents: MDXComponents = {
  a: ({ href, children }) => <Link href={href as string}>{children}</Link>,
  img: ({ src, alt }) => (
    <Link
      className="relative block h-80 w-full overflow-hidden"
      href={src as string}
      target="_blank"
    >
      <Image
        src={`${src}@.webp` as string}
        alt={alt || ""}
        layout="fill"
        className="object-cover object-center"
      />
    </Link>
  ),
};

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = allPosts.find((post) => post._raw.flattenedPath === id);

  if (!post) {
    return <div>Not found</div>;
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <main className="min-h-screen max-w-4xl rounded-sm bg-white pt-16 shadow sm:mx-16 sm:mt-20 sm:min-h-0 sm:pt-0 lg:mx-auto">
      <Banner />
      <Navbar />
      <div className="px-6">
        <MDXContent components={mdxComponents} />
      </div>
    </main>
  );
}
