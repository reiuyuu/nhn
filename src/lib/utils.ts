import { CommentItem } from '@/types/item'
import ms from 'ms'

export const pluralize = (
  count: number,
  singular: string,
  plural: string,
): string => `${count} ${count === 1 ? singular : plural}`

export const timeAgo = (time: number): string =>
  ms(Date.now() - time * 1000, { long: true })

export const getSubCommentCount = (comments: CommentItem[]): number =>
  comments.reduce(
    (count: number, comment: CommentItem) =>
      count + getSubCommentCount(comment.comments) + 1,
    0,
  )
