import React from 'react'
import Header from './components/Header'
import Fotter from './components/Fotter'
import Alert from './components/Alert'
import FirstSection from './components/FirstSection'
import SecondSection from './components/SecondSection'
import ThirdSection from './components/ThirdSection'
import FourthSection from './components/FourthSection'
import FifthSection from './components/FifthSection'
import SixSection from './components/SixSection'
import YoutubeVideos from './components/YoutubeVideo/YoutubeVideos'

function App() {
  return (
    <div>
      <Header />
      <Alert />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixSection />
      <YoutubeVideos />
      <Fotter />
    </div>
  )
}

export default App
