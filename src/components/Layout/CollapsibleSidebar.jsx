import { useSelector } from 'react-redux'

const CollapsibleSidebar = ({ children }) => {
  const { isOpenSidebar } = useSelector((state) => state.layout)

  return (
    <>
      {isOpenSidebar && (
        <div className="w-64 h-full z-[1]  top-0 left-0 fixed">
          {children}
        </div>
      )}
    </>
  )
}

export default CollapsibleSidebar