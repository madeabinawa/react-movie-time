import { CinemaCard } from '@/components'
import { cinemas } from '@/assets/constants/cinemas'

export const CinemasSection = () => {
  return (
    <div className='w-full mt-6 py-4 flex flex-nowrap overflow-x-scroll scrollbar-thin scrollbar-thumb-primary-600 scrollbar-track-violet-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'>
      {cinemas?.map((cinema, index) => (
        <CinemaCard key={index} cinema={cinema} />
      ))}
    </div>
  )
}
