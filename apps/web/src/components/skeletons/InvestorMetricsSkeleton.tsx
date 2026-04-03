import React from "react";
import { Skeleton } from "../ui/Skeleton";

const InvestorMetricsSkeleton: React.FC = () => {
  return (
    <section
      className="metrics-section"
      aria-busy="true"
      aria-label="Loading investor snapshot"
    >
      <div className="metrics-accent-bar" />
      <div className="py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-[min(100%,1280px)] px-4 sm:px-6 lg:pl-0 lg:pr-8">
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:grid-rows-[minmax(44rem,1fr)] lg:items-stretch lg:gap-8 xl:gap-10 lg:min-h-[44rem] lg:content-stretch">
            <div className="investor-board-aside-bg order-2 grid min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_auto] self-stretch max-lg:min-h-[32rem] max-lg:-mx-4 max-lg:w-[calc(100%+2rem)] sm:max-lg:-mx-6 sm:max-lg:w-[calc(100%+3rem)] lg:order-none lg:mx-0 lg:w-auto lg:col-span-8 lg:h-full lg:min-h-full">
              <div className="min-h-0 space-y-4 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
                <Skeleton
                  variant="text"
                  height={42}
                  width="55%"
                  className="bg-white/20"
                />
                <Skeleton
                  variant="text"
                  height={24}
                  width="100%"
                  className="bg-white/20"
                />
                <Skeleton
                  variant="text"
                  height={22}
                  width="92%"
                  className="bg-white/20"
                />
              </div>
              <div className="space-y-3 border-t border-white/25 px-4 pb-4 pt-4 sm:px-6 sm:pb-6 sm:pt-5 md:px-8 md:pb-7 md:pt-6">
                <Skeleton
                  variant="text"
                  height={26}
                  width="50%"
                  className="bg-white/20"
                />
                <Skeleton
                  variant="text"
                  height={24}
                  width="40%"
                  className="bg-white/20"
                />
              </div>
            </div>
            <div className="order-1 flex min-h-0 min-w-0 flex-col self-stretch lg:order-none lg:col-span-4 lg:h-full lg:min-h-full">
              <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm">
                <div className="space-y-4 border-b border-neutral-100 px-5 py-5 sm:px-6 sm:py-6 md:px-8">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div className="space-y-2">
                      <Skeleton variant="text" height={22} width="45%" />
                      <Skeleton variant="text" height={44} width="55%" />
                      <Skeleton variant="text" height={14} width="40%" />
                    </div>
                    <div className="space-y-2 sm:text-right">
                      <Skeleton
                        variant="text"
                        height={50}
                        width={130}
                        className="sm:ml-auto"
                      />
                      <Skeleton
                        variant="text"
                        height={22}
                        width={110}
                        className="sm:ml-auto"
                      />
                      <Skeleton
                        variant="text"
                        height={14}
                        width={200}
                        className="sm:ml-auto"
                      />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 border-t border-neutral-100 pt-4 sm:mt-5">
                    <Skeleton variant="text" height={18} width="92%" />
                    <div className="flex flex-wrap gap-4">
                      <Skeleton variant="text" height={18} width={120} />
                      <Skeleton variant="text" height={18} width={160} />
                    </div>
                  </div>
                  <div className="relative mt-5 aspect-[4/1] w-full overflow-hidden rounded-lg border border-neutral-100 sm:mt-6">
                    <Skeleton
                      variant="rectangular"
                      height="100%"
                      width="100%"
                      className="absolute inset-0 h-full min-h-[80px] rounded-none"
                      aria-label="Loading chart placeholder"
                    />
                  </div>
                </div>
                <div className="shrink-0 px-5 pb-5 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
                  <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-neutral-200/90 bg-neutral-200/90 sm:grid-cols-2 md:grid-cols-4 md:items-stretch lg:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex h-full min-h-[5.25rem] min-w-0 flex-col bg-white px-4 py-4 sm:min-h-[5.75rem] sm:px-5 sm:py-5 md:min-h-[6rem] md:px-5 md:py-6 lg:px-5"
                      >
                        <div className="flex min-h-[2.75rem] items-end sm:min-h-[3rem]">
                          <Skeleton
                            variant="text"
                            height={16}
                            width={i === 4 ? "45%" : "40%"}
                          />
                        </div>
                        <div className="mt-auto min-w-0 space-y-2 pt-2">
                          <Skeleton
                            variant="text"
                            height={i === 4 ? 28 : 34}
                            width={i === 4 ? "85%" : "65%"}
                          />
                          {i === 4 ? (
                            <Skeleton variant="text" height={16} width="70%" />
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="metrics-bottom-rule" />
    </section>
  );
};

export default InvestorMetricsSkeleton;
