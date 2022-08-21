import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BiSearch, BiX } from "react-icons/bi"
import { useDispatch } from 'react-redux'
import { useQuery } from 'react-query'

import { MovieApi } from '@/apis'
import { useDebounce } from '@/hooks'
import { Loading, Rating } from '@/components'
import { setSearchResults } from '@/store/searchMovieSlice'

const Searchbar = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const posterURI = "https://image.tmdb.org/t/p/w500/"

  const [search, setSearch] = useState({ isFocus: false, key: '' })
  const handleFocus = () => setSearch(prev => ({ ...prev, isFocus: true }))
  const handleBlur = () => setTimeout(() => setSearch(prev => ({ ...prev, isFocus: false })), 200)
  const handleChange = (e) => setSearch(prev => ({ ...prev, key: e.target.value }))
  const handleClearInput = () => setSearch(prev => ({ ...prev, key: '' }))
  const handleShowAll = () => navigate(`/movies/search`)

  const debounceSearch = useDebounce(search.key, 500)
  const searchQuery = useQuery({
    queryKey: ['search', debounceSearch],
    queryFn: () => MovieApi.search({
      language: 'en-US',
      query: debounceSearch,
      page: "1",
      include_adult: "false",
    }),
    suspense: false,
    enabled: search?.isFocus && !!debounceSearch,
    onSuccess: (data) => {
      const { results = [] } = data?.data ?? {}
      dispatch(setSearchResults({ key: debounceSearch, results }))
    }
  })

  const { results: searchResults } = searchQuery?.data?.data ?? { results: [] }

  const SearchResultTile = ({ movie }) => {
    const releaseDate = movie?.release_date?.split("-")[0]
    return (
      <div
        onClick={() => navigate(`/movies/detail/${movie?.id}`)}
        className="flex px-2 py-2 justify-start items-center hover:bg-primary-500 hover:cursor-pointer">
        <img loading='lazy' src={posterURI + movie.poster_path} alt={movie.title} className='w-[15%] h-[15%] object-cover object-top rounded-lg mr-2' />
        <div className='flex flex-col'>
          <h6 className='text-white text-sm font-normal mb-1'>{releaseDate}</h6>
          <div className='text-white w-full text-sm font-bold uppercase mb-1 truncate overflow-ellipsis'>{movie.title ?? ""}</div>
          <Rating rating={movie?.vote_average} />
        </div>
      </div>
    )
  }

  return (
    <div className="p-1 w-full md:max-w-md">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
          <BiSearch />
        </div>

        <input
          type="text"
          value={search.key ?? ''}
          className="w-full rounded-2xl pl-8 pr-4 py-2 text-sm font-light bg-gray-800 text-gray-400 placeholder-gray-500 focus:border-transparent outline-none"
          placeholder="Search by name ..."
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />

        {search?.key.length > 0 && (
          <div
            onClick={handleClearInput}
            className="w-6 h-6 absolute top-[5px] right-0 flex justify-center items-center  mr-2 text-gray-500 rounded-full hover:cursor-pointer hover:bg-dark">
            <BiX />
          </div>
        )}

        {/* Searching results */}
        {search.isFocus && Boolean(search?.key) && !pathname.includes('search') && (
          <div className="absolute w-64 sm:w-full h-auto max-h-56 z-10 top-10 bg-gray-800 rounded-lg overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-primary-600 scrollbar-track-violet-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {/* Search Results Row */}
            {searchResults?.slice(0, 4)?.map(movie => (<SearchResultTile movie={movie} />))}

            {/* Show all results */}
            {searchResults?.length > 4 && (
              <div className="w-full text-right px-3 mb-1">
                <button onClick={() => handleShowAll()} className="text-xs hover:text-primary-500 text-white font-light tracking-wide">Show all results</button>
              </div>
            )}

            {/* Loading */}
            {searchQuery.isFetching && (<Loading className='w-64 sm:w-full h-56' />)}

            {/* if no data */}
            {searchQuery.isSuccess || searchQuery.isError && (
              <h1 className='py-4 px-4 text-xs text-white font-light tracking-wide'>
                {searchQuery?.isSuccess && searchResults?.length < 1
                  ? "No results found"
                  : searchQuery?.isError && "Something went wrong"
                }</h1>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Searchbar