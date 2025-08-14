import React from 'react'
import {FaHeart} from 'react-icons/fa6'
import {GrMapLocation} from 'react-icons/gr'
import moment from 'moment'
import { useEffect } from 'react'

const TravelStoryCard = ({
    imgUrl,
    title,
    date,
    story,
    visitedLocation,
    isFavorite,
    onFavoriteClick,
    onClick
}) => {

   
  return (
    <div className='border rounded-lg overflow-hidden bg-white hover:shadow-lg
    hover:shadow-slate-200 transition-all ease-in-out relative cursor-pointer'>
        <img
        src={imgUrl}
        alt={title}
        className='w-full h-56 object-cover rounded-lg '
        onClick={onClick}
        />

        <button className='w-12 h-12 flex items-center justify-center bg-white/40 rounded-lg border border-white/30 absolute top-4 right-4 '
        onClick={onFavoriteClick}
        >  

        <FaHeart
        className={`icon-btn ${isFavorite ? 'text-red-500' :'text-white'}`}
        />


        </button>
        <div className='p-4' onClick={onClick}>
           <div className='flex items-center gap-2 text-sm text-slate-500 mb-2'>
            <div className='flex items-center gap-1'>
                <h6 className='text-sm font-medium'>{title}</h6>
                <span className='text-xs text-slate-500'>
                    {date ? moment(date).format('DD MMM, YYYY') : 'N/A'}
                    </span>
            </div>

           </div>
           <p className='text-sm text-slate-700 mb-2'>
            {story.length > 100 ? `${story.substring(0, 60)}...` : story}
           </p>
           <div className='inline-flex items-center gap-2 text-[13px] text-cyan-600 bg-cyan-200/40 rounded mt-3 px-2 py-3'>
            <GrMapLocation className='text-sm text-slate-700' />
            {visitedLocation.map((item,index) =>visitedLocation.length==index+1 ? `${item}` : `${item}, `)}
           </div>
      

           </div>
        </div>
    
  )
}

export default TravelStoryCard