import ObjectionForm from "@/components/ObjectionForm";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-egra-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content" className="page-container">
        <section
          className="mb-12 max-w-3xl"
          aria-labelledby="intro-heading"
        >
          <h2 id="intro-heading" className="sr-only">
            About this tool
          </h2>
          <p className="text-lg leading-loose text-egra-dark">
            Use this tool to create a{" "}
            <strong className="font-bold">unique, individual objection letter</strong>{" "}
            to planning application{" "}
            <strong className="font-bold">26/0726/F</strong> for a proposed 12-bed HMO
            at{" "}
            <strong className="font-bold">
              54–56 Ormiston Road, London SE10 0LN
            </strong>
            . The Royal Borough of Greenwich treats identical form letters and petitions as a
            single submission — personalised letters from individual residents are
            essential to protect our neighbourhood.
          </p>
        </section>

        <div className="max-w-3xl">
          <ObjectionForm />
        </div>
      </main>

      <footer className="border-t border-egra-border bg-white py-10">
        <div className="page-container !py-0 text-center text-sm leading-relaxed text-egra-muted">
          <p className="text-egra-dark">
            East Greenwich Residents Association — representing the community
            voice in the planning process.
          </p>
          <p className="mt-2">
            <a
              href="https://www.egra.london/"
              className="link-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.egra.london
            </a>
          </p>
          <p className="mt-2">
            Application reference: 26/0726/F · 54–56 Ormiston Road, SE10 0LN
          </p>
        </div>
      </footer>
    </>
  );
}
