import { Container } from "@/components/ui/container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for MyATPS — how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="py-32 lg:py-40">
      <Container className="max-w-3xl">
        <h1 className="text-4xl lg:text-5xl font-semibold text-[#1b0c25] mb-4">
          Privacy Policy
        </h1>
        <p className="text-[#1b0c25]/60 mb-12">Last updated: April 6, 2026</p>

        <div className="flex flex-col gap-10 text-[#1b0c25] text-[16px] leading-[28px]">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p>
              MyATPS (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates
              the myatps.com website and the MyATPS platform. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>
                <strong>Account information:</strong> name, email address, and
                password when you create an account.
              </li>
              <li>
                <strong>Usage data:</strong> quiz results, study progress,
                bookmarks, and interaction data to provide and improve our
                services.
              </li>
              <li>
                <strong>Payment information:</strong> billing details processed
                securely through our third-party payment provider. We do not
                store your full card details.
              </li>
              <li>
                <strong>Technical data:</strong> IP address, browser type,
                device information, and cookies for analytics and service
                optimization.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>Provide, maintain, and improve our platform and services.</li>
              <li>
                Track your study progress and personalize your learning
                experience.
              </li>
              <li>Process payments and manage your subscription.</li>
              <li>
                Send you important updates about your account and our services.
              </li>
              <li>
                Analyze usage patterns to improve features and content quality.
              </li>
              <li>Ensure the security and integrity of our platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              4. Data Sharing
            </h2>
            <p>
              We do not sell your personal data. We may share information with
              trusted third-party service providers who assist us in operating
              our platform (hosting, payment processing, analytics), subject to
              strict confidentiality obligations. We may also disclose data if
              required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission over
              the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
            <p className="mb-3">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data.</li>
              <li>Object to or restrict the processing of your data.</li>
              <li>Request portability of your data.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:contact@myatps.com"
                className="underline font-medium"
              >
                contact@myatps.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Cookies</h2>
            <p>
              We use essential cookies to operate our platform and optional
              analytics cookies to understand how our services are used. You can
              manage your cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify
              you of any significant changes by posting the new policy on this
              page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:contact@myatps.com"
                className="underline font-medium"
              >
                contact@myatps.com
              </a>{" "}
              or through our{" "}
              <a href="/contact" className="underline font-medium">
                contact page
              </a>
              .
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
