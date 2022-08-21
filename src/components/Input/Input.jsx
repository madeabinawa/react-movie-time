import { useState } from 'react'
import { BiShow, BiHide } from 'react-icons/bi'
const Input = ({
  label,
  type = 'text',
  className,
  error,
  isError = false,
  ...rest
}) => {
  const [toggleState, setToggleState] = useState(type)
  const handleToggleObscure = () => setToggleState(prev => prev === 'password' ? 'text' : 'password')

  const ToggleComponent = () => {
    const iconClassName = 'text-white text-xl my-2 mx-1'
    return toggleState === 'password'
      ? <BiShow onClick={handleToggleObscure} className={iconClassName} />
      : <BiHide onClick={handleToggleObscure} className={iconClassName} />
  }

  return (
    <div className="w-full mb-2">
      <small className={`text-white text-sm font-semibold ${className}`}>{label}</small>
      <div className='w-full flex border p-1 my-1 border-white rounded-lg duration-150 ease-in-out'>
        <input type={toggleState} className='w-full h-10 px-2 text-white font-light bg-gray-800 outline-none ' {...rest} />
        {type === 'password' && <ToggleComponent />}
      </div>
      {isError && <small className='text-red-500 text-xs font-normal'>{error}</small>}
    </div>
  )
}

export default Input