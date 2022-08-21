import { useNavigate } from "react-router-dom"
import { ActionButton } from "@/components"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full h-[90%] flex flex-col justify-center items-center text-white text-2xl font-bold '>
      <h1 className="mb-3"> 404 Not Found </h1>
      <ActionButton outerClassName="w-auto h-auto px-3 py-2" innerClassName="text-sm uppercase tracking-wider" text="Take me home" onClick={() => navigate("/movies", { replace: true })} />
    </div>
  )
}

export default NotFound 