import React, { useEffect, useState } from 'react'
import { TbChartCandle, TbChevronDown } from 'react-icons/tb'
import For from './For'
import AllFilters from './AllFilters'
import $ from 'jquery'
import Price from './Price'
import States from './States'
import HomeType from './HomeType'
import BedsNBaths from './BedsNBaths'
import { BiSearch } from 'react-icons/bi'
import {MdOutlineRestartAlt} from "react-icons/md"
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import qs from 'query-string'

const PropertySearch = () => {
    
    const [searchNav,setSearchNav] = useState()
    const [showSearch,setShowSearch] = useState(false)
    const navigate = useNavigate()
    const path = useLocation().pathname
    const [searchParams,setSearchParams] = useSearchParams()

    const [searchValues,setSearchValues] = useState({

        category:null,
        price:null,
        state_lga:null,
        property_type:null,
        beds_baths:null
    })

    const onDone = (e=>{

        let type = e.target.dataset.type

        if(searchValues[type]){

            let params = qs.parse(searchParams.toString());

            params = {...params,...searchValues[type] }

            let queryStr = '?'+ new URLSearchParams(params).toString()
            navigate(`${path}${queryStr}`)

        }

        setSearchNav(null)
    })

    const onSearchNavClick = (e)=>{
        e.stopPropagation()
        let action = $(e.currentTarget).data('value')
        setSearchNav(action)

    }

    useEffect(()=>{
        $(function(){

            var handler = function(event){
                // if the target is a descendent of container do nothing
                if($(event.target).is(".property-search, .property-search *")) return;

                setSearchNav(null)
              }
              
              $(document).on("click", handler);
        })
    },[])

  return (
    <div className='property-search w-full bg-white max-w-[850px] mx-auto relative z-[800]'>
        <div className='flex items-center'>
            <div className='flex items-center space-x-3'>
                <div className='hidden md:flex flex-col max-w-[150px] '>
                    <button data-value={'for'} onClick={onSearchNavClick} className='border px-3 h-[2.5rem] rounded flex items-center space-x-3 text-sm w-full'>
                        <span>For Rent </span>
                        <TbChevronDown/>
                    </button>

                    <div className={`${searchNav == 'for' ? 'block' : 'hidden'} relative w-0 h-0 overflow-visible z-[800] cursor-auto`}>
                        <div className='p-0 pb-[1rem] absolute top-0 left-0 shadow-[-0.8px_0.25px_3px_2.5px_rgba(0,0,0,.15)] bg-white 
                        leading-[1.25] rounded-[5px] mt-[0.5em] w-[371px] max-h-[620px]'>
                        
                            <div className='px-5 py-3'>
                                <For setSearchValues={setSearchValues}/>
                                <button data-type="category" onClick={onDone} className='bg-theme-color px-5 py-2 rounded-[2px] text-white font-semibold float-right'>
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hidden md:flex flex-col max-w-[150px]'>
                    <button data-value={'price'} onClick={onSearchNavClick} className='border px-3 h-[2.5rem] rounded flex items-center space-x-3 text-sm '>
                        <span>Price </span>
                        <TbChevronDown/>
                    </button>

                    <div className={`${searchNav == 'price' ? 'block' : 'hidden'} relative w-0 h-0 overflow-visible z-[800] cursor-auto`}>
                        <div className='p-0 pb-[1rem] absolute top-0 left-0 shadow-[-0.8px_0.25px_3px_2.5px_rgba(0,0,0,.15)] bg-white 
                        leading-[1.25] rounded-[5px] mt-[0.5em] w-[371px] max-h-[620px]'>
                            <div className='px-5 py-3 space-y-3'>
                                <h1 className='font-xl font-semibold mb-1'>Price</h1>
                               <Price setSearchValues={setSearchValues}/> 
                                <button data-type="price" onClick={onDone} className='bg-theme-color px-5 py-2 rounded-[2px] text-white font-semibold float-right'>
                                    Done
                                </button>
                            </div>
                           
                        </div>
                    </div>
                </div>
                <div className='hidden md:flex flex-col max-w-[150px]'>
                    <button data-value={'state'} onClick={onSearchNavClick} className='border px-3 h-[2.5rem] rounded flex items-center space-x-3 text-sm '>
                        <span>State</span>
                        <TbChevronDown/>
                    </button>

                    <div className={`${searchNav == 'state' ? 'block' : 'hidden'} relative w-0 h-0 overflow-visible z-[800] cursor-auto`}>
                        <div className='p-0 pb-[1rem] absolute top-0 left-0 shadow-[-0.8px_0.25px_3px_2.5px_rgba(0,0,0,.15)] bg-white 
                        leading-[1.25] rounded-[5px] mt-[0.5em] w-[371px] max-h-[620px]'>
                            <div className='px-5 py-3 space-y-3'>
                                <h1 className='text-sm font-semibold mb-1'>States/LGA</h1>
                                {searchNav == 'state' && <States setSearchValues={setSearchValues}/>}  
                                <button data-type="state_lga" onClick={onDone} className='bg-theme-color px-5 py-2 rounded-[2px] text-white font-semibold float-right'>
                                    Done
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='hidden md:flex flex-col max-w-[150px]'>
                    <button data-value={'hometype'} onClick={onSearchNavClick} className='border px-3 h-[2.5rem] rounded flex items-center space-x-3 text-sm '>
                        <span>Home type</span>
                        <TbChevronDown/>
                    </button>

                    <div className={`${searchNav == 'hometype' ? 'block' : 'hidden'} relative w-0 h-0 overflow-visible z-[800] cursor-auto left-[100%]`}>
                        <div className='p-0 pb-[1rem] absolute top-0 right-0 shadow-[-0.8px_0.25px_3px_2.5px_rgba(0,0,0,.15)] bg-white 
                        leading-[1.25] rounded-[5px] mt-[0.5em] w-[371px] max-h-[620px] px-3'>
                            <div className='py-3 w-full overflow-x-scroll space-y-3'>
                                <h1 className='text-sm font-semibold mb-1'>Home Type</h1>
                                <HomeType setSearchValues={setSearchValues}/>
                                <button data-type="property_type" onClick={onDone} className='bg-theme-color px-5 py-2 rounded-[2px] text-white font-semibold float-right'>
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hidden md:flex flex-col max-w-[150px]'>
                    <button data-value={'bedsbaths'} onClick={onSearchNavClick} className='border px-3 h-[2.5rem] rounded flex items-center space-x-3 text-sm '>
                        <span>Beds/Baths</span>
                        <TbChevronDown/>
                    </button>
 
                    <div className={`${searchNav == 'bedsbaths' ? 'block' : 'hidden'} relative w-0 h-0 overflow-visible z-[800] cursor-auto left-[100%]`}>
                        <div className='p-0 pb-[1rem] absolute top-0 right-0 shadow-[-0.8px_0.25px_3px_2.5px_rgba(0,0,0,.15)] bg-white 
                        leading-[1.25] rounded-[5px] mt-[0.5em] w-[371px] max-h-[620px]'>
                            <div className='px-5 py-3 space-y-3'>
                                <h1 className='text-sm font-semibold mb-1'>Beds/Baths</h1>
                                <BedsNBaths setSearchValues={setSearchValues}/>
                                <button data-type="beds_baths" onClick={onDone} className='bg-theme-color px-5 py-2 rounded-[2px] text-white font-semibold float-right'>
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>

            
            <div className=' max-w-[150px] ml-5'>
                <div className='flex gap-2 items-center'>
                    <div data-value={'allfilters'} onClick={onSearchNavClick} className="block md:hidden p-1 h-7 w-7 bg-rose-500 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                    <button data-value={'allfilters'} onClick={onSearchNavClick} className='border px-3 h-[2.5rem] rounded hidden md:flex items-center space-x-3 text-sm '>
                        <TbChartCandle size={24} className='text-slate-600'/>
                        <span>All Filters </span>
                    </button>
                    <button onClick={()=>{setSearchParams({})}} title='Reset search' className='border px-3 h-[2.5rem] rounded flex items-center space-x-3 text-sm '>
                        <MdOutlineRestartAlt size={28} className='text-slate-600'/>
                        <span className='hidden md:inline-block'>search reset</span>
                    </button>
                </div>
                

                <div className={`relative w-0 h-0 overflow-visible z-[800] cursor-auto`}>
                   <AllFilters isOpen={searchNav == 'allfilters' ? true : false} onClose={()=>{setSearchNav(null);setShowSearch(false)}}/>
                </div>
            </div>     
            
        </div>
       
    </div>
  )
}

export default PropertySearch