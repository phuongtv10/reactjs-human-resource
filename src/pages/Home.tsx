import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useGetAllPostsQuery } from '../api/category.api';

const HomePage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/auth')
  },[])

  return <></>
}

export default HomePage