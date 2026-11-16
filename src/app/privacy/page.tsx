import type { Metadata } from 'next';

import { CtaPanel, PageHeader, Value } from '@/components/ui';
import { TBD } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Hamrah handles your personal information.',
  robots: { index: false }, // until the real policy is written
};

/** Placeholder: the app stores need a real privacy policy written from Hamrah's actual data practices. */
export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy" lead="How Hamrah collects, uses and protects your information.">
        <p><Value v={TBD('Privacy policy to be written from our real data practices before launch')} /></p>
      </PageHeader>
      <CtaPanel />
    </>
  );
}
