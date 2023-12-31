
import Container from "./Container"
import CategoryBox from "./CategoryBox"

import { categories } from "../data/data"

const Categories = () => {

    // const isMainPage = pathname === '/'
    // if(!isMainPage){
    //     return null
    // }
  return (
    
        <div className="pt-1 bg-white flex text-slate-600 items-center justify-between overflow-x-auto">
            {categories.map((item, i)=>{

                return (
                    <CategoryBox key={i} 
                    label={item.label}
                    //selected={category === item.label}
                    icon={item.icon}/>
                )
            })}
        </div>
  
  )
}

export default Categories