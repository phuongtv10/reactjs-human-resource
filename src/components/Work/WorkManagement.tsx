import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllPostsQuery } from '../../api/category.api';
import { categoryState } from '../../redux/features/category.slice';
import { ICategoryResponse } from '../../redux/type';

interface ICategoryItemProps {
  post: ICategoryResponse;
}


const WorkManagement = () => {
  const { isLoading, isError, error, data: posts } = useGetAllPostsQuery();
  console.log("data", posts);
  
  return (
    <div>ưdqdqw</div>
  )
}

export default WorkManagement