import { COPY } from "@/content/site";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HelpNow } from "@/components/HelpNow";
import { Hero } from "@/components/Hero";
import { Join } from "@/components/Join";
import { Section } from "@/components/Section";
import { Steps } from "@/components/Steps";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="column">
          <Section id="who" title={COPY.whoFor.heading}>
            <p className="mt-3">{COPY.whoFor.body}</p>
          </Section>
          <Section id="how" title={COPY.howItWorks.heading}>
            <Steps />
          </Section>
          <Section id="not" title={COPY.whatItIsNot.heading}>
            <p className="mt-3">{COPY.whatItIsNot.body}</p>
          </Section>
          <HelpNow />
          <Section id="privacy" title={COPY.privacy.heading}>
            <p className="mt-3">{COPY.privacy.body}</p>
          </Section>
          <Section id="questions" title={COPY.faq.heading}>
            <Faq />
          </Section>
          <Join />
        </div>
      </main>
      <Footer />
    </>
  );
}
