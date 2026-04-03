import { Link } from 'react-router-dom';
import Image from '../../../components/media/Image';
import SEO from '../../../components/seo/SEO';
import SubpageHeader from '../../../components/shared/SubpageHeader';
const leadershipTeam = [
  {
    name: 'Nasreen Haque',
    title: 'Chairman & Founder',
    image: '/assets/leadership/leadership-nasreen-haque.png',
  },
  {
    name: 'Md. Emdadul Hoque Chowdhury',
    title: 'Managing Director',
    image: '/assets/leadership/leadership-emdadul-hoque.png',
  },
  {
    name: 'Sarah Ahmed',
    title: 'Head of Design & Innovation',
    image: '/assets/leadership/leadership-ishad.png',
  },
  {
    name: 'Kamal Ahmed',
    title: 'Chief Operating Officer',
    image: '/assets/leadership/leadership-anwar-alvi.png',
  },
  {
    name: 'Rashida Begum',
    title: 'Chief Financial Officer',
    image: '/assets/leadership/leadership-mizanur-rahman.png',
  },
  {
    name: 'Tanvir Mahmud',
    title: 'Head of Merchandising & Sales',
    image: '/assets/leadership/leadership-barkat-ullah.png',
  },
  {
    name: 'Nusrat Jahan',
    title: 'Head of Human Resources & Compliance',
    image: '/assets/leadership/leadership-ashraful-ahsan-chowdhury.png',
  },
] as const;

const CompanyLeadership = () => {
  return (
    <>
      <SEO
        title="Leadership Team | Kattali Textile Ltd Executive Management"
        description="Meet KTL's experienced leadership team driving success in Bangladesh's textile industry. From Chairman Nasreen Haque to our dedicated management team."
        canonical="/company/leadership"
        keywords={[
          'KTL leadership',
          'textile executives',
          'Bangladesh management team',
          'garment industry leaders',
        ]}
      />
      <SubpageHeader
        breadcrumbItems={[
          { label: 'Home', to: '/' },
          { label: 'Company', to: '/company/our-story' },
          { label: 'Leadership' },
        ]}
        pageTitle="Leadership"
      />
      <section className="bg-white text-[#000000]">
        <div className="mx-auto max-w-ktl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-black md:text-4xl">
            Leadership Team
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-800">
            Our leadership brings decades of experience in textile manufacturing and international
            trade. Explore{' '}
            <Link
              to="/company/our-story"
              className="text-primary-600 underline hover:text-primary-700"
            >
              our story
            </Link>
            ,{' '}
            <Link
              to="/company/governance"
              className="text-primary-600 underline hover:text-primary-700"
            >
              governance
            </Link>
            , and{' '}
            <Link
              to="/sustainability"
              className="text-primary-600 underline hover:text-primary-700"
            >
              sustainability
            </Link>
            .
          </p>

          <ul className="mt-12 grid list-none grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 md:grid-cols-3 md:gap-y-12 lg:grid-cols-4 lg:gap-x-10">
            {leadershipTeam.map((leader) => (
              <li key={leader.name} className="text-left">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-tl-xl rounded-br-xl rounded-bl-xl rounded-tr-[2.5rem] bg-neutral-100 sm:rounded-tr-[3rem]">
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
                  {leader.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default CompanyLeadership;
