import { Calendar, Globe, Award, Leaf } from 'lucide-react';

const TrustBar = () => (
  <section className="bg-white py-8 border-y border-neutral-200">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Calendar className="text-blue-600" size={32} />
          </div>
          <div className="text-3xl font-bold text-neutral-900">20+</div>
          <div className="text-sm text-neutral-600 mt-1">Years in Business</div>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Globe className="text-blue-600" size={32} />
          </div>
          <div className="text-3xl font-bold text-neutral-900">500+</div>
          <div className="text-sm text-neutral-600 mt-1">Global Clients</div>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Award className="text-blue-600" size={32} />
          </div>
          <div className="text-3xl font-bold text-neutral-900">10+</div>
          <div className="text-sm text-neutral-600 mt-1">Certifications</div>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Leaf className="text-green-600" size={32} />
          </div>
          <div className="text-3xl font-bold text-neutral-900">62%</div>
          <div className="text-sm text-neutral-600 mt-1">Sustainable Products</div>
        </div>
      </div>
    </div>
  </section>
);

export default TrustBar;


