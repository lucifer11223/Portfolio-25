import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import tool1Img from "../assets/ChatGPT.png";
import tool2Img from "../assets/Express.png";
import tool3Img from "../assets/figma-seeklogo.png";
import tool4Img from "../assets/framer-motion-seeklogo.png";
import tool5Img from "../assets/MongoDB.png";
import tool6Img from "../assets/Next.js.png";
import tool7Img from "../assets/NodeJS.png";
import tool8Img from "../assets/Notion.png";
import tool9Img from "../assets/React.png";
import tool10Img from "../assets/Tailwind.png";

gsap.registerPlugin(ScrollTrigger)

const Tools = () => {
  const containerRef = useRef(null)
  const group1Ref = useRef(null)
  const group2Ref = useRef(null)
  const imagesGroup1Ref = useRef([])
  const imagesGroup2Ref = useRef([])
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const instructionRef = useRef(null)
  const bottomText1Ref = useRef(null)
  const bottomText2Ref = useRef(null)

  const tools = [
    { name: 'Figma', icon: tool1Img },
    { name: 'Notion', icon: tool2Img },
    { name: 'MongoDB', icon: tool3Img },
    { name: 'NodeJS', icon: tool4Img },
    { name: 'Express', icon: tool5Img },
    { name: 'React', icon: tool6Img },
    { name: 'Next.js', icon: tool7Img },
    { name: 'Tailwind', icon: tool8Img },
    { name: 'Motion', icon: tool9Img },
    { name: 'Tailwind', icon: tool8Img },
    { name: 'Motion', icon: tool9Img },
    { name: 'ChatGPT', icon: tool10Img },
  ]

  useEffect(() => {
    const container = containerRef.current
    const group1 = group1Ref.current
    const group2 = group2Ref.current

    if (!container || !group1 || !group2) return

    // Responsive radius
    const radius1 = window.innerWidth < 768 ? 120 : 200
    const radius2 = window.innerWidth < 768 ? 80 : 130
    const centerX = container.offsetWidth / 2
    const centerY = container.offsetHeight / 2
    const totalImages = 6

    // Position images in circles
    const positionInCircle = (images, radius, offset = 0) => {
      images.forEach((img, i) => {
        if (!img) return
        const angle = (360 / totalImages) * i + offset
        const rad = (angle * Math.PI) / 180
        const x = centerX + radius * Math.cos(rad)
        const y = centerY + radius * Math.sin(rad)
        gsap.set(img, { x: x - 50, y: y - 50, scale: 0, rotation: -90 }) // center-adjusted
      })
    }

    positionInCircle(imagesGroup1Ref.current, radius1, 0)
    positionInCircle(imagesGroup2Ref.current, radius2, 30)

    // Text animations with ScrollTrigger
    const animateText = (element, delay = 0) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.03,
          delay,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: container,
            start: 'top center+=100',
            toggleActions: 'play reverse play reverse'
          }
        }
      )
    }

    if (titleRef.current) animateText(titleRef.current.children)
    if (subtitleRef.current) animateText(subtitleRef.current.children, 0.2)
    if (instructionRef.current) animateText(instructionRef.current.children, 0.4)
    if (bottomText1Ref.current) animateText(bottomText1Ref.current.children, 0.6)
    if (bottomText2Ref.current) animateText(bottomText2Ref.current.children, 0.8)

    // Images animation on scroll
    const allImages = [...imagesGroup1Ref.current, ...imagesGroup2Ref.current]
    gsap.fromTo(
      allImages,
      { scale: 0, opacity: 0, rotation: -90 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        stagger: 0.08,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse'
        }
      }
    )

    // Hover effects for tools
    allImages.forEach((img) => {
      if (!img) return
      const toolName = img.querySelector('.tool-name')
      img.addEventListener('mouseenter', () => {
        gsap.to(img, { scale: 1.25, duration: 0.4, ease: 'elastic.out(1, 0.5)' })
        if (toolName) gsap.to(toolName, { opacity: 1, y: -5, duration: 0.3 })
      })
      img.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1, duration: 0.3, ease: 'power2.out' })
        if (toolName) gsap.to(toolName, { opacity: 0, y: 5, duration: 0.3 })
      })
    })

    // Rotation with inertia
    let rotation1 = 0
    let rotation2 = 0
    let velocity1 = 0
    let velocity2 = 0
    let animationId = null

    const handleWheel = (e) => {
      e.preventDefault()
      const delta = e.deltaY * 0.5
      velocity1 += delta * 0.015
      velocity2 -= delta * 0.015
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    const animateRotation = () => {
      velocity1 *= 0.92
      velocity2 *= 0.92
      rotation1 += velocity1
      rotation2 += velocity2

      gsap.set(group1, { rotation: rotation1 })
      gsap.set(group2, { rotation: rotation2 })

      imagesGroup1Ref.current.forEach((img) => gsap.set(img, { rotation: -rotation1 }))
      imagesGroup2Ref.current.forEach((img) => gsap.set(img, { rotation: -rotation2 }))

      animationId = requestAnimationFrame(animateRotation)
    }

    animateRotation()

    // Update positions on resize
    const handleResize = () => {
      const newRadius1 = window.innerWidth < 768 ? 120 : 200
      const newRadius2 = window.innerWidth < 768 ? 80 : 130
      const centerX = container.offsetWidth / 2
      const centerY = container.offsetHeight / 2
      positionInCircle(imagesGroup1Ref.current, newRadius1, 0)
      positionInCircle(imagesGroup2Ref.current, newRadius2, 30)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      container.removeEventListener('wheel', handleWheel)
      window.removeEventListener('resize', handleResize)
      if (animationId) cancelAnimationFrame(animationId)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  // JSX
  return (
    <div className="bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen">
      <div className="relative flex flex-col items-center justify-center min-h-screen p-8">
        {/* Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold bg-linear-to-r from-gray-900 via-blue-700 to-purple-700 bg-clip-text text-transparent mb-3 flex flex-wrap justify-center"
        >
          {'Design Tools'.split('').map((char, i) => (
            <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-gray-600 text-lg md:text-xl font-light flex flex-wrap justify-center"
        >
          {'The tools I use to turn ideas into stories'.split('').map((char, i) => (
            <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </p>

        {/* Instructions */}
        <p
          ref={instructionRef}
          className="text-gray-500 text-sm flex flex-wrap justify-center gap-2 mt-2 items-center"
        >
          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
          {'Scroll to explore • Hover to interact'.split('').map((char, i) => (
            <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </p>

        {/* Tools container */}
        <div
          ref={containerRef}
          className="relative mt-12 w-[90vw] max-w-[600px] h-[90vw] max-h-[600px] cursor-grab active:cursor-grabbing"
        >
          {/* Tool Groups */}
          <div ref={group1Ref} className="absolute inset-0">
            {tools.slice(0, 6).map((tool, i) => (
              <div
                key={`group1-${i}`}
                ref={(el) => (imagesGroup1Ref.current[i] = el)}
                className="absolute w-16 h-16 md:w-20 md:h-20"
              >
                <div className="w-full h-full rounded-2xl backdrop-blur-md flex flex-col items-center justify-center gap-1 md:gap-2"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(249,250,251,0.9))', border: '1px solid rgba(209,213,219,0.6)' }}>
                  <img src={tool.icon} alt={tool.name} className="w-10 h-10 md:w-16 md:h-16 pointer-events-none" />
                  <div className="tool-name text-xs md:text-sm text-gray-800 font-medium absolute -bottom-6 md:-bottom-8 opacity-0">{tool.name}</div>
                </div>
              </div>
            ))}
          </div>

          <div ref={group2Ref} className="absolute inset-0">
            {tools.slice(6, 12).map((tool, i) => (
              <div
                key={`group2-${i}`}
                ref={(el) => (imagesGroup2Ref.current[i] = el)}
                className="absolute w-14 h-14 md:w-20 md:h-20"
              >
                <div className="w-full h-full rounded-2xl backdrop-blur-md flex flex-col items-center justify-center gap-1 md:gap-2"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(249,250,251,0.9))', border: '1px solid rgba(209,213,219,0.6)' }}>
                  <img src={tool.icon} alt={tool.name} className="w-9 h-9 md:w-14 md:h-14 pointer-events-none" />
                  <div className="tool-name text-xs md:text-sm text-gray-800 font-medium absolute -bottom-6 md:-bottom-8 opacity-0">{tool.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  )
}

export default Tools
