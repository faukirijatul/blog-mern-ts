import { Blog } from "../types";

export const countComments = (comments: Blog["comments"]) => {
    return comments.reduce(
      (count, comment) =>
        count + 1 + (comment.replies ? comment.replies.length : 0),
      0
    );
  };