export type Item = StoryItem | JobItem | CommentItem

export interface StoryItem {
  id: number
  type: 'story'
  by: string
  time: number
  text?: string
  kids?: number[]
  url?: string
  score: number
  title: string
  descendants: number
}

export interface JobItem {
  id: number
  type: 'job'
  by: string
  time: number
  text?: string
  url?: string
  score: number
  title: string
}

export interface CommentItem {
  id: number
  deleted?: boolean
  type: 'comment'
  by: string
  time: number
  text: string
  dead?: boolean
  parent: number
  kids?: number[]
  comments: CommentItem[]
}
