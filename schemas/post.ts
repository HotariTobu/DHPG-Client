export default interface Post {
  postId: number,
  userId: number,
  title: string,
  description: string,
  content: string,
  createdAt: Date,
  updatedAt: Date,
}
