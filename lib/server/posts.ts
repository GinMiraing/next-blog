import { allPosts } from "contentlayer/generated";

export const getPosts = ({
  limit = 10,
  page = 1,
  category,
}: {
  limit?: number;
  page?: number;
  category?: string;
}) => {
  const sortedPosts = allPosts.sort((a, b) => {
    return b.id - a.id;
  });

  if (category) {
    return {
      posts: sortedPosts
        .filter((post) => post.category === category)
        .slice((page - 1) * limit, page * limit),
      total: sortedPosts.filter((post) => post.category === category).length,
    };
  }

  return {
    posts: sortedPosts.slice((page - 1) * limit, page * limit),
    total: sortedPosts.length,
  };
};

export const getPostById = (id: number) => {
  return allPosts.find((post) => post.id === id);
};
