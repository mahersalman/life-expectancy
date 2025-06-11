import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();

  return (
    <motion.h1
      onClick={() => navigate('/')}
      initial={{
        y: -30,
        opacity: 0,
        scale: 0.9,
        rotateX: -15,
      }}
      animate={{
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
      }}
      transition={{
        duration: 0.8,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.98 }}
      className="
        relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl
        font-black text-transparent bg-clip-text
        bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500
        hover:from-purple-600 hover:via-pink-500 hover:to-orange-400
        mb-8 text-center cursor-pointer
        transition-all duration-500 ease-in-out
        drop-shadow-lg
        select-none
        flex items-center justify-center gap-4 flex-wrap
      "
      style={{
        fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
        letterSpacing: '-0.02em',
        lineHeight: '1.1',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      {/* Heartbeat Icon - Left Side */}
      <motion.div
        className="flex-shrink-0"
        animate={{
          scale: [1, 1.1, 1, 1.1, 1, 1, 1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          type: 'tween',
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          className="text-red-500 hover:text-pink-500 transition-colors duration-500 drop-shadow-lg"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          <path
            d="M3 12h3l1-3 2 6 2-9 1.5 3 1.5-1h7"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
        </svg>
      </motion.div>

      {/* Text with stable hover - no disappearing */}
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 font-black">
          Life Expectancy
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 font-light italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          Calculator
        </span>
      </div>

      {/* Medical Cross Icon - Right Side */}
      <motion.div
        className="flex-shrink-0"
        whileHover={{
          rotateY: 360,
          scale: 1.1,
          transition: { duration: 0.6, type: 'spring' },
        }}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 24 24"
          className="text-blue-600 hover:text-cyan-500 transition-colors duration-500 drop-shadow-lg"
          fill="currentColor"
        >
          <path d="M12 2C13.1 2 14 2.9 14 4V10H20C21.1 10 22 10.9 22 12C22 13.1 21.1 14 20 14H14V20C14 21.1 13.1 22 12 22C10.9 22 10 21.1 10 20V14H4C2.9 14 2 13.1 2 12C2 10.9 2.9 10 4 10H10V4C10 2.9 10.9 2 12 2Z" />
          <path d="M12 4V10H20V14H12V20H10V14H4V10H10V4H12Z" fill="white" opacity="0.2" />
        </svg>
      </motion.div>

      {/* Floating accent elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-3 h-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full opacity-60"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          type: 'tween',
        }}
      />
      <motion.div
        className="absolute -bottom-2 -left-2 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60"
        animate={{
          y: [0, 8, 0],
          scale: [1, 0.8, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
          type: 'tween',
        }}
      />
    </motion.h1>
  );
}
