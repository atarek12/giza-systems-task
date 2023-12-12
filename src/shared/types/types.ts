export type TPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type TComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
