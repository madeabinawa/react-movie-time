import {
  BiMoviePlay,
  BiTrendingUp,
  BiBookmark,
  BiGlasses,
  BiCategory,
  BiChevronLeftCircle,
} from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSidebar } from "@/store/layoutSlice"

const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClose = () => dispatch(setSidebar())

  const MENUS = [
    { icon: <BiTrendingUp />, title: "Trending", path: 'movies' },
    { icon: <BiMoviePlay />, title: "New Release" },
    { icon: <BiGlasses />, title: "Coming Soon" },
    { icon: <BiBookmark />, title: "Wishlists" },
    { icon: <BiCategory />, title: "Genres" },
  ]

  const SidebarItems = ({ icon, text, path }) => (
    <li key={text} className="text-gray-500 hover:text-white">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2">
          {icon}
        </div>
        <a
          href="#"
          onClick={() => navigate(path, { replace: true })}
          className="inline-block w-full pl-8 pr-4 py-2 hover:bg-gray-800 rounded"
        >
          {text}
        </a>
      </div>
    </li>
  )

  return (
    <div className="hidden lg:block lg:w-64 h-screen bg-dark">
      <div className="px-6 pt-8">
        <div className="flex items-center justify-between">
          <h1 className="text-gray-500 font-bold hover:text-white">Movie Time</h1>
          <button className="flex items-center justify-center p-0.5 rounded">
            <BiChevronLeftCircle className="text-gray-500 text-xl"
              onClick={handleClose}
            />
          </button>
        </div>
      </div>

      <div className="px-6 pt-4">
        <hr className="border-gray-700" />
      </div>

      <div className="px-6 pt-4">
        <ul>
          {MENUS?.length > 0 && MENUS?.map((menu) => {
            return (
              <SidebarItems
                key={menu.title}
                icon={menu.icon}
                text={menu.title}
                path={menu.path}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
