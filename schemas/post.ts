export default interface Post {
  postId: number,
  userId: number,
  title: string,
  description: string,
  contents: string[],
  createdAt: Date,
  updatedAt: Date,
}
