import { FileText, Users } from 'lucide-react';
import SEO from '../../../components/seo/SEO';

const CompanyGovernance = () => {
  // KTL Board of Directors
  const directors = [
    { name: "Mr. Emdadul Hoque Chowdhury", title: "Chairman & Managing Director" },
    { name: "Ms. Fatema Begum", title: "Independent Director" },
    { name: "Mr. Abdul Karim", title: "Independent Director" },
    { name: "Ms. Nasreen Akter", title: "Non-Executive Director" },
    { name: "Mr. Mohammad Ali", title: "Executive Director" },
    { name: "Ms. Rahima Khatun", title: "Independent Director" },
    { name: "Mr. Hasan Ahmed", title: "Non-Executive Director" },
    { name: "Ms. Salma Begum", title: "Independent Director" },
    { name: "Mr. Kamal Uddin", title: "Executive Director" },
    { name: "Ms. Farida Parveen", title: "Independent Director" },
    { name: "Mr. Rashed Khan", title: "Non-Executive Director" },
    { name: "Ms. Taslima Akter", title: "Independent Director" },
    { name: "Mr. Nurul Islam", title: "Executive Director" },
  ];

  const committees = [
    {
      name: "Audit Committee",
      members: [
        { name: "Ms. Fatema Begum", role: "Chair" },
        { name: "Mr. Abdul Karim" },
        { name: "Ms. Rahima Khatun" },
        { name: "Mr. Hasan Ahmed" },
        { name: "Ms. Salma Begum" },
      ]
    },
    {
      name: "Compensation & Management Development Committee",
      members: [
        { name: "Ms. Nasreen Akter", role: "Chair" },
        { name: "Mr. Mohammad Ali" },
        { name: "Ms. Farida Parveen" },
        { name: "Mr. Kamal Uddin" },
        { name: "Ms. Taslima Akter" },
      ]
    },
    {
      name: "Nominating & Corporate Governance Committee",
      members: [
        { name: "Mr. Abdul Karim", role: "Chair" },
        { name: "Ms. Fatema Begum" },
        { name: "Mr. Rashed Khan" },
        { name: "Ms. Rahima Khatun" },
        { name: "Mr. Hasan Ahmed" },
        { name: "Ms. Salma Begum" },
      ]
    },
    {
      name: "Finance Committee",
      members: [
        { name: "Mr. Mohammad Ali", role: "Chair" },
        { name: "Ms. Fatema Begum" },
        { name: "Mr. Kamal Uddin" },
        { name: "Ms. Farida Parveen" },
        { name: "Mr. Nurul Islam" },
        { name: "Ms. Taslima Akter" },
      ]
    },
  ];

  const documents = [
    "KTL Corporate Governance Guidelines",
    "Board of Directors Charter",
    "Audit Committee Charter",
    "Compensation Committee Charter",
    "Nominating Committee Charter",
    "Finance Committee Charter",
    "Code of Business Conduct and Ethics",
    "Whistleblower Policy",
    "Anti-Corruption Policy",
    "Risk Management Framework",
    "Related Party Transactions Policy",
    "Director Independence Standards",
    "Board Communication Policy",
    "Annual Report 2024",
    "Sustainability Report 2024",
  ];

  return (
    <>
      <SEO
        title="Corporate Governance | Kattali Textile Ltd Board & Compliance"
        description="KTL's corporate governance framework ensures transparency, accountability, and ethical business practices. Learn about our board structure and compliance standards."
        canonical="/company/governance"
        keywords={['corporate governance', 'board of directors', 'compliance', 'transparency', 'KTL governance']}
      />
      <main className="min-h-screen bg-white">
      {/* Top Gradient Bar */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500"></div>

      {/* Hero Section - Macy's Style */}
      <section className="pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <div className="text-gray-600">
              <span>Company</span>
              <span className="mx-2">/</span>
              <span className="font-bold text-black">Governance</span>
            </div>
          </nav>

          {/* Main Heading with Decorative Elements */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-6xl md:text-7xl font-bold text-black mb-4">
                Governance
              </h1>
              <div className="w-48 h-3" style={{ backgroundColor: '#FCD338' }}></div>
            </div>
            {/* Decorative Wavy Lines */}
            <div className="hidden lg:block">
              <svg width="200" height="60" viewBox="0 0 200 60" fill="none">
                <path d="M10,30 Q30,10 50,30 T90,30 T130,30 T170,30" stroke="#FCD338" strokeWidth="2" fill="none"/>
                <path d="M10,40 Q30,20 50,40 T90,40 T130,40 T170,40" stroke="#FCD338" strokeWidth="2" fill="none"/>
                <path d="M10,50 Q30,30 50,50 T90,50 T130,50 T170,50" stroke="#FCD338" strokeWidth="2" fill="none"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors - Macy's Style */}
      <section id="board-of-directors" className="pt-20 pb-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-black">Board of Directors</h2>
          </div>

          {/* Directors Grid - 5 per row, 3 rows */}
          <div className="grid grid-cols-5 gap-8 mb-16">
            {directors.slice(0, 5).map((director) => (
              <div key={director.name} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <Users className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="font-bold text-lg text-black mb-2">{director.name}</h3>
                <p className="text-sm text-gray-700 leading-tight">{director.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-8 mb-16">
            {directors.slice(5, 10).map((director) => (
              <div key={director.name} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <Users className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="font-bold text-lg text-black mb-2">{director.name}</h3>
                <p className="text-sm text-gray-700 leading-tight">{director.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-8">
            {directors.slice(10, 13).map((director) => (
              <div key={director.name} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  <Users className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="font-bold text-lg text-black mb-2">{director.name}</h3>
                <p className="text-sm text-gray-700 leading-tight">{director.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Committees - Macy's Style */}
      <section id="board-committees" className="pt-20 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-black">Board Committees</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {committees.map((committee) => (
              <div key={committee.name} className="bg-white border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-gray-800 text-white p-4">
                  <h3 className="font-bold text-sm leading-tight">{committee.name}</h3>
                </div>
                <div className="p-4 bg-white">
                  <div className="space-y-2 mb-6">
                    {committee.members.map((member) => (
                      <div key={member.name}>
                        <div className="font-medium text-sm text-black">{member.name}</div>
                        {member.role && (
                          <div className="text-xs text-gray-600 ml-2">({member.role})</div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4">
                    <a
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                      title="PDF link placeholder - replace with actual PDF URL"
                    >
                      Download Charter PDF
                      <FileText className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Documents - Macy's Style */}
      <section id="governance-documents" className="pt-20 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-black">Governance Documents</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {documents.map((document) => (
              <a
                key={document}
                href="#"
                className="block p-4 bg-white border border-gray-200 hover:bg-gray-50 transition-colors rounded-lg"
                title="PDF link placeholder - replace with actual PDF URL"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <span className="font-medium text-sm text-black">{document}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center mr-2 bg-red-600 text-white rounded">
                      <span className="text-xs font-bold">PDF</span>
                    </div>
                    <span className="text-xs font-medium text-gray-600">PDF</span>
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
        <h2 className="text-6xl font-bold text-black leading-tight">
          Communicating<br />with Our Board
        </h2>

        <p className="text-lg text-black leading-relaxed max-w-xl">
          You may communicate with the full Board, the Audit Committee, the lead Independent Director,
          the other Non-Employee Directors, or any individual director as follows:
        </p>

         <div className="space-y-2 text-black text-lg">
           <p className="font-bold">Kattali Textile Limited</p>
           <p>BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad</p>
           <p>Chittagong, Bangladesh</p>
           <a
             href="mailto:board@ktlbd.com"
             className="underline font-medium hover:text-neutral-700 transition-colors"
           >
             board@ktlbd.com
           </a>
           <p className="text-sm">Phone: +880 1308 790475</p>
         </div>
      </div>

      {/* Right Column */}
      <div className="flex items-center">
        <p className="text-lg text-black leading-relaxed">
          Please indicate to whom the communications are addressed. All communications are reviewed
          by the Corporate Secretary’s Office and are forwarded to the appropriate Director(s) except
          those that are clearly unrelated to the duties and responsibilities of the Board or that are
          abusive, repetitive, in bad taste, or that present safety or security concerns. Communications
          relating to accounting, internal accounting controls, or auditing matters will be referred to
          the Audit Committee unless otherwise addressed. You may communicate anonymously and/or
          confidentially.
        </p>
      </div>
    </div>
  </div>
</section>
    </main>
    </>
  );
};

export default CompanyGovernance;
