import React from 'react';
import { motion } from 'framer-motion';
import { useScrollTrigger } from '../../hooks/animations/useScrollTrigger';
import AnimatedCounter from '../../components/animation/AnimatedCounter';
import EnhancedHero from '../../components/hero/EnhancedHero';
import StatisticsSection from '../../components/shared/StatisticsSection';
import GSAPTimeline from '../../components/animation/GSAPTimeline';
import { ANIMATION_DURATION, ANIMATION_EASING } from '../../utils/animations/constants';
import { Calendar, Users, Settings, Package } from 'lucide-react';

const AnimationTest: React.FC = () => {
  const { ref, controls } = useScrollTrigger();
  const statsRef = useScrollTrigger({ threshold: 0.2 });

  // Mockup data for GSAP Timeline
  const timelineMockupData = [
    {
      id: 1,
      icon: '⭐',
      iconBg: 'bg-blue-500',
      label: 'Quality Excellence',
      description: 'Premium quality products',
      position: 'left-1/4'
    },
    {
      id: 2,
      icon: '✨',
      iconBg: 'bg-green-500',
      label: 'Innovation',
      description: 'Cutting-edge technology',
      position: 'left-3/4'
    },
    {
      id: 3,
      icon: '🏆',
      iconBg: 'bg-purple-500',
      label: 'Award Winner',
      description: 'Industry recognition',
      position: 'left-1/2'
    },
    {
      id: 4,
      icon: '🌱',
      iconBg: 'bg-emerald-500',
      label: 'Sustainability',
      description: 'Eco-friendly practices',
      position: 'left-1/6'
    }
  ];


  const stats = [
    {
      icon: Calendar,
      value: 20,
      suffix: '+',
      label: 'Years of Excellence',
      description: 'Leading the textile industry since 2002'
    },
    {
      icon: Users,
      value: 1200,
      suffix: '+',
      label: 'Skilled Employees',
      description: 'Dedicated professionals driving our success'
    },
    {
      icon: Settings,
      value: 680,
      suffix: '+',
      label: 'Advanced Machines',
      description: 'State-of-the-art equipment ensuring premium quality'
    },
    {
      icon: Package,
      value: 360,
      suffix: 'K+',
      label: 'Annual Production',
      description: 'Meeting global demand with efficiency'
    },
  ];



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <EnhancedHero />

      {/* Statistics Section Component */}
      <StatisticsSection />

      {/* Animated Counter Examples */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Animated Counter - Simple Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">
              <AnimatedCounter
                to={20}
                suffix="+"
                duration={2}
                delay={0.1}
              />
            </div>
            <p className="text-gray-600">Years of Excellence</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">
              <AnimatedCounter
                to={1200}
                suffix="+"
                duration={2}
                delay={0.2}
              />
            </div>
            <p className="text-gray-600">Skilled Employees</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">
              <AnimatedCounter
                to={680}
                suffix="+"
                duration={2}
                delay={0.3}
              />
            </div>
            <p className="text-gray-600">Advanced Machines</p>
          </div>
        </div>

        {/* Advanced Counter Examples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-white text-center">
            <div className="text-3xl font-bold mb-2">
              <AnimatedCounter
                to={360}
                suffix="K+"
                duration={2.5}
                delay={0.4}
              />
            </div>
            <p className="text-blue-100">Annual Production</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg text-white text-center">
            <div className="text-3xl font-bold mb-2">
              <AnimatedCounter
                to={45.5}
                decimals={1}
                prefix="৳"
                duration={2}
                delay={0.5}
              />
            </div>
            <p className="text-green-100">Stock Price</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg text-white text-center">
            <div className="text-3xl font-bold mb-2">
              <AnimatedCounter
                to={100}
                suffix="%"
                duration={2.5}
                delay={0.6}
              />
            </div>
            <p className="text-purple-100">Satisfaction Rate</p>
          </div>
        </div>
      </section>

      {/* Scroll Animation Demos */}
      {/* Statistics Section Demo */}
      <section className="mb-16 py-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-primary-500">Kattali Textile Limited</span>
          </h2>
          <p className="text-xl text-gray-600">Numbers that speak for our excellence</p>
        </motion.div>

        <motion.div
          ref={statsRef.ref}
          animate={statsRef.controls}
          initial="hidden"
          variants={containerVariants}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Animated Icon */}
                <motion.div
                  className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4"
                  animate={{ rotate: [0, 2, -2, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                >
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </motion.div>

                {/* Counter */}
                <div className="text-center mb-2">
                  <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                    <AnimatedCounter
                      to={stat.value}
                      suffix={stat.suffix}
                      duration={2}
                      delay={index * 0.1}
                    />
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-700 text-center">
                  {stat.label}
                </h3>

                {/* Progress bar */}
                {stat.value && (
                  <motion.div
                    className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.5,
                      duration: 1
                    }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-400 to-primary-600"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        delay: index * 0.1 + 0.7,
                        duration: 1.5
                      }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Basic Scroll Trigger Demo */}
      <section className="mb-16 h-screen flex items-center justify-center">
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={{
            hidden: { opacity: 0, y: 100 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: ANIMATION_DURATION.slow,
                ease: ANIMATION_EASING.easeOut
              }
            }
          }}
          className="bg-primary-500 text-white p-8 rounded-lg"
        >
          <h2 className="text-2xl font-bold">Scroll Triggered Animation</h2>
          <p>This appears when you scroll!</p>
        </motion.div>
      </section>

      {/* Staggered Scroll Animations */}
      <section className="mb-16 space-y-12">
        <h2 className="text-2xl font-bold mb-4">Staggered Scroll Animations</h2>
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={containerVariants}
          className="space-y-8"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">Card {i + 1}</h3>
              <p>This card animates in with a stagger effect.</p>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* GSAP Timeline Animation Section - Use Case Example */}
      <section className="mb-16 py-12 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            GSAP Timeline <span className="text-primary-500">Animation</span>
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Animated timeline showcasing company milestones with smooth transitions
          </p>

          {/* Use Case: Company Journey Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Use Case: Timeline Animation</h3>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Animate elements in sequence with precise timing control</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Coordinate multiple animations with nested timelines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Control playback speed and start position</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Perfect for storytelling, process flows, or journey animations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Animation Sequence</h3>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="w-16 text-gray-500">0.0s</span>
                    <span>Scrubber moves right, mask scales down</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-500">0.5s</span>
                    <span>First icon scales in</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-500">~0.3s</span>
                    <span>First text appears (0.2s before icon finishes)</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-500">~1.6s</span>
                    <span>Second icon & text animate in sequence</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-gray-500">Speed</span>
                    <span>80% normal (timeScale: 0.8)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <GSAPTimeline
            autoPlay={true}
            startPosition={0}
            timeScale={0.8}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden" style={{ height: '500px', minWidth: '100%' }}>
              {/* Scrubber element - moves horizontally */}
              <div className="scrubber w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-lg absolute left-0 top-1/2 -translate-y-1/2 z-20 shadow-xl">
                <span>●</span>
              </div>

              {/* Mask element - scales from left to reveal content */}
              <div className="mask absolute top-0 left-0 w-full h-full bg-primary-200/80 origin-left z-10"></div>

              {/* Progress line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>

              {/* Mockup Data - Icon 1 (Quality Excellence) */}
              <div className="icon1 absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className={`w-20 h-20 ${timelineMockupData[0].iconBg} rounded-full flex items-center justify-center text-white text-3xl shadow-2xl border-4 border-white`}>
                  {timelineMockupData[0].icon}
                </div>
              </div>

              {/* Mockup Data - Text 1 */}
              <div className="text1 absolute top-1/2 left-1/4 -translate-x-1/2 translate-y-16 z-20">
                <div className="text-center bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <p className="text-xl font-bold text-gray-900">{timelineMockupData[0].label}</p>
                  <p className="text-sm text-gray-600 mt-1">{timelineMockupData[0].description}</p>
                </div>
              </div>

              {/* Mockup Data - Icon 2 (Innovation) */}
              <div className="icon2 absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className={`w-20 h-20 ${timelineMockupData[1].iconBg} rounded-full flex items-center justify-center text-white text-3xl shadow-2xl border-4 border-white`}>
                  {timelineMockupData[1].icon}
                </div>
              </div>

              {/* Mockup Data - Text 2 */}
              <div className="text2 absolute top-1/2 left-3/4 -translate-x-1/2 translate-y-16 z-20">
                <div className="text-center bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <p className="text-xl font-bold text-gray-900">{timelineMockupData[1].label}</p>
                  <p className="text-sm text-gray-600 mt-1">{timelineMockupData[1].description}</p>
                </div>
              </div>
            </div>
          </GSAPTimeline>

          <div className="mt-6 text-center space-y-2">
            <p className="text-gray-600">
              Timeline animation starts automatically from position 0.0s
            </p>
            <p className="text-sm text-gray-500">
              Use <code className="bg-gray-100 px-2 py-1 rounded">startPosition</code> prop to begin from a different point
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimationTest;
