import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'




const Guard = () => {
  const {authenticated} = useSelector((state: any) => state.auth)
  return <div>
  {authenticated ? <Outlet /> : <Navigate to='/auth' />}
  </div>
}

export default Guard