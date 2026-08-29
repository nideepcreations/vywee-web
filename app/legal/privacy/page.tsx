import { Container } from '@/components/layout/container';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Icon } from '@/components/ui/icon';
import { Heading, Text } from '@/components/ui/typography';
import { ROUTES } from '@/constants/routes';
import { SITE } from '@/constants/site';
import { createMetadata } from '@/lib/seo';

/**
 * Draft. Written to be accurate to what the site actually does today, but
 * not reviewed by a lawyer — the banner and `noIndex` both stay until that
 * review happens and a real decision is made about publishing it as final.
 * Update the body as the product changes (new data collected, new
 * providers, accounts, etc.) rather than letting it drift out of date.
 */
export const metadata = createMetadata({
  title: 'Privacy policy (draft)',
  path: ROUTES.privacy,
  description: 'What data this site collects, and what it does not. Draft, pending legal review.',
  noIndex: true,
});

const listClass = 'ml-5 list-disc space-y-2';

export default function PrivacyPage() {
  return (
    <PageWrapper
      eyebrow="Legal"
      title="Privacy policy"
      description="What data this site collects, and what it does not."
      size="prose"
    >
      <Container size="prose" className="flex flex-col gap-8 pt-8">
        <div className="flex items-start gap-3 rounded-lg border border-warning bg-warning-subtle p-4 md:p-5">
          <Icon name="warning" size="md" tone="warning" className="mt-0.5 shrink-0" />
          <div className="flex flex-col gap-1">
            <Text weight="semibold" className="text-warning-on-subtle">
              Draft — not yet reviewed or finalised
            </Text>
            <Text size="sm" className="text-warning-on-subtle">
              This describes what {SITE.name} does today, but has not had a legal review. Do not
              treat it as a binding statement of policy until that review is complete. Questions in
              the meantime: {SITE.contactEmail}.
            </Text>
          </div>
        </div>

        <Text size="sm" tone="muted">
          Draft prepared August 2026.
        </Text>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            1. What this covers
          </Heading>
          <Text leading="relaxed">
            This policy describes what happens to information when you use {SITE.name} — the
            research and comparison pages, the AI-assisted search, and the links that take you to
            retailers to actually buy something. {SITE.name} does not sell products directly; when
            you follow a link to a retailer, that retailer&rsquo;s own privacy policy applies to
            what happens next, not this one.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            2. Information we collect
          </Heading>
          <Text leading="relaxed" className="mb-3">
            {SITE.name} does not currently have user accounts, so there is no login, password, or
            profile data to speak of. What is collected today:
          </Text>
          <ul className={listClass}>
            <li>
              <Text as="span" leading="relaxed">
                <strong>Usage data</strong> — pages visited, search terms entered, and general
                technical information (browser type, approximate location from IP address, device
                type) collected automatically, as on almost any website.
              </Text>
            </li>
            <li>
              <Text as="span" leading="relaxed">
                <strong>Search queries</strong> — when the AI-assisted search feature is answering
                with a real language model rather than the built-in keyword matching, the text you
                type is sent to that provider to generate a response. See section 4.
              </Text>
            </li>
            <li>
              <Text as="span" leading="relaxed">
                <strong>Preferences</strong> — a light/dark theme choice, stored locally in your
                browser, not on a server.
              </Text>
            </li>
            <li>
              <Text as="span" leading="relaxed">
                <strong>Contact details you provide</strong> — if you email us directly, we keep
                that correspondence to respond to it.
              </Text>
            </li>
          </ul>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            3. Cookies and similar technology
          </Heading>
          <Text leading="relaxed">
            {SITE.name} uses a small amount of local storage to remember your theme preference. We
            do not currently run third-party advertising trackers. Affiliate links to retailers do
            carry a tracking parameter — this is how the retailer knows a purchase came from{' '}
            {SITE.name}, and it is covered in more detail in our affiliate disclosure.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            4. AI-assisted search
          </Heading>
          <Text leading="relaxed">
            When a real AI provider is configured, the text of your search query is sent to that
            provider to generate the summary you see. We do not send your name, location, or any
            other identifying information along with it — just the query text. When no provider is
            configured, search runs entirely on this site using a rule-based interpreter, and
            nothing is sent anywhere.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            5. What we do not do
          </Heading>
          <ul className={listClass}>
            <li>
              <Text as="span" leading="relaxed">
                We do not sell personal data to third parties.
              </Text>
            </li>
            <li>
              <Text as="span" leading="relaxed">
                We do not collect payment card details — purchases happen on the retailer&rsquo;s
                own site, not here.
              </Text>
            </li>
            <li>
              <Text as="span" leading="relaxed">
                We do not knowingly direct this site at, or collect data from, children under 18.
              </Text>
            </li>
          </ul>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            6. Your rights
          </Heading>
          <Text leading="relaxed">
            You can ask what information we hold about you, ask us to correct it, or ask us to
            delete it, by writing to {SITE.contactEmail}. Because {SITE.name} does not require
            accounts today, most of what we hold is not tied to an identifiable person in the first
            place — but where it is, this applies.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            7. Changes to this policy
          </Heading>
          <Text leading="relaxed">
            As the product changes — accounts, new data uses, new providers — this page will change
            with it, and the date at the top will update.
          </Text>
        </section>

        <section>
          <Heading as="h2" level="h3" className="mb-3">
            8. Contact
          </Heading>
          <Text leading="relaxed">Questions about this policy: {SITE.contactEmail}.</Text>
        </section>
      </Container>
    </PageWrapper>
  );
}
