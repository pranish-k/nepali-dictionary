import Header from '../components/Header';
import Footer from '../components/Footer';
import './Legal.css';

const Privacy = () => {
  return (
    <>
      <Header />
      <div className="legal-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: October 29, 2025</p>

        <section>
          <h2>Information We Collect</h2>
          <p>
            When you submit a word to Nepali Urban Dictionary, we collect the word name, meaning, and example sentence you provide. We also collect your IP address for spam prevention purposes.
          </p>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>The information we collect is used to:</p>
          <ul>
            <li>Display submitted words on our dictionary</li>
            <li>Prevent spam and abuse</li>
            <li>Improve our services</li>
            <li>Monitor site usage and analytics</li>
          </ul>
        </section>

        <section>
          <h2>Data Storage</h2>
          <p>
            All submitted words are stored in our database. Approved words are publicly visible. Pending and rejected submissions are only accessible to administrators.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            We may use cookies and similar technologies to enhance your browsing experience and for analytics purposes.
          </p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>
            We may use third-party services for analytics and advertising. These services may collect information about your use of our site.
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>
            You have the right to request removal of your submissions. Please contact us if you wish to have your content removed.
          </p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Continued use of the site after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            If you have questions about this privacy policy, please contact us through our website.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
