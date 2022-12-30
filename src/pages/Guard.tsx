import { useCookies } from 'react-cookie'
import { Navigate, Outlet } from 'react-router-dom'




const Guard = () => {


  const [cookies] = useCookies()


  
  return <div>
  {cookies.access_token ? <Outlet /> : <Navigate to='/auth' />}
  </div>
}

export default Guard