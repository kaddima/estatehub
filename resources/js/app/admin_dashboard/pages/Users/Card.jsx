import React from 'react'

const Card = ({icon,name,number,className}) => {
    return   <div className={`${className ? className : 'bg-white text-gray-800'}   rounded-lg p-2 w-full `}>
        <div className='flex justify-between items-center'>
           <div className='space-y-3'>
                <h1 className='text-lg font-bold'>{number}</h1>
                <p className='text-sm'>{name}</p>
           </div>
           <span>
               {icon} 
           </span>
        </div>
   
    </div>
}

export default Card