import About from '../../components/Home/About'
import Feedback from '../../components/Home/Feedback'
import GetConnected from '../../components/Home/GetConnected'
import LatestProducts from '../../components/Home/LatestProducts'
import Works from '../../components/Home/Works'
import Banner from '../../components/Shared/Banner/Banner'
import Container from '../../components/Shared/Container'

const Home = () => {

  scrollTo(0,0);
  
  return (
    <div>
      <Banner />
      <LatestProducts></LatestProducts>
      <Works></Works>
      <Feedback></Feedback>
       <GetConnected></GetConnected>
       <About></About>
    </div>
  )
}

export default Home
