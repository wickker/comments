import { Comment } from "@/types"

export const search = (comments: Comment[], searchPhrase: string): Comment[] => {
    if (comments.length === 0) return []
  
    const filtered: Comment[] = []
  
    for (const comment of comments) {
      if (comment.comment.includes(searchPhrase)) {
        filtered.push(comment)
        continue
      }
      const filteredReplies = search(comment.replies, searchPhrase)
      if (filteredReplies.length > 0) {
        filtered.push({ ...comment, replies: filteredReplies })
      }
    }
  
    return filtered
  }
  