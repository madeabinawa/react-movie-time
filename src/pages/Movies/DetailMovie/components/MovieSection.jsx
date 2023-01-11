import { useNavigate } from 'react-router-dom'
import { HiArrowSmLeft } from 'react-icons/hi'
import { GenreBadge, Rating } from '@/components'

export const MovieSection = ({ movie }) => {
  const navigate = useNavigate()
  const imgBaseUrl = import.meta.env.VITE_TMDB_IMG_BASE_URL
  const imgURI = imgBaseUrl + 'original' + movie.backdrop_path
  const releaseDate = movie?.release_date?.split('-')[0]

  return (
    <div className='h-2/3 flex flex-row'>
      <div className='w-full lg:w-4/12 h-full'>
        <div
          className='bg-primary-500 w-fit rounded-full p-1 hover:bg-primary-600 hover:cursor-pointer'
          onClick={() => navigate(-1)}
        >
          <HiArrowSmLeft className='text-white text-xl p-0 m-0' />
        </div>
        <p className='text-white text-xs font-semibold mt-5'>
          {movie?.status ?? 'Coming Soon'}
        </p>
        <h1 className='text-white text-4xl font-bold mb-1'>{movie.title}</h1>
        <h6 className='text-white text-xl font-normal mb-3'>{releaseDate}</h6>

        {/* Genres Badges */}
        <div className='flex flex-wrap mb-3'>
          {movie?.genres?.length > 0 &&
            movie?.genres?.map((genre, index) => (
              <GenreBadge key={index} genre={genre?.name} />
            ))}
        </div>

        <div
          style={{ backgroundImage: `url(${imgURI})` }}
          className={` lg:hidden lg:poster lg:w-auto h-60 shadow-inner bg-gradient-to-r from-gray-700 to-gray-400 bg-top bg-cover grow rounded-r-lg`}
        />

        {/* Movie Overview */}
        <p className='mt-2 text-white text-base text-justify mb-3 pr-3'>
          {movie?.overview}
        </p>
        <Rating rating={movie?.vote_average} />
      </div>

      {/* Movie Poster */}
      <div
        style={{ backgroundImage: `url(${imgURI})` }}
        className={` hidden lg:block lg:poster lg:relative  lg:w-6/12 h- shadow-inner bg-gradient-to-r from-gray-700 to-gray-400 bg-center bg-cover grow rounded-r-lg`}
      />
    </div>
  )
}
