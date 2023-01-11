import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { HiTicket } from 'react-icons/hi'

import { DatePicker, SeatMap } from '@/components'
import { setResetState } from '@/store/orderSlice'
import { MovieApi } from '@/apis'

import { MovieSection, TicketDetailSection, CinemasSection } from './components'

const DetailMovie = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const {
    data: { data: movie }
  } = useQuery({
    queryKey: `movie-${id}`,
    queryFn: async () => MovieApi.detail(id)
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(setResetState())
  }, [])

  return (
    <div className='w-full h-auto'>
      <MovieSection movie={movie} />

      <div className='mt-9  mb-4 flex flex-row justify-start items-start text-white text-2xl lg:text-3xl font-bold'>
        <HiTicket className='text-primary-500 text-2xl lg:text-5xl mt-1 lg:mt-0 mr-2 ' />
        Grab your tickets now!
      </div>

      {/* Book Section */}
      <div className='w-full flex flex-wrap-reverse mt-9 md:mb-6'>
        <TicketDetailSection movie={movie} />

        <div className='w-full lg:w-8/12'>
          <DatePicker />
          <CinemasSection />

          <div className='w-full mt-6'>
            <SeatMap />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailMovie
