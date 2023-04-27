import Layout from '@/components/layout'
import NotFound from '@/components/not-found'
import { fetchUser } from '@/lib/api'
import { timeAgo } from '@/lib/utils'
import { User } from '@/types/user'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

interface UserPageProps {
  user: User | null
}

export const getServerSideProps: GetServerSideProps<UserPageProps> = async ({
  query,
}) => {
  const id = query.id ? String(query.id) : null

  if (!id) {
    return {
      notFound: true,
    }
  }

  const user = await fetchUser(id)

  return {
    props: {
      user,
    },
  }
}

export default function UserPage({ user }: UserPageProps) {
  if (!user) {
    return <NotFound>No such user.</NotFound>
  }

  const { id, created, karma, about } = user
  const title = `Profile: ${id}`

  return (
    <Layout title={title} className='px-1'>
      <div className='mb-12 flex gap-x-1'>
        <div className='flex flex-col'>
          <span>user:</span>
          <span>created:</span>
          <span>karma:</span>
          <span>about:</span>
        </div>
        <div className='flex flex-col'>
          <Link href={`/user?id=${id}`}>{id}</Link>
          <span>{timeAgo(created)} ago</span>
          <span>{karma}</span>
          {about && <span dangerouslySetInnerHTML={{ __html: about }} />}
        </div>
      </div>
    </Layout>
  )
}
