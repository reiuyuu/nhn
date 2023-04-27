import Layout from '@/components/layout'

export default function NotFound({ children }: { children: React.ReactNode }) {
  return (
    <Layout title='404' className='mb-12 px-4'>
      {children}
    </Layout>
  )
}
