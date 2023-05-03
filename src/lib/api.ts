import { CommentItem, Item, JobItem, StoryItem } from '@/types/item'
import { StoriesEP } from '@/types/stories'
import { User } from '@/types/user'
import { initializeApp } from 'firebase/app'
import { get, getDatabase, ref } from 'firebase/database'

const firebaseConfig = {
  databaseURL: 'https://hacker-news.firebaseio.com',
}

const app = initializeApp(firebaseConfig)

const db = getDatabase(app)

// Fetch a single item (story, comment, job, etc.) based on its ID
export const fetchItem = async (id: number): Promise<Item | null> => {
  const itemRef = ref(db, `/v0/item/${id}`)
  const itemSnap = await get(itemRef)

  return itemSnap.exists() ? itemSnap.val() : null
}

// Fetch a single user based on its ID
export const fetchUser = async (id: string): Promise<User | null> => {
  const userRef = ref(db, `/v0/user/${id}`)
  const userSnap = await get(userRef)

  return userSnap.exists() ? userSnap.val() : null
}

// Fetch a list of stories based on the endpoint
export const fetchStories = async (
  storiesEP: StoriesEP,
  page = 1,
  limit = 30,
): Promise<StoryItem[] | JobItem[]> => {
  const start = (page - 1) * limit
  const end = start + limit

  const storiesRef = ref(db, `v0/${storiesEP}`)
  const storiesSnap = await get(storiesRef)

  return storiesSnap.exists()
    ? await Promise.all(
        storiesSnap
          .val()
          .slice(start, end)
          .map(async (id: number) => fetchItem(id)),
      )
    : []
}

// Fetch a comment and all its child comments (in a nested tree structure)
export const fetchCommentTree = async (
  ids: number[],
): Promise<CommentItem[]> => {
  const comments: CommentItem[] = []

  await Promise.all(
    ids.map(async (id, i) => {
      const comment = (await fetchItem(id)) as CommentItem | null

      if (comment && !comment.deleted && !comment.dead) {
        comment.comments = await fetchCommentTree(comment.kids ?? [])
        comments[i] = comment
      }
    }),
  )

  return comments
}

// Fetch the context of a comment (the ID and title of the story it is replying to)
export const fetchCommentContext = async (
  comment: CommentItem,
): Promise<{ contextId: number; contextTitle: string }> => {
  const parentItem = (await fetchItem(comment.parent)) as Item
  if (parentItem.type !== 'comment') {
    return { contextId: parentItem.id, contextTitle: parentItem.title }
  }

  return await fetchCommentContext(parentItem as CommentItem)
}
