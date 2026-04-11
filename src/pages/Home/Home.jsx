import Feedback from '../../components/Home/Feedback'
import LatestProducts from '../../components/Home/LatestProducts'
import Works from '../../components/Home/Works'
import Banner from '../../components/Shared/Banner/Banner'
import Container from '../../components/Shared/Container'

const Home = () => {
  return (
    <div>
      <Banner />
      <LatestProducts></LatestProducts>
      <Works></Works>
      <Feedback></Feedback>
      
    </div>
  )
}

export default Home
