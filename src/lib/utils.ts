import { CommentItem } from '@/types/item'
import ms from 'ms'

// Generates a string with the appropriate singular or plural form of a word
export const pluralize = (
  count: number,
  singular: string,
  plural: string,
): string => `${count} ${count === 1 ? singular : plural}`

// Takes in a Unix timestamp in seconds and returns a string indicating how long ago the timestamp was
export const timeAgo = (time: number): string =>
  ms(Date.now() - time * 1000, { long: true })

export const getTextFromHTML = (html: string) => {
  const parser = new DOMParser()
  const parsedHTML = parser.parseFromString(html, 'text/html')
  return parsedHTML.body.textContent || ''
}

// Recursively counts the number of top-level comments and their nested sub-comments
export const getSubCommentCount = (comments: CommentItem[]): number =>
  comments.reduce(
    (count: number, comment: CommentItem) =>
      count + getSubCommentCount(comment.comments) + 1,
    0,
  )
