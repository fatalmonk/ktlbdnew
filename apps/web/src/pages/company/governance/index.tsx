import { Suspense } from 'react';
import { createLazyIcon } from '@/lib/lucide-icons';

const Users = createLazyIcon('Users');
const FileText = createLazyIcon('FileText');
import SEO from '../../../components/seo/SEO';
import StructuredData from '../../../components/seo/StructuredData';
import SubpageHeader from '../../../components/shared/SubpageHeader';
import { createBreadcrumbSchema } from '../../../modules/seo/templates';

/** Shared section title scale: comfortable on mobile, aligned on lg+ desktop */
const sectionTitleClass = 'text-6xl sm:text-7xl lg:text-8xl font-bold text-black';

const CompanyGovernance = () => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Company', url: '/company/our-story' },
    { name: 'Governance', url: '/company/governance' },
  ];

  // KTL Board of Directors
  const directors = [
    { name: 'Mr. Emdadul Hoque Chowdhury', title: 'Chairman & Managing Director' },
    { name: 'Ms. Fatema Begum', title: 'Independent Director' },
    { name: 'Mr. Abdul Karim', title: 'Independent Director' },
    { name: 'Ms. Nasreen Akter', title: 'Non-Executive Director' },
    { name: 'Mr. Mohammad Ali', title: 'Executive Director' },
    { name: 'Ms. Rahima Khatun', title: 'Independent Director' },
    { name: 'Mr. Hasan Ahmed', title: 'Non-Executive Director' },
    { name: 'Ms. Salma Begum', title: 'Independent Director' },
    { name: 'Mr. Kamal Uddin', title: 'Executive Director' },
    { name: 'Ms. Farida Parveen', title: 'Independent Director' },
    { name: 'Mr. Rashed Khan', title: 'Non-Executive Director' },
    { name: 'Ms. Taslima Akter', title: 'Independent Director' },
    { name: 'Mr. Nurul Islam', title: 'Executive Director' },
  ];

  /** Four-column chart: black headers, Chair under name, charter PDF row (matches reference layout) */
  const committees = [
    {
      name: 'Audit Committee',
      charterHref: '#',
      members: [
        { name: 'Ms. Fatema Begum', role: 'Chair' },
        { name: 'Mr. Abdul Karim' },
        { name: 'Ms. Rahima Khatun' },
        { name: 'Mr. Hasan Ahmed' },
        { name: 'Ms. Salma Begum' },
      ],
    },
    {
      name: 'Compensation & Management Development Committee',
      charterHref: '#',
      members: [
        { name: 'Ms. Nasreen Akter', role: 'Chair' },
        { name: 'Mr. Mohammad Ali' },
        { name: 'Ms. Farida Parveen' },
        { name: 'Mr. Kamal Uddin' },
        { name: 'Ms. Taslima Akter' },
      ],
    },
    {
      name: 'Nominating & Corporate Governance Committee',
      charterHref: '#',
      members: [
        { name: 'Mr. Abdul Karim', role: 'Chair' },
        { name: 'Ms. Fatema Begum' },
        { name: 'Mr. Rashed Khan' },
        { name: 'Ms. Rahima Khatun' },
        { name: 'Mr. Hasan Ahmed' },
        { name: 'Ms. Salma Begum' },
      ],
    },
    {
      name: 'Finance Committee',
      charterHref: '#',
      members: [
        { name: 'Mr. Mohammad Ali', role: 'Chair' },
        { name: 'Ms. Fatema Begum' },
        { name: 'Mr. Kamal Uddin' },
        { name: 'Ms. Farida Parveen' },
        { name: 'Mr. Nurul Islam' },
        { name: 'Ms. Taslima Akter' },
      ],
    },
  ];

  const documents = [
    'KTL Corporate Governance Guidelines',
    'Board of Directors Charter',
    'Audit Committee Charter',
    'Compensation Committee Charter',
    'Nominating Committee Charter',
    'Finance Committee Charter',
    'Code of Business Conduct and Ethics',
    'Whistleblower Policy',
    'Anti-Corruption Policy',
    'Risk Management Framework',
    'Related Party Transactions Policy',
    'Director Independence Standards',
    'Board Communication Policy',
    'Annual Report 2024',
    'Sustainability Report 2024',
  ];

  return (
    <>
      <SEO
        title="Corporate Governance | Kattali Textile Ltd Board & Compliance"
        description="KTL's corporate governance framework ensures transparency, accountability, and ethical business practices. Learn about our board structure and compliance standards."
        canonical="/company/governance"
        keywords={[
          'corporate governance',
          'board of directors',
          'compliance',
          'transparency',
          'KTL governance',
        ]}
      />
      <StructuredData data={createBreadcrumbSchema(breadcrumbs)} />
      <SubpageHeader
        breadcrumbItems={[
          { label: 'Home', to: '/' },
          { label: 'Company', to: '/company/our-story' },
          { label: 'Governance' },
        ]}
        pageTitle="Governance"
      />
      <div className="min-h-screen bg-white">
        {/* Board of Directors - Macy's Style */}
        <section id="board-of-directors" className="pt-20 pb-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className={sectionTitleClass}>Board of Directors</h2>
            </div>

            {/* Directors Grid - 5 per row, 3 rows */}
            <div className="grid grid-cols-5 gap-8 mb-16">
              {directors.slice(0, 5).map((director) => (
                <div key={director.name} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-neutral-200 rounded-full flex items-center justify-center overflow-hidden">
                    <Suspense fallback={<div className="w-16 h-16" />}>
                      <Users className="w-16 h-16 text-neutral-400" />
                    </Suspense>
                  </div>
                  <h3 className="font-bold text-2xl lg:text-3xl text-black mb-2">
                    {director.name}
                  </h3>
                  <p className="text-lg lg:text-xl text-neutral-700 leading-snug">
                    {director.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-8 mb-16">
              {directors.slice(5, 10).map((director) => (
                <div key={director.name} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-neutral-200 rounded-full flex items-center justify-center overflow-hidden">
                    <Suspense fallback={<div className="w-16 h-16" />}>
                      <Users className="w-16 h-16 text-neutral-400" />
                    </Suspense>
                  </div>
                  <h3 className="font-bold text-2xl lg:text-3xl text-black mb-2">
                    {director.name}
                  </h3>
                  <p className="text-lg lg:text-xl text-neutral-700 leading-snug">
                    {director.title}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-8">
              {directors.slice(10, 13).map((director) => (
                <div key={director.name} className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-neutral-200 rounded-full flex items-center justify-center overflow-hidden">
                    <Suspense fallback={<div className="w-16 h-16" />}>
                      <Users className="w-16 h-16 text-neutral-400" />
                    </Suspense>
                  </div>
                  <h3 className="font-bold text-2xl lg:text-3xl text-black mb-2">
                    {director.name}
                  </h3>
                  <p className="text-lg lg:text-xl text-neutral-700 leading-snug">
                    {director.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Board Committees — full-width four-column chart (reference layout) */}
        <section id="board-committees" className="w-full pt-20 pb-16 bg-white">
          <div className="w-full max-w-none px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
            <h2 className="mb-10 text-2xl font-bold tracking-tight text-black sm:text-3xl lg:mb-12 lg:text-[25px] lg:leading-snug">
              Board Committees
            </h2>

            <div className="w-full border border-neutral-200 bg-white">
              <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-0">
                {committees.map((committee) => (
                  <div
                    key={committee.name}
                    className="flex min-h-0 min-w-0 flex-col bg-white lg:border-r lg:border-neutral-200 lg:last:border-r-0"
                  >
                    {/* Fixed equal height on lg+; title vertically centered, left-aligned */}
                    <div className="flex min-h-[6rem] items-center justify-start bg-black px-5 py-4 text-left text-white sm:min-h-[7rem] sm:py-5 lg:h-[15rem] lg:min-h-0 lg:px-8 lg:py-6">
                      <h3 className="w-full text-left font-normal leading-snug tracking-tight text-white text-2xl sm:text-3xl lg:text-[1.5rem] lg:leading-snug xl:text-[1.625rem]">
                        {committee.name}
                      </h3>
                    </div>
                    <div className="flex min-h-[46rem] flex-1 flex-col px-5 py-14 text-left sm:min-h-[50rem] sm:px-6 sm:py-16 lg:min-h-[52rem] lg:px-8 lg:py-16">
                      <ul className="flex-1 space-y-10 text-2xl font-normal leading-snug text-black sm:space-y-12 sm:text-3xl lg:space-y-12 lg:text-[1.625rem] lg:leading-relaxed xl:space-y-14 xl:text-[1.75rem]">
                        {committee.members.map((member) => (
                          <li key={`${committee.name}-${member.name}`}>
                            <span className="block">{member.name}</span>
                            {member.role === 'Chair' ? (
                              <span className="block text-xl font-normal leading-tight text-black sm:text-2xl lg:text-[1.375rem]">
                                Chair
                              </span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={committee.charterHref}
                        className="mt-8 flex items-center gap-3 border-t border-neutral-200 pt-8 text-2xl font-normal text-slate-600 transition-colors hover:text-slate-900 sm:text-3xl lg:mt-auto lg:pt-9 lg:text-[1.625rem] xl:text-[1.75rem]"
                        title="PDF link placeholder — replace with actual PDF URL"
                      >
                        <span className="leading-snug underline-offset-2 hover:underline">
                          Download Charter PDF
                        </span>
                        <Suspense
                          fallback={<span className="inline-block h-8 w-8 shrink-0" aria-hidden />}
                        >
                          <FileText
                            className="h-8 w-8 shrink-0 text-slate-500 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                            aria-hidden
                          />
                        </Suspense>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Governance Documents - Macy's Style */}
        <section id="governance-documents" className="pt-20 pb-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className={sectionTitleClass}>Governance Documents</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {documents.map((document) => (
                <a
                  key={document}
                  href="#"
                  className="block p-5 lg:p-6 bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors rounded-lg"
                  title="PDF link placeholder - replace with actual PDF URL"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <span className="font-medium text-xl lg:text-2xl text-black">{document}</span>
                    </div>
                    <div className="flex items-center shrink-0">
                      <div className="w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center mr-2 bg-red-600 text-white rounded">
                        <span className="text-base font-bold leading-none">PDF</span>
                      </div>
                      <span className="text-lg lg:text-xl font-medium text-neutral-600">PDF</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Board Communication - Macy's Style */}
        <section id="contact-board" className="py-24" style={{ backgroundColor: '#FCD338' }}>
          <div className="container mx-auto px-8 md:px-16">
            <div className="grid md:grid-cols-[3fr_2fr] gap-12">
              {/* Left Column */}
              <div className="flex flex-col justify-center space-y-8">
                <h2 className={`${sectionTitleClass} leading-tight`}>
                  Communicating
                  <br />
                  with Our Board
                </h2>

                <p className="text-2xl sm:text-3xl text-black leading-relaxed max-w-xl">
                  You may communicate with the full Board, the Audit Committee, the lead Independent
                  Director, the other Non-Employee Directors, or any individual director as follows:
                </p>

                <div className="text-black text-2xl sm:text-3xl">
                  <div className="flex flex-col gap-1 sm:gap-1.5">
                    <p className="m-0 font-bold leading-tight">Kattali Textile Limited</p>
                    <p className="m-0 font-bold leading-snug">
                      BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad
                    </p>
                  </div>
                  <a
                    href="mailto:board@ktlbd.com"
                    className="mt-8 block font-bold underline hover:text-neutral-700 transition-colors sm:mt-10"
                  >
                    board@ktlbd.com
                  </a>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex items-center">
                <p className="text-2xl sm:text-3xl text-black leading-relaxed">
                  Please indicate to whom the communications are addressed. All communications are
                  reviewed by the Corporate Secretary’s Office and are forwarded to the appropriate
                  Director(s) except those that are clearly unrelated to the duties and
                  responsibilities of the Board or that are abusive, repetitive, in bad taste, or
                  that present safety or security concerns. Communications relating to accounting,
                  internal accounting controls, or auditing matters will be referred to the Audit
                  Committee unless otherwise addressed. You may communicate anonymously and/or
                  confidentially.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CompanyGovernance;
