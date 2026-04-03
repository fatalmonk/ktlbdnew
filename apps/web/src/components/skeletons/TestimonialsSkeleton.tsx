import React from "react";
import { Skeleton } from "../ui/Skeleton";

const TestimonialsSkeleton: React.FC = () => {
  return (
    <section className="py-8 md:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Header skeleton */}
        <div className="text-center mb-8 md:mb-12">
          <Skeleton
            variant="text"
            height={48}
            width="50%"
            className="mx-auto mb-2 md:mb-4"
            aria-label="Loading testimonials title"
          />
          <Skeleton
            variant="text"
            height={24}
            width="40%"
            className="mx-auto"
            aria-label="Loading testimonials subtitle"
          />
        </div>

        {/* Testimonials grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="bg-neutral-50 rounded-lg md:rounded-xl p-4 md:p-6 lg:p-6 shadow-md"
            >
              {/* Rating skeleton */}
              <div className="flex gap-1 mb-3 md:mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Skeleton
                    key={star}
                    variant="circular"
                    width={20}
                    height={20}
                    aria-label={`Loading rating star ${star}`}
                  />
                ))}
              </div>

              {/* Quote skeleton */}
              <div className="mb-3 md:mb-4">
                <Skeleton
                  variant="text"
                  height={20}
                  width="100%"
                  className="mb-2"
                  aria-label={`Loading testimonial ${index} quote line 1`}
                />
                <Skeleton
                  variant="text"
                  height={20}
                  width="95%"
                  className="mb-2"
                  aria-label={`Loading testimonial ${index} quote line 2`}
                />
                <Skeleton
                  variant="text"
                  height={20}
                  width="85%"
                  aria-label={`Loading testimonial ${index} quote line 3`}
                />
              </div>

              {/* Author info skeleton */}
              <div className="border-t pt-3 md:pt-4">
                <Skeleton
                  variant="text"
                  height={20}
                  width="60%"
                  className="mb-2"
                  aria-label={`Loading testimonial ${index} author`}
                />
                <Skeleton
                  variant="text"
                  height={16}
                  width="50%"
                  aria-label={`Loading testimonial ${index} position`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSkeleton;
