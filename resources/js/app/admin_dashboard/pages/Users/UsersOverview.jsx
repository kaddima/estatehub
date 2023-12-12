import React, { useEffect, useState } from 'react'
import Card from './Card'
import {} from "react-chartjs-2"
import { MdAdminPanelSettings} from 'react-icons/md'
import { FaRegUserCircle, FaUserCheck } from 'react-icons/fa'
import { format } from 'date-fns'
import { parseISO } from 'date-fns'
import axios from 'axios'
import {TbUsers} from "react-icons/tb"

const TableRow = ({data,index,onResolve})=>{

   
	return (
		  <tr className=''>
			   <td className='text-left border-b-1 border-b-gray-300 py-3'>
				  <span className='text-sm block text-gray-700'>{data.first_name}</span>
			  </td>
			   <td className='text-left border-b-1 border-b-gray-300 w-full overflow-x-scroll'>
				  <span className='text-sm block w-full text-gray-700'>{data.email}</span>
			  </td>
			  <td className='text-left border-b-1 border-b-gray-300 pl-1'>
				  <span className='text-sm block text-gray-700'>{data.created_at && format(new Date(data.created_at),'dd MMM Y')}</span>
			  </td>
			 
			  <td className='text-left border-b-1 border-b-gray-300'>
				  <span className={`text-sm text-white text-center block rounded px-1 ${data.is_agent == 1 ? 'bg-[#2b969e]' : 'bg-[#268a33]'}`}>{data.is_agent == 1 ? 'Agent' : 'Regular'}</span>
			  </td>
			  
		  </tr>
	)
  }

const UsersOverview = () => {

    const [usersDetails, setUsersDetails] = useState()

    useEffect(()=>{

        axios.get('/admin/users/overview').then(data=>{

            setUsersDetails(data.data.data)
        }).catch(e=>{

            console.log(e.response)
        })


    },[])
    
  return (
    <div className='h-full p-3'>
        <div className='flex md:flex-row flex-col gap-3'>
            <div className='md:w-2/4'>  
                <div className='relative gap-2 md:gap-5 flex items-center w-full border bg-[#238f5d] rounded-xl p-3'>
                    {/* <div className='absolute bg-total-img right-0 w-1/4 h-full bg-no-repeat bg-[100%_100%]'></div> */}
                    <span className='text-white'>
                        <TbUsers size={64}/>
                    </span>
                    <div className='flex justify-between items-center w-full relative z-[1] bg-transparent'>
                        <div className='text-white space-y-2'>
                            <h1 className='text-sm md:text-xl font-semibold'>Total Users</h1>
                            <div className='w-full h-2 bg-slate-200 rounded-lg'>
                                <div className='w-[60%] h-full bg-white'></div>
                            </div>
                            <p className='text-xs md:text-sm leading-none'>This represents the total number of users account registered on this application</p>
                        </div>
                        <div className='text-lg md:text-2xl text-white font-bold ml-2 md:pl-0'>
                        {usersDetails?.usersCount}
                        </div>
                    </div>
                </div> 
                <div className='mt-5'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Card name="Users - Regular" number={usersDetails?.regularUsersCount} icon={<FaUserCheck size={32} className='text-sky-600'/>}/>
                        <Card name="Users - Agent" number={usersDetails?.agentsCount} icon={<FaRegUserCircle size={32} className='text-green-600'/>}/>
                        {/* <Card name="Properties for short let" number={7} icon={<MdApartment size={32} className='text-theme-color'/>}/> */}
                    </div>
                    <div className='mt-5'>
                        <Card name="Users - Admin" number={usersDetails?.adminsCount} className={`bg-white py-5 text-xl`} icon={<MdAdminPanelSettings size={32} className='text-orange-600'/>}/>
                    </div>
                </div>   
            </div>

            <div className='md:w-2/4'>
                <div className='bg-white h-full p-2'>
                    <h1 className='text-xs uppercase pb-2 border-b font-semibold'>Most Recent account</h1>

                    <div>
                        <table className='w-full table-fixed border-separate'>
                            <thead>
                                <tr>
                                    <th className='text-left font-semibold text-sm'>First name</th>
                                    <th className='text-left font-semibold text-sm w-[35%]'>Email</th>
                                    <th className='text-left font-semibold text-sm'>Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersDetails?.recentUsers && usersDetails.recentUsers.map((v,i)=>{

                                    return <TableRow key={i} data={v}/>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UsersOverview