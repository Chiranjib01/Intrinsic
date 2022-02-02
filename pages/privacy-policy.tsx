import Meta from '../components/Meta';
import { APP_NAME } from '../utils/constants';
import privacyPolicy from '../utils/privacyPolicy';

const About = () => {
  return (
    <div className="w-full">
      <Meta title={`${APP_NAME} - Privacy Policy`} />
      <div className="max-w-2xl mx-auto h-full bg-white border-x border-x-gray-400 pb-8">
        <div className="pt-4 pb-2 px-2 text-2xl mob:text-3xl capitalize border-b-4 border-blue-500 font-light">
          Privacy Policy
        </div>
        <section className="bg-white px-2 py-4 space-y-5 font-serif">
          <p className="pointer-events-none">
            We are committed to protecting the privacy of the users ("you" /
            "your" / "yourself") of its website / software applications offered
            by Network18 (collectively, "Applications") and has provided this
            privacy policy ("Policy") to familiarize you with the manner in
            which We use and disclose your information collected through the
            Applications. The terms of the Policy provided herein govern your
            use of any and all of the Applications and the information
            accessible on or from these Applications. The Policy also lays down
            how we may collect, use and share any information you provide.
            Network18 reserves the right, at its discretion, to change, modify,
            add or remove portions of this Policy at any time. We recommend that
            you review this Policy periodically to ensure that you are aware of
            the current privacy practices. This Policy shall be construed as
            provided in compliance with Information Technology Act, 2000 as
            amended and read with the Information Technology (Reasonable
            Security Practices and Procedures and Sensitive Personal Data or
            Information) Rules, 2011.
          </p>
          {privacyPolicy.map((policy) => (
            <p key={policy.id}>
              <span className="block text-red-500 font-semibold capitalize">
                {policy.title}
              </span>
              {policy.body}
            </p>
          ))}
        </section>
      </div>
    </div>
  );
};
export default About;
