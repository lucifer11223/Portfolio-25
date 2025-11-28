import ImageGallery from '../components/imageGallery'
import Navbar from '../components/Navbar'


const About = () => {
  return (
    <div className='h-screen bg-[#C08497]'>
      <Navbar />
      <div className='flex items-center justify-center'>
        <h1>Hi, i'm</h1>
        <p>Shshank Raj</p>
      </div>
      <ImageGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} />
    </div>
  )
}

export default About
