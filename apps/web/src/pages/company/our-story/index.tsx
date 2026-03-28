import { Link } from 'react-router-dom';
import Image from '../../../components/media/Image';
import IntroHighlightHero from '../../../components/company/IntroHighlightHero';
import TimelineCarouselSection, {
  type TimelineCarouselItem,
} from '../../../components/company/TimelineCarouselSection';
import { Target, Eye, MapPin, Calendar, Award } from 'lucide-react';
import SEO from '../../../components/seo/SEO';
import StructuredData from '../../../components/seo/StructuredData';
import { createBreadcrumbSchema } from '../../../modules/seo/templates';
import heroSustainability1x from '@/assets/images/hero/hero-sustainability@1x.webp';
import heroGlobal1x from '@/assets/images/hero/hero-global@1x.webp';
import heroMain1x from '@/assets/images/hero/hero-main@1x.webp';

const CompanyOurStory = () => {
  const leadership = [
    {
      name: 'Nasreen Haque',
      position: 'Chairman & Founder',
      description:
        'Visionary leader with 20+ years of experience in textile industry development and strategic planning. Under her leadership, Kattali Textile has grown from a small startup to a major international manufacturer.',
      image: heroSustainability1x,
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
      image: heroGlobal1x,
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
      image: heroMain1x,
      achievements: [
        '15+ years in fashion design',
        'Expert in sustainable materials',
        'International design awards',
      ],
    },
  ];

  const timelineCarouselItems: TimelineCarouselItem[] = [
    {
      year: '2002',
      title: 'Kattali Textile',
      description:
        'Company established in Chittagong with a vision to become a leading textile manufacturer in Bangladesh.',
      imageSrc: heroMain1x,
      imageAlt: 'Kattali Textile manufacturing floor',
    },
    {
      year: '2006',
      title: 'Global reach',
      description:
        'First international export shipment—beginning long-term partnerships with European and global buyers.',
    },
    {
      year: '2010',
      title: 'Responsible business',
      description:
        'Sedex certification achieved, demonstrating commitment to ethical trade and transparent supply chains.',
      imageSrc: heroSustainability1x,
      imageAlt: 'Sustainable textile operations',
    },
    {
      year: '2014',
      title: 'Green manufacturing',
      description:
        'Green factory initiatives launched with sustainable processes and reduced environmental impact.',
    },
    {
      year: '2018',
      title: 'Scale & capacity',
      description:
        'Production capacity reached 360,000 dozen per year with expanded facilities and workforce.',
      imageSrc: heroGlobal1x,
      imageAlt: 'Global garment production',
    },
    {
      year: '2024',
      title: 'Kattali Textile Ltd',
      description:
        'Over two decades of innovation, growth, and commitment to quality for international partners.',
    },
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Company', url: '/company' },
    { name: 'Our Story', url: '/company/our-story' },
  ];

  const introSlides = [
    { src: heroMain1x, alt: 'Kattali Textile manufacturing operations' },
    { src: heroGlobal1x, alt: 'Global garment manufacturing and export' },
    { src: heroSustainability1x, alt: 'Sustainable textile production' },
  ];

  return (
    <>
      <SEO
        title="About Kattali Textile Ltd | Three Decades of Garment Manufacturing Excellence"
        description="Learn about Kattali Textile Ltd's journey as one of Bangladesh's trusted RMG manufacturers. From humble beginnings to a publicly listed company serving top global apparel brands."
        canonical="/company/our-story"
        keywords={['KTL history', 'Bangladesh textile company', 'garment manufacturer story']}
      />
      <StructuredData data={createBreadcrumbSchema(breadcrumbs)} />
      <div>
        <IntroHighlightHero
          breadcrumbItems={[
            { label: 'Home', to: '/' },
            { label: 'Company' },
            { label: 'Our Story' },
          ]}
          pageTitle="Our Story"
          headlineLines={[
            { text: 'Welcome to the' },
            { text: 'Home of Quality', highlight: true },
            { text: 'Manufacturing', highlight: true },
          ]}
          slides={introSlides}
          sliderAriaLabel="Our story introduction images"
        />

        {/* Company Overview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-heading text-4xl font-bold mb-8 text-neutral-900">
                  Our <span className="text-primary">Journey</span>
                </h2>
                <div className="space-y-6 text-neutral-700 text-lg leading-relaxed">
                  <p>
                    Established in 2002, Kattali Textile Ltd is a Chittagong-based garment
                    manufacturer specializing in <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium underline">woven and knitwear products</Link>. Over the past two
                    decades, we have built a reputation for delivering premium quality textiles to
                    global markets.
                  </p>
                  <p>
                    Our commitment to excellence, <Link to="/company/sustainability" className="text-primary-600 hover:text-primary-700 font-medium underline">sustainable practices</Link>, and ethical manufacturing has
                    made us a trusted partner for international brands seeking reliable textile
                    sourcing from Bangladesh. Learn more about our <Link to="/company/leadership" className="text-primary-600 hover:text-primary-700 font-medium underline">experienced leadership team</Link> and 
                    <Link to="/company/governance" className="text-primary-600 hover:text-primary-700 font-medium underline"> corporate governance</Link> practices.
                  </p>
                  <p>
                    With <Link to="/facilities/rmg" className="text-primary-600 hover:text-primary-700 font-medium underline">state-of-the-art manufacturing facilities</Link>, skilled workforce, and
                    comprehensive quality control systems, we ensure every product meets the highest
                    international standards.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="font-heading text-2xl font-bold text-neutral-900">22+</div>
                    <div className="text-sm text-neutral-600">Years Experience</div>
                  </div>
                  <div className="text-center p-4 bg-neutral-50 rounded-lg">
                    <Award className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="font-heading text-2xl font-bold text-neutral-900">3+</div>
                    <div className="text-sm text-neutral-600">Certifications</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="designer-1.jpg"
                  alt="Textile manufacturing"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                  width={800}
                  height={600}
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        <TimelineCarouselSection
          sectionTitle="Kattali Textile Ltd — Timeline"
          subtitle="From a dedicated local start-up to a trusted partner for global apparel brands"
          items={timelineCarouselItems}
        />

        {/* Mission & Vision */}
        <section className="py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4 text-neutral-900">Our Mission</h3>
                <p className="text-neutral-700 text-lg leading-relaxed">
                  To deliver excellence through sustainable and ethical garment manufacturing,
                  providing our global partners with premium quality textiles while maintaining the
                  highest standards of environmental and social responsibility.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4 text-neutral-900">Our Vision</h3>
                <p className="text-neutral-700 text-lg leading-relaxed">
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
            <h2 className="font-heading text-4xl font-bold text-center mb-16 text-neutral-900">
              Our <span className="text-primary">Leadership</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {leadership.map((leader, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                      fit="cover"
                      width={400}
                      height={400}
                      sizes="(min-width:768px) 33vw, 100vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold mb-2 text-neutral-900">
                      {leader.name}
                    </h3>
                    <h4 className="text-primary font-semibold mb-4">{leader.position}</h4>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">{leader.description}</p>
                    <div className="space-y-2">
                      <h5 className="font-semibold text-neutral-900 text-sm">Key Achievements:</h5>
                      {leader.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-neutral-600 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-heading text-4xl font-bold mb-8 text-neutral-900">
                  Our <span className="text-primary">Location</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-lg text-neutral-900 mb-2">
                        Head Office & Factory
                      </h3>
                      <p className="text-neutral-700 leading-relaxed">
                        BM Heights, 8th Floor
                        <br />
                        318 Sk. Mujib Road, Agrabad
                        <br />
                        Chittagong, Bangladesh
                      </p>
                    </div>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                    Strategically located in Chittagong, Bangladesh's commercial capital and largest
                    port city, our facilities provide excellent access to international shipping
                    routes and supply chains.
                  </p>
                </div>
              </div>
              <div className="bg-neutral-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center text-neutral-500">
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
