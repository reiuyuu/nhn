import { useCommentContext } from '@/lib/hooks'
import { pluralize, timeAgo } from '@/lib/utils'
import { CommentItem, JobItem, StoryItem } from '@/types/item'
import Link from 'next/link'

export const StoryOrJobHead = ({ id, url, title }: StoryItem | JobItem) => (
  <div className='leading-snug'>
    {url ? (
      <a href={url} className='text-black visited:text-[#828282]'>
        {title}
      </a>
    ) : (
      <Link
        href={`/item?id=${id}`}
        className='text-black visited:text-[#828282]'
      >
        {title}
      </Link>
    )}{' '}
    {url && (
      <a href={url} className='text-[8pt] hover:underline'>
        {`(${new URL(url).hostname.replace(/^www\./, '')})`}
      </a>
    )}
  </div>
)

export const StoryOrJobSub = ({
  id,
  type,
  by,
  time,
  score,
  descendants,
}: StoryItem | (JobItem & { descendants?: never })) => (
  <div className='pt-1 text-[7pt] leading-tight sm:text-[9pt]'>
    {type === 'story' && pluralize(score, 'point', 'points')}
    <span className='whitespace-pre'> by </span>
    <Link href={`/user?id=${by}`} className='hover:underline'>
      {by}
    </Link>{' '}
    <Link href={`/item?id=${id}`} className='hover:underline'>
      {timeAgo(time)} ago
    </Link>
    {type === 'story' && (
      <>
        <span className='whitespace-pre'> | </span>
        <Link href={`/item?id=${id}`} className='hover:underline'>
          {descendants === 0
            ? 'discuss'
            : pluralize(descendants, 'comment', 'comments')}
        </Link>
      </>
    )}
  </div>
)

export const CommentSub = ({ comment }: { comment: CommentItem }) => {
  const [contextId, contextTitle] = useCommentContext(comment)
  const { id, by, time, parent } = comment

  if (!contextId || !contextTitle) {
    return <div className='text-[8pt] leading-tight'>Loading...</div>
  }

  return (
    <div className='text-[8pt] leading-tight'>
      <Link href={`/user?id=${by}`} className='hover:underline'>
        {by}
      </Link>{' '}
      <Link href={`/item?id=${id}`} className='hover:underline'>
        {timeAgo(time)} ago
      </Link>
      <span className='whitespace-pre'> | </span>
      <Link href={`/item?id=${parent}`} className='hover:underline'>
        parent
      </Link>
      <span className='whitespace-pre'> | </span>
      <Link href={`/item?id=${contextId}#${id}`} className='hover:underline'>
        context
      </Link>
      <span className='whitespace-pre'> | on: </span>
      <Link href={`/item?id=${contextId}`} className='hover:underline'>
        {contextTitle.length > 50
          ? contextTitle.slice(0, 50) + '...'
          : contextTitle}
      </Link>
    </div>
  )
}

export const ItemText = ({
  text = '',
  className: className = '',
}: {
  text?: string
  className?: string
}) => (
  <div
    className={`max-w-[1215px] text-[10pt] text-black ${className}`}
    dangerouslySetInnerHTML={{ __html: text }}
  />
)
