const GenreBadge = ({ genre = "Unknown" }) => {
  return (
    <div className='w-fit h-8 mr-1 mb-1 px-2 flex items-center justify-center rounded-full duration-150 bg-yellow-500 hover:bg-yellow-600 hover: cursor-default'>
      <span className='text-white text-xs tracking-wide'>{genre}</span>
    </div>
  )
}

export default GenreBadge