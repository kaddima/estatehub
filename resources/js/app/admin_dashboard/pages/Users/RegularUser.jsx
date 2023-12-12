import axios from 'axios'
import { parseISO,format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { BsTrash } from 'react-icons/bs'
import { MdBlock } from 'react-icons/md'

const TableRow = ({data})=>{

    const onDelete = ()=>{

        if(window.confirm('Delete the user?')){
            console.log(data.id)
        }
        
    }

    const onBlock = ()=>{

        if(window.confirm('Block the user?')){
            console.log(data.id)
        }
        
    }


    return <tr>
        <td className='text-sm border-b py-3'>
            <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-purple-900 text-white font-bold uppercase flex items-center justify-center text-lg'>
                    {data.first_name[0]}
                </div>
                <p>{data.first_name ? `${data.first_name} ${data.last_name}` : '-'}</p>
            </div>
        </td>
        <td className='text-sm border-b'>{data.email}</td>
        <td>{data.phone}</td>
        <td className='text-sm border-b'>{data.created_at && format(new Date(data.created_at),'dd MMM Y')}</td>
        <td className='border-b'>
            <div className='space-x-2'>
                <button className='text-red-600' title='Block user' onClick={onBlock}>
                    <MdBlock size={18}/>
                </button>
                <button className='text-red-600' title='Delete user' onClick={onDelete}>
                    <BsTrash size={18}/>
                </button>
            </div>
        </td>
    </tr>
}

const RegularUser = () => {
    const [usersDetails, setUsersDetails] = useState([])

    useEffect(()=>{

        axios.get('/admin/users/regular').then(data=>{

            let users = data.data.data.data
            console.log(data.data.data)
            setUsersDetails(users)
        }).catch(e=>{

            console.log(e.response)
        })


    },[])
    
  return (
    <div className='h-full bg-white p-3'>
        <div>
            <div>
                <h1 className='text-lg font-bold'>Users</h1>
                <p className='text-xs font-semibold leading-none'>This is the full list of all regular users on the application</p>
            </div>  
            <div className='mt-5 overflow-x-scroll'>
                <table className='w-full table-auto border-separate'>
                    <thead>
                        <tr>
                            <th className='text-left font-semibold text-sm'>Fullname</th>
                            <th className='text-left font-semibold text-sm'>Email</th>
                            <th className='text-left font-semibold text-sm'>Phone</th>
                            <th className='text-left font-semibold text-sm'>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersDetails && usersDetails.map((v,i)=>{
                            return <TableRow key={i} data={v}/>
                        })}
                        
                        
                    </tbody>
                </table>
            </div>   
        </div>
    </div>
  )
}

export default RegularUser