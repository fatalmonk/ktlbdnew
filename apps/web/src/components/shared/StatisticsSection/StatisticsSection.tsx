import { motion } from 'framer-motion';
import { stats } from '../../../data/home/stats';
import AnimatedCounter from '../../animation/AnimatedCounter';

const StatisticsSection = () => {
    return (
        <section className="overflow-hidden bg-neutral-50 py-16 text-neutral-900 md:py-24 lg:py-32">
            <div className="container mx-auto px-3 sm:px-4">
                <div className="grid grid-cols-2 gap-3 md:gap-8 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center rounded-lg border border-neutral-200 bg-white p-3 text-center shadow-sm transition-colors duration-300 hover:bg-neutral-50 sm:p-4 md:rounded-xl md:p-6"
                        >
                            <div className="mb-2 rounded-full bg-primary-500/15 p-2 text-primary-600 md:mb-6 md:p-4">
                                <stat.icon className="h-7 w-7 md:h-10 md:w-10" />
                            </div>

                            <div className="mb-1 flex items-center justify-center text-2xl font-bold tabular-nums sm:text-3xl md:mb-3 md:text-5xl lg:text-6xl">
                                <AnimatedCounter
                                    to={stat.value}
                                    suffix={stat.suffix}
                                    duration={2}
                                    delay={0.2 + (index * 0.1)}
                                />
                            </div>

                            <h3 className="mb-0.5 text-xs font-semibold leading-tight text-neutral-900 sm:text-sm md:mb-2 md:text-2xl lg:text-3xl">
                                {stat.label}
                            </h3>

                            <p className="text-xs leading-snug text-neutral-600 md:text-base lg:text-lg">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatisticsSection;
