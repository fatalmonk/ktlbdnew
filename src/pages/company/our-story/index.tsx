import React from 'react';
import ResponsiveImage from '../../../components/ResponsiveImage';
import { Target, Eye, Users2, MapPin, Calendar, Award } from 'lucide-react';
import SEO from '../../../components/SEO';

const CompanyOurStory = () => {
  const leadership = [
    {
      name: 'Nasreen Haque',
      position: 'Chairman & Founder',
      description:
        'Visionary leader with 20+ years of experience in textile industry development and strategic planning. Under her leadership, Kattali Textile has grown from a small startup to a major international manufacturer.',
      image: './assets/designer-1.jpg',
      achievements: [
        'Founded Kattali Textile in 2002',
        'Led company to international markets',
        'Champion of sustainable manufacturing',
      ],
    },
    {
      name: 'Md. Emdadul Hoque Chowdhury',
      position: 'Managing Director',
      description:
        'Operations expert focused on sustainable manufacturing and international market expansion. Responsible for day-to-day operations and strategic partnerships with global brands.',
      image: './assets/designer-2.jpg',
      achievements: [
        'Overseeing 1,200+ employees',
        'Managing 680+ production machines',
        'Leading sustainability initiatives',
      ],
    },
    {
      name: 'Sarah Ahmed',
      position: 'Head of Design & Innovation',
      description:
        'Creative director with expertise in contemporary fashion trends and sustainable design practices. Leads our design studio in creating innovative products for global markets.',
      image: './assets/hero.jpg',
      achievements: [
        '15+ years in fashion design',
        'Expert in sustainable materials',
        'International design awards',
      ],
    },
  ];

  const milestones = [
    {
      year: '2002',
      event: 'Company established in Chittagong',
      description: 'Founded with a vision to become a leading textile manufacturer in Bangladesh',
      icon: Calendar,
    },
    {
      year: '2006',
      event: 'First international export shipment',
      description: 'Began exporting to European markets, establishing global presence',
      icon: MapPin,
    },
    {
      year: '2010',
      event: 'Sedex certification achieved',
      description:
        'Obtained ethical trade certification, demonstrating commitment to responsible business',
      icon: Award,
    },
    {
      year: '2014',
      event: 'Green factory initiatives launched',
      description: 'Implemented sustainable manufacturing practices and eco-friendly processes',
      icon: Target,
    },
    {
      year: '2018',
      event: 'Production capacity reached 360,000 dozen/year',
      description: 'Significant expansion of manufacturing capabilities and workforce',
      icon: Users2,
    },
    {
      year: '2024',
      event: 'Celebrating 22 years of excellence',
      description: 'Over two decades of innovation, growth, and commitment to quality',
      icon: Eye,
    },
  ];

  return (
    <>
      <SEO
        title="About Kattali Textile Ltd | Three Decades of Garment Manufacturing Excellence"
        description="Learn about Kattali Textile Ltd's journey as one of Bangladesh's trusted RMG manufacturers. From humble beginnings to a publicly listed company serving top global apparel brands."
        canonical="/company/our-story"
        keywords={['KTL history', 'Bangladesh textile company', 'garment manufacturer story']}
      />
      <div>
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-r from-black/70 to-black/50 flex items-center bg-cover bg-center bg-hero-about">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-white mb-6">
                Our <span className="text-primary">Story</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Two decades of excellence in textile manufacturing and global export operations
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-heading text-4xl font-bold mb-8 text-gray-900">
                  Our <span className="text-primary">Journey</span>
                </h2>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Established in 2002, Kattali Textile Ltd is a Chittagong-based garment
                    manufacturer specializing in woven and knitwear exports. Over the past two
                    decades, we have built a reputation for delivering premium quality textiles to
                    global markets.
                  </p>
                  <p>
                    Our commitment to excellence, sustainable practices, and ethical manufacturing has
                    made us a trusted partner for international brands seeking reliable textile
                    sourcing from Bangladesh.
                  </p>
                  <p>
                    With state-of-the-art manufacturing facilities, skilled workforce, and
                    comprehensive quality control systems, we ensure every product meets the highest
                    international standards.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="font-heading text-2xl font-bold text-gray-900">22+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="font-heading text-2xl font-bold text-gray-900">3+</div>
                    <div className="text-sm text-gray-600">Certifications</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <ResponsiveImage
                  src="designer-1.jpg"
                  alt="Textile manufacturing"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To deliver excellence through sustainable and ethical garment manufacturing,
                  providing our global partners with premium quality textiles while maintaining the
                  highest standards of environmental and social responsibility.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To become a globally respected textile brand from Bangladesh, recognized for
                  innovation, quality, and sustainable practices, while contributing to the economic
                  development of our community and country.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-4xl font-bold text-center mb-16 text-gray-900">
              Our <span className="text-primary">Leadership</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {leadership.map((leader, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <ResponsiveImage
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                      fit="cover"
                      sizes="(min-width:768px) 33vw, 100vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold mb-2 text-gray-900">
                      {leader.name}
                    </h3>
                    <h4 className="text-primary font-semibold mb-4">{leader.position}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{leader.description}</p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-gray-900 text-sm">Key Achievements:</h5>
                      {leader.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-gray-600 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-4xl font-bold text-center mb-16 text-gray-900">
              Our <span className="text-primary">Timeline</span>
            </h2>
            <div className="max-w-5xl mx-auto">
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-8">
                    <div className="flex-shrink-0 w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg">
                      <milestone.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg flex-grow border-l-4 border-primary">
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="font-heading font-bold text-primary text-2xl">
                          {milestone.year}
                        </span>
                        <div className="h-px bg-gray-200 flex-grow"></div>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                        {milestone.event}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-heading text-4xl font-bold mb-8 text-gray-900">
                  Our <span className="text-primary">Location</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        Head Office & Factory
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        BM Heights, 8th Floor
                        <br />
                        318 Sk. Mujib Road, Agrabad
                        <br />
                        Chittagong, Bangladesh
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Strategically located in Chittagong, Bangladesh's commercial capital and largest
                    port city, our facilities provide excellent access to international shipping
                    routes and supply chains.
                  </p>
                </div>
              </div>
              <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg">Interactive Map</p>
                  <p className="text-sm">Chittagong, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CompanyOurStory;
