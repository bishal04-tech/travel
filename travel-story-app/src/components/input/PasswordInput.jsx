import React from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'
const PasswordInput = ({value,onChange,placeholder}) => {

    const [isShowPassword, setIsShowPassword] = React.useState(false);
    const toggleShowPassword=()=>{
        setIsShowPassword(!isShowPassword);
    
    }
  return (
    <div className='flex items-center bg-cyan-600/5 px-5 rounded mb-3'>

        <input
         value={value}
         onChange={onChange}
         placeholder={placeholder||"Password"}
            type={isShowPassword? "text" : "password"} 
         className='w-full h-12 bg-transparent outline-none text-gray-700 placeholder:text-gray-500'
            
        
          />
       {isShowPassword? (<FaRegEye
        size={22}
        className="cursor-pointer text-[#0586D3]"
        onClick={()=>

            toggleShowPassword()
        }
      
    />
    ): (
      <FaRegEyeSlash
        size={22}
        className="cursor-pointer text-[red]"
        onClick={()=>

            toggleShowPassword()
        }
      
    />

    )}
    </div>
  )
}

export default PasswordInput