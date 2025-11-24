import project1Img from '../assets/projext1.png'
import { FaArrowRight } from 'react-icons/fa'

const ProjectCard = ({ img, link }) => {
    return (
        <div className='relative bg-[#f4eee777] w-[300px] md:w-[400px] h-[350px] flex flex-col items-center justify-center rounded-2xl'>
            <div className='absolute top-1 bg-[#4444449d] w-[275px] md:w-[380px] h-[290px] rounded-2xl'>
                <div className='absolute top-2 left-2 flex items-center justify-center w-[260px] md:w-[360px] h-[275px] rounded-2xl'>
                    <img className='m-3 w-full h-full rounded-2xl object-cover' src={img} alt="" />
                </div>
            </div>

            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className='absolute left-4 bottom-2 bg-[#4444449d] w-[140px] h-10 rounded-full flex items-center justify-center gap-5 px-5 cursor-pointer shadow-md'
            >                <h1 className='text-xl font-mono text-[#f4eee777] mx-3'>
                    View
                </h1>
                <FaArrowRight className='text-[#f4eee777] text-lg' />
            </a>
        </div>
    )
}

export default ProjectCard