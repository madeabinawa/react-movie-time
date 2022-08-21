import { useNavigate } from 'react-router-dom'
import { ActionButton } from "@/components"

const MovieCard = ({ movie }) => {
  const navigate = useNavigate()
  const imgBaseUrl = import.meta.env.VITE_TMDB_IMG_BASE_URL
  const imgURI = imgBaseUrl + "w780" + movie.backdrop_path
  const movieElipsis = movie?.overview?.length > 100 ? movie.overview.substring(0, 100) + "..." : movie.overview

  const onClickDetailMovie = () => navigate(`/movies/detail/${movie.id}`)

  return (
    <div className="w-auto h-64 bg-gray-500 rounded-md group hover:cursor-pointer" onClick={onClickDetailMovie}>
      <div className="relative">
        <div className="group-hover:brightness-50 duration-300">
          <img
            className="object-cover object-center rounded-md w-auto h-64"
            src={imgURI}
          />
        </div>
        <div className="absolute bottom-0 px-2 pt-8 h-64 overflow-hidden bg-black-500 invisible group-hover:visible duration-75">
          <h2 className="text-white">{movie.title}</h2>
          <small className="text-xs text-white block">
            {movie?.release_date?.split("-")[0] ?? "Unknown"}
          </small>
          <p className="text-xs text-white mt-3 mb-10">
            {movieElipsis}
          </p>
          <ActionButton text="Book Now" onClick={onClickDetailMovie} />
        </div>
      </div>
    </div>
  )
}

export default MovieCard
