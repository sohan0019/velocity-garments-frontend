import React from 'react';
import Container from '../../components/Shared/Container';
import Card from '../../components/Home/Card';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const Products = () => {

  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['[products]',],
    queryFn: async () => {
      const result = await axiosSecure('/products');
      return result.data;
    }
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <Container>
      {
        products && products.length > 0 ? (
          <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {
              products.map(product => (
                <Card key={product._id} product={product}></Card>
              ))
            }
          </div>
        ) : (
          <h2>No Data is Available</h2>
        )
      }
    </Container>
  );
};

export default Products;