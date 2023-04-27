import Comment from '@/components/comment'
import {
  CommentSub,
  ItemText,
  StoryOrJobHead,
  StoryOrJobSub,
} from '@/components/item-pieces'
import Layout from '@/components/layout'
import NotFound from '@/components/not-found'
import { fetchItem } from '@/lib/api'
import { useCommentTree } from '@/lib/hooks'
import { Item } from '@/types/item'
import cheerio from 'cheerio'
import { GetServerSideProps } from 'next'

interface ItemPageProps {
  item: Item | null
}

export const getServerSideProps: GetServerSideProps<ItemPageProps> = async ({
  query,
}) => {
  const id = query.id ? Number(query.id) : null

  if (!id) {
    return {
      notFound: true,
    }
  }

  const item = await fetchItem(id)

  return {
    props: {
      item,
    },
  }
}

export default function ItemPage({ item }: ItemPageProps) {
  const commentTree = useCommentTree(item)

  if (!item) {
    return <NotFound>No such item.</NotFound>
  }

  // TODO: Optimize initial JS load caused by cheerio library usage
  const title =
    item.type === 'comment' ? cheerio.load(item.text).text() : item.title

  return (
    <Layout title={title} className='px-4'>
      <div className='mb-12'>
        {item.type === 'story' || item.type === 'job' ? (
          <>
            <StoryOrJobHead {...item} />
            <StoryOrJobSub {...item} />
            <ItemText text={item.text} className='my-2' />
          </>
        ) : (
          <>
            <CommentSub comment={item} />
            <ItemText
              text={item.text}
              className='my-2 text-[9pt] sm:text-[10pt]'
            />
          </>
        )}
      </div>

      {(item.type === 'story' || item.type === 'comment') && item.kids && (
        <div className='my-8'>
          <hr className='my-8 w-2/5 border-t border-dashed border-[#ff6600]' />

          {commentTree.length === 0 ? (
            <div className='text-[9pt] sm:text-[10pt]'>Loading...</div>
          ) : (
            commentTree.map((comment, i) => (
              <Comment
                key={comment.id}
                comment={comment}
                depth={0}
                root={comment.id}
                prev={commentTree[i - 1]?.id}
                next={commentTree[i + 1]?.id}
              />
            ))
          )}
        </div>
      )}
    </Layout>
  )
}
