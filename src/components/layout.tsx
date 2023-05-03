import Footer from '@/components/footer'
import Header from '@/components/header'
import Head from 'next/head'

interface LayoutProps {
  title: string
  className?: string
  children: React.ReactNode
}

export default function Layout({
  title,
  className = '',
  children,
}: LayoutProps) {
  const trimTitle = title.length > 80 ? title.slice(0, 80) + '...' : title
  const fullTitle =
    title === 'News' ? 'Hacker News' : `${trimTitle} | Hacker News`

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='yet another Hacker News client' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <title>{fullTitle}</title>
      </Head>

      <div className='mx-auto w-[85%] min-w-[796px] bg-[#f6f6ef] text-[10pt] text-[#828282] sm:w-full sm:min-w-0'>
        <Header />
        <main className={`my-2.5 ${className}`}>{children}</main>
        <Footer />
      </div>
    </>
  )
}
