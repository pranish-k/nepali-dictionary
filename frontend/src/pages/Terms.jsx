import Header from '../components/Header';
import Footer from '../components/Footer';
import './Legal.css';

const Terms = () => {
  return (
    <>
      <Header />
      <div className="legal-container">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: October 29, 2025</p>

        <section>
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using Nepali Urban Dictionary, you accept and agree to be bound by these Terms of Service.
          </p>
        </section>

        <section>
          <h2>User Conduct</h2>
          <p>When using our site, you agree to:</p>
          <ul>
            <li>Provide accurate and truthful definitions</li>
            <li>Not submit offensive, discriminatory, or illegal content</li>
            <li>Not spam or abuse the submission system</li>
            <li>Respect intellectual property rights</li>
            <li>Not attempt to hack or compromise the site</li>
          </ul>
        </section>

        <section>
          <h2>Content Guidelines</h2>
          <p>
            All submissions must be appropriate and relevant to Nepali urban slang and colloquial language. We reserve the right to reject or remove any content that violates our guidelines.
          </p>
        </section>

        <section>
          <h2>Content Ownership</h2>
          <p>
            By submitting content, you grant Nepali Urban Dictionary a non-exclusive, royalty-free license to use, display, and distribute your submissions on our platform.
          </p>
        </section>

        <section>
          <h2>Disclaimer</h2>
          <p>
            The content on this site is user-generated and for informational purposes only. We do not guarantee the accuracy or appropriateness of all definitions. Use at your own discretion.
          </p>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>
            Nepali Urban Dictionary and its operators are not liable for any damages arising from the use of this site or reliance on its content.
          </p>
        </section>

        <section>
          <h2>Account Termination</h2>
          <p>
            We reserve the right to ban users or remove content that violates these terms without prior notice.
          </p>
        </section>

        <section>
          <h2>Changes to Terms</h2>
          <p>
            We may modify these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2>Governing Law</h2>
          <p>
            These terms are governed by the laws of Nepal. Any disputes shall be resolved in the courts of Nepal.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Terms;
