import Card from './Card'
import Container from '../Shared/Container'

const LatestProducts = () => {
  return (
    <Container>

      <div className='py-12'>
        <h1 className='text-5xl font-semibold text-center'>Latest Products</h1>
        <div className='py-12 mx-[2%] sm:mx-20 md:mx-[4%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-8'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </Container>
  )
}

export default LatestProducts;
