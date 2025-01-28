import { IComment } from "../store/slices/blogSlice";

export const calculateTotalCommentsAndReplies = (comments : IComment[]) => {
  let totalCount = 0;

  comments.forEach((comment) => {
    totalCount += 1;
    totalCount += comment.replies ? comment.replies.length : 0;
  });

  return totalCount;
};