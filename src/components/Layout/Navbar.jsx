import { useDispatch } from "react-redux"
import { BiCog, BiMenu, BiLogOut } from "react-icons/bi"
import { Searchbar } from "@/components"
import { authLogout } from "@/store/authSlice"
import { setSidebar } from "@/store/layoutSlice"

const Navbar = () => {
  const iconClassName = 'text-white text-xl hover:cursor-pointer'

  const dispatch = useDispatch()
  const handleLogout = () => dispatch(authLogout())
  const toggleSidebar = () => dispatch(setSidebar())

  return (
    <div className="flex justify-between items-center py-4 px-3 lg:px-5 md:px-3 h-[10%]">
      <div className="w-full flex justify-start items-center">
        <BiMenu className={`mr-2  ${iconClassName}`} onClick={toggleSidebar} />
        <Searchbar />
      </div>

      <div className="w-16 ml-2 flex justify-between items-center">
        <BiCog className={iconClassName} />
        <BiLogOut onClick={handleLogout} className={iconClassName} />
      </div>
    </div>
  )
}

export default Navbar