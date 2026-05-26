import Image from "next/image";

const EGRA_LOGO_URL =
  "https://images.squarespace-cdn.com/content/v1/6793940d04b46514339ac95b/101b8127-4d01-4298-bf7c-cbc759ec1685/EGRA+Logo+White+BG.jpg";

export default function SiteHeader() {
  return (
    <header className="border-b border-egra-border bg-white">
      <div className="mx-auto flex max-w-page flex-col items-start gap-4 px-[4vw] py-6 sm:flex-row sm:items-center sm:gap-8 sm:py-8">
        <div className="flex shrink-0 items-center">
          <div
            className="relative flex h-[72px] w-[180px] items-center justify-center overflow-hidden rounded border border-dashed border-egra-border bg-white sm:h-[95px] sm:w-[220px]"
            aria-label="EGRA logo placeholder"
          >
            <Image
              src={EGRA_LOGO_URL}
              alt="East Greenwich Residents Association logo"
              width={220}
              height={95}
              className="h-full w-full object-contain object-left p-2"
              priority
            />
          </div>
        </div>
        <div className="min-w-0 flex-1 border-egra-border sm:border-l sm:pl-8">
          <h1 className="font-heading text-2xl font-bold leading-tight text-egra-dark sm:text-3xl">
            Planning Objection Generator
          </h1>
        </div>
      </div>
    </header>
  );
}
