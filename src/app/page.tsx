import { Contact } from '@/components/contact';
import { Faq } from '@/components/faq';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { Works } from '@/components/works';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Works />
      <Faq />
      <Contact />
    </>
  );
}
