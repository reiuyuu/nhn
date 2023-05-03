export default function Footer() {
  return (
    <footer className='flex flex-col items-center gap-y-4 pb-[1em]'>
      <hr className='w-full border-t-2 border-[#ff6600]' />

      <div className='text-[8pt]'>
        Guidelines | FAQ | Lists | API | Security | Legal | Apply to YC |
        Contact
      </div>

      <form
        method='get'
        action='//hn.algolia.com/'
        className='text-center sm:w-full'
      >
        <label htmlFor='search'>Search:</label>{' '}
        <input
          type='text'
          id='search'
          name='q'
          size={17}
          className='rounded-sm border border-[#828282] px-0.5 py-px font-mono leading-tight text-black sm:w-[90%] sm:text-base'
        />
      </form>

      <div>
        yet another Hacker News client &middot;{' '}
        <a href='https://github.com/reiuyuu/nhn/'>github.com/reiuyuu/nhn</a>
      </div>
    </footer>
  )
}
