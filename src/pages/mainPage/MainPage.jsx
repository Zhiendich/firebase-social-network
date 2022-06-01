import Header from '../../components/header/Header'
import { useAuth } from '../../components/providers/UseAuth'
import Sidebar from '../../components/sidebar/Sidebar'
import Paths from '../../rotes/Paths'

const MainPage = () => {
  const { user } = useAuth()
  return (
    <>
      {user ? (
        <>
          <Header />
          <div className='mainPage'>
            <Sidebar />
            <div className='test_block'>
              <Paths />
            </div>
          </div>
        </>
      ) : (
        <>
          <Paths />
        </>
      )}
    </>
    // <>
    //   <Header />
    //   <div className='mainPage'>
    //     <Sidebar />
    //     <div className='test_block'>
    //       <Paths />
    //     </div>
    //   </div>
    // </>
  )
}

export default MainPage
