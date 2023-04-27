import { ItemText } from '@/components/item-pieces'
import { getSubCommentCount, timeAgo } from '@/lib/utils'
import { CommentItem } from '@/types/item'
import Link from 'next/link'
import { useState } from 'react'

interface CommentProps {
  comment: CommentItem
  depth: number
  root: number
  prev?: number
  next?: number
}

const Nav = ({ label, id }: { label: string; id: number }) => (
  <>
    <span className='whitespace-pre'> | </span>
    <a href={`#${id}`} className='hover:underline'>
      {label}
    </a>
  </>
)

export default function Comment({
  comment,
  depth,
  root,
  prev,
  next,
}: CommentProps) {
  const [toggled, setToggled] = useState(false)
  const { id, by, time, text, parent, comments } = comment

  return (
    <div className='my-4' id={String(id)}>
      <div className='text-[8pt]'>
        <Link href={`/user?id=${by}`} className='hover:underline'>
          {by}
        </Link>{' '}
        <Link href={`/item?id=${id}`} className='hover:underline'>
          {timeAgo(time)} ago
        </Link>
        {depth >= 2 && <Nav label='root' id={root} />}
        {depth !== 0 && <Nav label='parent' id={parent} />}
        {prev && <Nav label='prev' id={prev} />}
        {next && <Nav label='next' id={next} />}{' '}
        <span
          onClick={() => setToggled(!toggled)}
          className='cursor-pointer hover:underline'
        >
          {toggled ? `[${getSubCommentCount(comments) + 1} more]` : '[-]'}
        </span>
      </div>

      {toggled ? null : (
        <>
          <ItemText text={text} className='text-[9pt] sm:text-[10pt]' />
          <div className='pl-10'>
            {comments.map((c, i) => (
              <Comment
                key={c.id}
                comment={c}
                depth={depth + 1}
                root={root}
                prev={comments[i - 1]?.id}
                next={comments[i + 1]?.id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
