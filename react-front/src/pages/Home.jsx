import Sidebar from '../components/layout/Sidebar'
import MainContent from '../components/layout/MainContent'

const Home = () => {
  return (
    <div className='home'>
      {/* Side bar */}
      <Sidebar />
      {/* inner container */}
      <MainContent />
    </div>
  )
}

export default Home
