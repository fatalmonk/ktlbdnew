import Image from '../../../components/media/Image';
import IntroHighlightHero, { MarkerText } from '../../../components/company/IntroHighlightHero';
import TimelineCarouselSection, {
  type TimelineCarouselItem,
} from '../../../components/company/TimelineCarouselSection';
import { Target, Eye } from 'lucide-react';
import SEO from '../../../components/seo/SEO';
import StructuredData from '../../../components/seo/StructuredData';
import { createBreadcrumbSchema } from '../../../modules/seo/templates';
import heroSustainability1x from '@/assets/images/hero/hero-sustainability@1x.webp';
import heroGlobal1x from '@/assets/images/hero/hero-global@1x.webp';
import heroMain1x from '@/assets/images/hero/hero-main@1x.webp';
import StoreLocatorPlus from '../../../components/features/StoreLocatorPlus';

const CompanyOurStory = () => {
  /** Name, title, and portrait — editorial grid (name + title only under photo). */
  const leadership = [
    {
      name: 'Nasreen Haque',
      position: 'Chairman & Founder',
      image: '/assets/leadership/leadership-nasreen-haque.png',
    },
    {
      name: 'Md. Emdadul Hoque Chowdhury',
      position: 'Managing Director',
      image: '/assets/leadership/leadership-emdadul-hoque.png',
    },
    {
      name: 'Mohammed Anwarul Haque Ishad',
      position: 'DMD',
      image: '/assets/leadership/leadership-ishad.png',
    },
    {
      name: 'Mohammed Anwar Alvi',
      position: 'Execurive Director',
      image: '/assets/leadership/leadership-anwar-alvi.png',
    },
    {
      name: 'MR. Mizanur Rahman',
      position: 'Chief Financial Officer',
      image: '/assets/leadership/leadership-mizanur-rahman.png',
    },
    {
      name: 'Mr. Barkat Ullah',
      position: 'Company Secretary',
      image: '/assets/leadership/leadership-barkat-ullah.png',
    },
    {
      name: 'Mr. Ashraful Ahsan Chowdhury',
      position: 'Head of Human Resources & Compliance',
      image: '/assets/leadership/leadership-ashraful-ahsan-chowdhury.png',
    },
    {
      name: 'Zahed Iqbal',
      position: 'Quality & Assurance Manager',
      image: '/assets/leadership/leadership-arif-khan.png',
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

  const introSlides = [{ src: heroMain1x, alt: 'Kattali Textile manufacturing operations' }];

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
          headlineMobileSlot={
            <>
              <span className="block">Welcome to the Home</span>
              <span className="block">
                <MarkerText>of Quality Manufacturing</MarkerText>
              </span>
            </>
          }
          slides={introSlides}
          sliderAriaLabel="Our story introduction images"
        />

        {/* Company Overview */}
        <section className="pt-8 pb-20 sm:pt-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-4 items-center">
              <div>
                <p className="text-[#000000] text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.1] md:leading-tight">
                  We are a leading garment manufacturer, and through our trusted facilities in
                  Chittagong,{' '}
                  <strong className="font-bold">
                    we help global apparel brands deliver quality products to their customers
                  </strong>{' '}
                  — combining precision manufacturing, sustainable practices, and reliable
                  partnerships to bring every collection to life.
                </p>
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
        <section className="border-t border-neutral-200/80 bg-neutral-50 py-16 md:py-24">
          <div className="mx-auto max-w-ktl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <article className="flex flex-col rounded-2xl border border-neutral-200/90 border-l-4 border-l-primary-500 bg-white p-8 pl-7 shadow-sm ring-1 ring-neutral-100 sm:pl-8 md:p-10 md:pl-10 lg:p-12 lg:pl-12">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-500/20 text-primary-900"
                    aria-hidden
                  >
                    <Target className="h-8 w-8" strokeWidth={2} />
                  </div>
                  <h3 className="font-heading text-4xl font-bold tracking-tight text-black md:text-5xl lg:text-[2.75rem] lg:leading-[1.1] xl:text-[3rem]">
                    Our <span className="text-primary-500">Mission</span>
                  </h3>
                </div>
                <p className="mt-8 text-2xl font-medium leading-relaxed text-neutral-900 md:text-3xl md:leading-snug">
                  To deliver excellence through sustainable and ethical garment manufacturing,
                  providing our global partners with premium quality textiles while maintaining the
                  highest standards of environmental and social responsibility.
                </p>
              </article>
              <article className="flex flex-col rounded-2xl border border-neutral-200/90 border-l-4 border-l-primary-500 bg-white p-8 pl-7 shadow-sm ring-1 ring-neutral-100 sm:pl-8 md:p-10 md:pl-10 lg:p-12 lg:pl-12">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-500/20 text-primary-900"
                    aria-hidden
                  >
                    <Eye className="h-8 w-8" strokeWidth={2} />
                  </div>
                  <h3 className="font-heading text-4xl font-bold tracking-tight text-black md:text-5xl lg:text-[2.75rem] lg:leading-[1.1] xl:text-[3rem]">
                    Our <span className="text-primary-500">Vision</span>
                  </h3>
                </div>
                <p className="mt-8 text-2xl font-medium leading-relaxed text-neutral-900 md:text-3xl md:leading-snug">
                  To become a globally respected textile brand from Bangladesh, recognized for
                  innovation, quality, and sustainable practices, while contributing to the economic
                  development of our community and country.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Leadership — editorial grid: asymmetric image frame, name + title only */}
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-ktl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-black md:text-4xl">
              Leadership Team
            </h2>
            <ul className="mt-10 grid list-none grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4 lg:gap-x-10">
              {leadership.map((leader) => (
                <li key={leader.name} className="text-left">
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-tl-xl rounded-br-xl rounded-bl-xl rounded-tr-[2.5rem] sm:rounded-tr-[3rem]">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      className="absolute inset-0 h-full w-full object-cover object-[center_22%] scale-[1.18] origin-center"
                      fit="cover"
                      sizes="(min-width:1024px) 22vw, (min-width:768px) 28vw, 42vw"
                    />
                  </div>
                  <p className="mt-4 text-base font-bold leading-tight text-black">{leader.name}</p>
                  <p className="mt-1 text-sm font-normal leading-snug text-neutral-900">
                    {leader.position}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Location map — Locator Plus (Extended Component Library); embed iframe if no API key */}
        <section
          className="border-t border-neutral-200/80 bg-neutral-50 py-16 md:py-20"
          aria-labelledby="our-story-map-heading"
        >
          <div className="container mx-auto px-4">
            <h2
              id="our-story-map-heading"
              className="font-heading text-3xl font-bold tracking-tight text-black md:text-4xl"
            >
              Our locations
            </h2>
            <div className="mt-8">
              <StoreLocatorPlus title="Kattali Textile — production facility and head office map" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CompanyOurStory;
