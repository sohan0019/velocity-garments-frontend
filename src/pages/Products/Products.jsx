import React from 'react';
import Container from '../../components/Shared/Container';
import Card from '../../components/Home/Card';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { useState } from 'react';

const Products = () => {

  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['[products]',],
    queryFn: async () => {
      const result = await axiosSecure('/products');
      return result.data;
    }
  })

  const filteredProducts = products.filter(product =>
    product?.name?.toLowerCase().includes(search.toLowerCase()) ||
    product?.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner />

  scrollTo(0,0);

  return (
    <Container>
      <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>

        <div className='flex flex-col sm:flex-row items-center justify-between mb-8'>
          <h2 className='text-2xl font-medium'>All Products</h2>

          <input
            className='border border-gray-500 px-4 py-2 max-w-xs w-full outline-none rounded-md mt-5 sm:mt-0'
            type="text"
            placeholder='Search by name or category'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {
          filteredProducts.length > 0 ? (
            <div className='pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10'>
              {
                filteredProducts.map(product => (
                  <Card key={product._id} product={product}></Card>
                ))
              }
            </div>
          ) : (
            <h2>No Data is Available</h2>
          )
        }
      </div>
    </Container>
  );
};

export default Products;