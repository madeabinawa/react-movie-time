import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useSelector, useDispatch } from 'react-redux'
import { HiTicket, HiArrowSmLeft } from "react-icons/hi"
import {
  ActionButton,
  CinemaCard,
  DatePicker,
  GenreBadge,
  Rating,
  SeatMap
} from '@/components'
import { setResetState } from '@/store/orderSlice'
import { cinemas } from '@/assets/constants/cinemas'
import { dateFormat } from '@/utils'
import { MovieApi } from '@/apis'

import './poster.css'

const DetailMovie = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const orderDetail = useSelector((state) => state.order)

  const { data: { data: movie } } = useQuery({
    queryKey: `movie-${id}`,
    queryFn: async () => MovieApi.detail(id)
  })

  const imgBaseUrl = import.meta.env.VITE_TMDB_IMG_BASE_URL
  const imgURI = imgBaseUrl + "original" + movie.backdrop_path
  const posterURI = imgBaseUrl + "w500" + movie.poster_path
  const releaseDate = movie?.release_date?.split("-")[0]

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(setResetState())
  }, [])

  return (
    <div className='w-full h-auto'>
      {/* Movie Section */}
      <div className='h-2/3 flex flex-row'>
        <div className='w-full lg:w-4/12 h-full'>
          <div className='bg-primary-500 w-fit rounded-full p-1 hover:bg-primary-600 hover:cursor-pointer' onClick={() => navigate(-1)}><HiArrowSmLeft className='text-white text-xl p-0 m-0' /></div>
          <p className='text-white text-xs font-semibold mt-5'>{movie?.status ?? "Coming Soon"}</p>
          <h1 className='text-white text-4xl font-bold mb-1'>{movie.title}</h1>
          <h6 className='text-white text-xl font-normal mb-3'>{releaseDate}</h6>

          {/* Genres Badges */}
          <div className='flex flex-wrap mb-3'>
            {movie?.genres?.length > 0 && movie?.genres?.map((genre, index) => (
              <GenreBadge key={index} genre={genre?.name} />
            ))}
          </div>

          <div
            style={{ backgroundImage: `url(${imgURI})` }}
            className={` lg:hidden lg:poster lg:w-auto h-60 shadow-inner bg-gradient-to-r from-gray-700 to-gray-400 bg-top bg-cover grow rounded-r-lg`} />

          {/* Movie Overview */}
          <p className='mt-2 text-white text-base text-justify mb-3 pr-3'> {movie?.overview} </p>
          <Rating rating={movie?.vote_average} />
        </div>

        {/* Movie Poster */}
        <div
          style={{ backgroundImage: `url(${imgURI})` }}
          className={` hidden lg:block lg:poster lg:relative  lg:w-6/12 h- shadow-inner bg-gradient-to-r from-gray-700 to-gray-400 bg-center bg-cover grow rounded-r-lg`} />

      </div>

      <div className='mt-9  mb-4 flex flex-row justify-start items-start text-white text-2xl lg:text-3xl font-bold'>
        <HiTicket className='text-primary-500 text-2xl lg:text-5xl mt-1 lg:mt-0 mr-2 ' />
        Grab your tickets now!
      </div>

      {/* Book Section */}
      <div className='w-full flex flex-wrap-reverse mt-9 md:mb-6'>
        {/* Ticket Detail Section */}
        <div className='w-full md:w-full lg:w-4/12'>
          <div className='h-auto flex flex-col md:flex-row lg:flex-col rounded-lg lg:mr-9'>
            <div className='relative w-full mt-6 lg:mt-0 rounded-t-lg'>
              {/* <div className='absolute w-3 h-4 rounded-r-full bg-dark bottom-8 -left-1' />
              <div className='absolute w-3 h-4 rounded-l-full bg-dark bottom-8 -right-1' /> */}
              <div className='flex bg-yellow-500 rounded-t-lg px-3'>
                <img loading='lazy' src={posterURI} alt={movie.title} className='w-1/4 h-1/4 object-cover object-top rounded-lg my-3 mr-2' />
                <div className='flex flex-col justify-start items-start py-3'>
                  <div className='text-white text-sm font-bold uppercase mb-1 overflow-ellipsis'>{movie.title}</div>
                  <div className='text-white text-xs font-normal mb-1'>{orderDetail?.selectedCinema?.address ?? ''}</div>
                  <div className='text-white text-xs font-semibold mb-1'>{`${orderDetail.selectedDate ? dateFormat(orderDetail?.selectedDate).full : ''} ${orderDetail.selectedTime ?? ''} `}</div>
                </div>
              </div>

              {/* Order summary card section*/}
              <div className='w-full bg-primary-500 rounded-b-lg p-3'>
                <div className='w-full flex flex-row justify-start'>
                  <div className='w-3/12 text-white text-sm font-light mb-1'>{`${orderDetail?.selectedSeat?.length} x tickets`}</div>
                  <div className='w-9/12 text-white text-sm font-light uppercase mb-1'>
                    {orderDetail?.selectedSeat?.map((seat, index) => {
                      const row = String.fromCharCode(seat.split('-')[0])
                      const number = seat.split('-')[1]
                      return `${row}${number}${index === orderDetail?.selectedSeat?.length - 1 ? '' : ', '}`
                    })}
                  </div>
                </div>

                {orderDetail?.selectedSeat?.length > 0 && (
                  <div className='w-full flex flex-row justify-center py-2'>
                    <div className='text-white text-sm font-light'>Subtotal</div>
                    <div className='w-full text-white text-lg text-right font-medium'>Rp300.000</div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Confirm Button */}
            <ActionButton outerClassName="w-full h-10 mt-5 mb-4 md:mx-3 md:mt-20 lg:mt-5 lg:mx-0" innerClassName="text-base uppercase tracking-wider" text="Create My Orders" />
          </div>
        </div>

        {/* User Booking Selection Section*/}
        <div className='w-full lg:w-8/12'>
          {/* Date Selection */}
          <DatePicker />
          {/* Cinema Selection */}
          <div className='w-full mt-6 py-4 flex flex-nowrap overflow-x-scroll scrollbar-thin scrollbar-thumb-primary-600 scrollbar-track-violet-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
            {cinemas?.map((cinema, index) => <CinemaCard key={index} cinema={cinema} />)}
          </div>
          {/* Seat Number Selection  */}
          <div className='w-full mt-6'>
            <SeatMap />
          </div>
        </div>
      </div>
    </div >
  )
}

export default DetailMovie