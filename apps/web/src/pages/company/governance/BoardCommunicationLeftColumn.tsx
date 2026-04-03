import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

/** Same fill as the Governance `contact-board` section */
export const BOARD_COMMUNICATION_YELLOW_BG = "#FCD338";

/** Blue segment of `.corp-header-strip` in `index.css` — keep in sync */
export const CORP_HEADER_STRIP_BLUE = "#1c6fe3";

/** Single body scale for home investor aside (`compact` + `compactOnBlue`) */
const COMPACT_BLUE_COPY_SIZE =
  "text-2xl md:text-[1.5625rem] lg:text-[1.6875rem]";

const sectionTitleClassPage =
  "text-6xl sm:text-7xl lg:text-8xl font-bold text-black";

type BoardCommunicationLeftColumnProps = {
  /** `page`: yellow-band typography on Governance. `compact`: home investor aside. */
  variant?: "page" | "compact";
  /** Light text for `compact` on `CORP_HEADER_STRIP_BLUE` (e.g. home investor column). */
  compactOnBlue?: boolean;
};

/**
 * Left column from the Governance “Communicating with Our Board” section.
 * Shared with the home Investor Snapshot aside (compact).
 */
export function BoardCommunicationLeftColumn({
  variant = "page",
  compactOnBlue = false,
}: BoardCommunicationLeftColumnProps) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex flex-col",
          compactOnBlue ? "gap-7 sm:gap-8 md:gap-9" : "gap-3 sm:gap-3.5",
        )}
      >
        <h3
          className={cn(
            "font-heading font-semibold tracking-tight",
            compactOnBlue
              ? "text-[3.15rem] leading-tight text-white sm:text-[3.35rem] sm:leading-tight md:text-[3.65rem] md:leading-snug lg:text-[3.85rem] lg:leading-snug"
              : "text-base leading-snug text-black sm:text-lg",
          )}
        >
          Communicating with our Board
        </h3>
        <p
          className={cn(
            "leading-relaxed",
            compactOnBlue
              ? `${COMPACT_BLUE_COPY_SIZE} text-white`
              : "text-sm text-black sm:text-[0.9375rem]",
          )}
        >
          You may communicate with the full Board, the Audit Committee, the lead
          Independent Director, the other Non-Employee Directors, or any
          individual director as follows:
        </p>
        <div
          className={cn(
            compactOnBlue
              ? "text-white"
              : "text-sm text-black sm:text-[0.9375rem]",
          )}
        >
          <div
            className={cn(
              "flex flex-col",
              compactOnBlue ? "gap-2 sm:gap-2.5" : "gap-1 sm:gap-1.5",
            )}
          >
            <p
              className={cn(
                "m-0 leading-tight",
                compactOnBlue
                  ? `${COMPACT_BLUE_COPY_SIZE} font-semibold`
                  : "font-bold",
              )}
            >
              Kattali Textile Limited
            </p>
            <p
              className={cn(
                "m-0 leading-snug",
                compactOnBlue
                  ? `${COMPACT_BLUE_COPY_SIZE} font-medium`
                  : "font-bold",
              )}
            >
              BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad
            </p>
          </div>
          <a
            href="mailto:board@ktlbd.com"
            className={cn(
              "mt-4 inline-flex min-h-[48px] items-center font-bold underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 sm:mt-5 sm:min-h-[52px]",
              compactOnBlue
                ? COMPACT_BLUE_COPY_SIZE
                : "text-sm sm:text-[0.9375rem]",
              compactOnBlue
                ? "text-white hover:text-white/90 focus-visible:ring-white/35"
                : "text-black hover:text-neutral-700 focus-visible:ring-black/25",
            )}
          >
            board@ktlbd.com
          </a>
        </div>
        <p
          className={cn(
            "leading-normal",
            compactOnBlue
              ? `${COMPACT_BLUE_COPY_SIZE} text-white/90`
              : "text-[11px] text-black/80 sm:text-xs",
          )}
        >
          <Link
            to="/company/governance#contact-board"
            className={cn(
              "font-semibold underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2",
              compactOnBlue
                ? "text-inherit hover:text-white focus-visible:ring-white/35"
                : "text-black hover:text-neutral-800 focus-visible:ring-black/25",
            )}
          >
            Full policy on the Governance page
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center space-y-8">
      <h2 className={`${sectionTitleClassPage} leading-tight`}>
        Communicating
        <br />
        with Our Board
      </h2>

      <p className="max-w-xl text-2xl leading-relaxed text-black sm:text-3xl">
        You may communicate with the full Board, the Audit Committee, the lead
        Independent Director, the other Non-Employee Directors, or any
        individual director as follows:
      </p>

      <div className="text-2xl text-black sm:text-3xl">
        <div className="flex flex-col gap-1 sm:gap-1.5">
          <p className="m-0 font-bold leading-tight">Kattali Textile Limited</p>
          <p className="m-0 font-bold leading-snug">
            BM Heights, 8th Floor, 318 Sk. Mujib Road, Agrabad
          </p>
        </div>
        <a
          href="mailto:board@ktlbd.com"
          className="mt-8 block font-bold underline transition-colors hover:text-neutral-700 sm:mt-10"
        >
          board@ktlbd.com
        </a>
      </div>
    </div>
  );
}
