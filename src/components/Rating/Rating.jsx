import React from 'react'
import _ from 'lodash'
import { BiStar } from 'react-icons/bi'

const Rating = ({ rating }) => {
  const roundRating = Math.round(parseFloat(rating ?? 0) / 2)
  const generateRating = _.range(1, roundRating + 1)

  return (
    <div className='flex flex-row justify-start items-center'>
      {generateRating?.map((e, index) => <BiStar key={index} className='text-yellow-500' />)}
      <div className='text-white ml-2 text-sm font-medium'>{`${rating} / 10`}</div>
    </div>
  )
}

export default Rating