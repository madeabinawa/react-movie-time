import { useSelector } from 'react-redux'
import { dateFormat, idCurrencyFormat } from '@/utils'
import { ActionButton } from '@/components'

export const TicketDetailSection = ({ movie }) => {
  const orderDetail = useSelector((state) => state.order)
  const imgBaseUrl = import.meta.env.VITE_TMDB_IMG_BASE_URL
  const posterURI = imgBaseUrl + 'w500' + movie.poster_path

  return (
    <div className='w-full md:w-full lg:w-4/12'>
      <div className='h-auto flex flex-col md:flex-row lg:flex-col rounded-lg lg:mr-9'>
        <div className='relative w-full mt-6 lg:mt-0 rounded-t-lg'>
          <div className='flex bg-yellow-500 rounded-t-lg px-3'>
            <img
              loading='lazy'
              src={posterURI}
              alt={movie.title}
              className='w-1/4 h-1/4 object-cover object-top rounded-lg my-3 mr-2'
            />
            <div className='flex flex-col justify-start items-start py-3'>
              <div className='text-white text-sm font-bold uppercase mb-1 overflow-ellipsis'>
                {movie.title}
              </div>
              <div className='text-white text-xs font-normal mb-1'>
                {orderDetail?.selectedCinema?.address ?? ''}
              </div>
              <div className='text-white text-xs font-semibold mb-1'>{`${
                orderDetail.selectedDate
                  ? dateFormat(orderDetail?.selectedDate).full
                  : ''
              } ${orderDetail.selectedTime ?? ''} `}</div>
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
                  return `${row}${number}${
                    index === orderDetail?.selectedSeat?.length - 1 ? '' : ', '
                  }`
                })}
              </div>
            </div>

            {orderDetail?.selectedSeat?.length > 0 && (
              <div className='w-full flex flex-row justify-center py-2'>
                <div className='text-white text-sm font-light'>Subtotal</div>
                <div className='w-full text-white text-lg text-right font-medium'>
                  {idCurrencyFormat(300000 * orderDetail.selectedSeat.length)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Confirm Button */}
        <ActionButton
          outerClassName='w-full h-10 mt-5 mb-4 md:mx-3 md:mt-20 lg:mt-5 lg:mx-0'
          innerClassName='text-base uppercase tracking-wider'
          text='Create My Orders'
        />
      </div>
    </div>
  )
}
