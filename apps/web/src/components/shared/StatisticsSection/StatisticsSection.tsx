import { motion } from 'framer-motion';
import { stats } from '../../../data/home/stats';
import AnimatedCounter from '../../animation/AnimatedCounter';

const StatisticsSection = () => {
    return (
        <section className="py-20 bg-primary-900 text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
                        >
                            <div className="mb-4 p-3 bg-primary-500/20 rounded-full text-primary-300">
                                <stat.icon className="w-8 h-8" />
                            </div>

                            <div className="text-4xl font-bold mb-2 flex items-center justify-center">
                                <AnimatedCounter
                                    to={stat.value}
                                    suffix={stat.suffix}
                                    duration={2}
                                    delay={0.2 + (index * 0.1)}
                                />
                            </div>

                            <h3 className="text-xl font-semibold mb-1 text-white/90">
                                {stat.label}
                            </h3>

                            <p className="text-sm text-white/60">
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
