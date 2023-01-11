import { Suspense, cloneElement } from 'react'
import { CollapsibleSidebar, Sidebar, Navbar, Loading } from '@/components'

const Layout = ({ children }) => {
  return (
    <div className='flex w-full h-screen overflow-y-hidden'>
      {/* <Sidebar /> */}
      <CollapsibleSidebar>
        <Sidebar />
      </CollapsibleSidebar>

      <div className='w-full bg-dark'>
        <Navbar />

        {/* Child Element */}
        <div className='w-auto h-[90%] lg:p-5 md:p-3 sm:p-1 pr-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-600 scrollbar-track-violet-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
          <Suspense fallback={<Loading />}>{cloneElement(children)}</Suspense>
        </div>
      </div>
    </div>
  )
}

export default Layout
