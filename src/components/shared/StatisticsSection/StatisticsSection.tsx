import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Settings, Package, LucideIcon } from 'lucide-react';
import AnimatedCounter from '../../animation/AnimatedCounter';
import { useScrollTrigger } from '../../../hooks/animations/useScrollTrigger';

interface Stat {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
  description: string;
  color?: string;
}

interface StatisticsSectionProps {
  stats?: Stat[];
  title?: string;
  subtitle?: string;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  stats,
  title = 'Why Choose Kattali Textile Limited',
  subtitle = 'Numbers that speak for our excellence'
}) => {
  const { ref, controls } = useScrollTrigger({ threshold: 0.2 });

  const defaultStats: Stat[] = [
    {
      icon: Calendar,
      value: 20,
      suffix: '+',
      label: 'Years of Excellence',
      description: 'Established since 2002',
      color: 'from-primary-400 to-primary-600'
    },
    {
      icon: Users,
      value: 1200,
      suffix: '+',
      label: 'Skilled Employees',
      description: 'Dedicated professionals',
      color: 'from-tertiary-400 to-tertiary-600'
    },
    {
      icon: Settings,
      value: 680,
      suffix: '+',
      label: 'Advanced Machines',
      description: 'State-of-the-art equipment',
      color: 'from-secondary-400 to-secondary-600'
    },
    {
      icon: Package,
      value: 360,
      suffix: 'K+',
      label: 'Annual Production',
      description: 'Dozen capacity',
      color: 'from-primary-300 to-primary-500'
    }
  ];

  const displayStats = stats || defaultStats;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {title.split(' ').map((word, i) => (
              <span key={i} className={i === title.split(' ').length - 1 ? 'text-primary-500' : ''}>
                {word}{' '}
              </span>
            ))}
          </h2>
          <p className="text-xl text-gray-600">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {displayStats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              {/* Animated glow background on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl bg-gradient-to-r ${stat.color || 'from-primary-500 to-primary-600'}`}
              />

              <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Icon with animated background and rotation */}
                <div className="relative mb-6">
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${stat.color || 'from-primary-500 to-primary-600'} rounded-2xl flex items-center justify-center mx-auto`}
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                  >
                    <stat.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Floating particle effects */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-3 h-3 bg-primary-400 rounded-full"
                    animate={{
                      y: [-8, 8, -8],
                      x: [-8, 8, -8],
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary-300 rounded-full"
                    animate={{
                      y: [5, -5, 5],
                      x: [5, -5, 5],
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 0.9, 0.4]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                </div>

                {/* Animated Counter */}
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-gray-800">
                    <AnimatedCounter
                      to={stat.value}
                      suffix={stat.suffix}
                      duration={2}
                      delay={index * 0.1}
                    />
                  </div>
                </div>

                {/* Label and Description */}
                <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
                  {stat.label}
                </h3>
                <p className="text-gray-500 text-center text-sm">
                  {stat.description}
                </p>

                {/* Animated progress bar */}
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
                    className={`h-full bg-gradient-to-r ${stat.color || 'from-primary-400 to-primary-600'}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: index * 0.1 + 0.7,
                      duration: 1.5
                    }}
                    style={{ transformOrigin: 'left' }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsSection;
