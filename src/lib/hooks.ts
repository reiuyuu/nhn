import { fetchCommentContext, fetchCommentTree } from '@/lib/api'
import { CommentItem, Item } from '@/types/item'
import { useEffect, useState } from 'react'

// A hook that returns a comment tree for a given item.
export const useCommentTree = (item: Item | null): CommentItem[] => {
  const [commentTree, setCommentTree] = useState<CommentItem[]>([])

  useEffect(() => {
    if ((item?.type === 'story' || item?.type === 'comment') && item?.kids) {
      fetchCommentTree(item.kids).then((commentTree) =>
        setCommentTree(commentTree),
      )
    }
  }, [item])

  return commentTree
}

// A hook that returns the context information for a given comment.
export const useCommentContext = (comment: CommentItem): [number, string] => {
  const [context, setContext] = useState<[number, string]>([0, ''])

  useEffect(() => {
    fetchCommentContext(comment).then(({ contextId, contextTitle }) => {
      setContext([contextId, contextTitle])
    })
  }, [comment])

  return context
}
