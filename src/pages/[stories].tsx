import { StoryOrJobHead, StoryOrJobSub } from '@/components/item-pieces'
import Layout from '@/components/layout'
import NotFound from '@/components/not-found'
import { fetchStories } from '@/lib/api'
import { JobItem, StoryItem } from '@/types/item'
import { StoriesEP, StoriesEPKey } from '@/types/stories'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

type StoriesPageProps = {
  ep: StoriesEPKey
  page: number
  stories: StoryItem[] | JobItem[]
}

const storiesEPs: Record<StoriesEPKey, StoriesEP> = {
  news: 'topstories',
  newest: 'newstories',
  ask: 'askstories',
  show: 'showstories',
  jobs: 'jobstories',
  best: 'beststories',
}

export const getServerSideProps: GetServerSideProps<StoriesPageProps> = async ({
  query,
  params,
}) => {
  const storiesEPKey = params?.stories as StoriesEPKey

  if (!Object.keys(storiesEPs).includes(storiesEPKey)) {
    return {
      notFound: true,
    }
  }

  const page = query.p ? Number(query.p) : 1
  const storiesEP = storiesEPs[storiesEPKey]
  const stories = await fetchStories(storiesEP, page)

  return {
    props: {
      ep: storiesEPKey,
      page,
      stories,
    },
  }
}

export default function StoriesPage({ ep, page, stories }: StoriesPageProps) {
  const { asPath } = useRouter()

  if (stories.length === 0) {
    return <NotFound>No story found.</NotFound>
  }

  const title = ep.charAt(0).toLocaleUpperCase() + ep.slice(1)
  const offset = (page - 1) * 30
  const nextPageUrl = `${asPath.split('?')[0]}?p=${page + 1}`

  return (
    <Layout title={title} className={ep === 'jobs' ? 'pl-4' : 'pl-8'}>
      <ol
        start={offset + 1}
        className={`sm:text-[11pt] ${
          ep === 'jobs' ? 'list-none' : 'list-outside list-decimal'
        }`}
      >
        {stories.map((story) => (
          <li key={story.id} className='pb-1'>
            <StoryOrJobHead {...story} />
            <StoryOrJobSub {...story} />
          </li>
        ))}
      </ol>

      <Link href={nextPageUrl} className='mt-2.5 inline-block'>
        More
      </Link>
    </Layout>
  )
}
