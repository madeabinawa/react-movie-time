import { TailSpin } from "react-loader-spinner"

const Loading = ({ className = "w-auto h-[90%]" }) => {
  return (
    <div className={`${className} flex justify-center items-center`}>
      <TailSpin color="#503e9d" height={40} width={40} />
    </div>
  )
}

export default Loading