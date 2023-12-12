import axios from 'axios'
import { format,parseISO } from 'date-fns'
import React, { useEffect,useState } from 'react'
import { BsTrash } from 'react-icons/bs'
import { MdBlock } from 'react-icons/md'
import { Link } from 'react-router-dom'


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
                    {data.first_name ? data.first_name[0]: '-'}
                </div>
                <p>{data.first_name ? `${data.first_name} ${data.last_name}` : '-'}</p>
            </div>  
        </td>
        <td className='text-sm border-b'>{data.email}</td>
        <td>{data.phone}</td>
        <td className='text-sm border-b'>{data.created_at && format(new Date(data.created_at),'dd MMM Y')}</td>
        <td><span className={`inline-block ${data.profile_complete == 1 ? 'bg-green-900' : 'bg-orange-800'}  text-white text-xs font-bold px-1`}>{data.profile_complete == 1 ?'Verified' : 'Unverified'}</span></td>
        <td className='border-b'>
        <div className='flex items-center space-x-2'>
                <Link to={`/admin/users/agent/${data.id}/overview`} className="text-sm text-sky-600 font-semibold">View</Link>
                <button className='text-red-600' title='Block the agent' onClick={onBlock}>
                    <MdBlock size={18}/>
                </button>
                <button className='text-red-600' title='Delete the agent' onClick={onDelete}>
                    <BsTrash size={18}/>
                </button>
            </div>
        </td>
    </tr>
}

const Agents = () => {

    const [agentsDetails, setAgentsDetails] = useState([])

    useEffect(()=>{

        axios.get('/admin/users/agent-lists').then(data=>{

            let agents = data.data.data.data
            console.log(data.data.data)
            setAgentsDetails(agents)
        }).catch(e=>{

            console.log(e.response)
        })


    },[])
    
  return (
    <div className='h-full bg-white p-3'>
        <div>
            <div>
                <h1 className='text-lg font-bold'>Agents</h1>
                <p className='text-xs font-semibold leading-none'>This is the full list of all agents on the application</p>
            </div>  
            <div className='mt-5 overflow-x-scroll'>
                <table className='w-full table-auto border-separate'>
                    <thead>
                        <tr>
                            <th className='text-left font-semibold text-sm'>Fullname</th>
                            <th className='text-left font-semibold text-sm'>Email</th>
                            <th className='text-left font-semibold text-sm'>Phone</th>
                            <th className='text-left font-semibold text-sm'>Date</th>
                            <th className='text-left font-semibold text-sm'>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {agentsDetails && agentsDetails.map((v,i)=>{
                            return <TableRow key={i} data={v}/>
                        })}
                    </tbody>
                </table>
            </div>   
        </div>
    </div>
  )
}

export default Agents