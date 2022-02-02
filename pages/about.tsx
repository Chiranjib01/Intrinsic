import Meta from '../components/Meta';
import { APP_NAME } from '../utils/constants';

const domain = `${APP_NAME?.toLowerCase().replace(' ', '')}.com`;

const About = () => {
  return (
    <div className="w-full">
      <Meta title={`${APP_NAME} - About Page`} />
      <div className="max-w-2xl mx-auto h-full bg-white border-x border-x-gray-400 pb-8">
        <div className="pt-4 pb-2 px-2 text-2xl mob:text-3xl capitalize border-b-4 border-blue-500 font-light">
          About Us
        </div>
        <section className="bg-white px-2 py-4 space-y-5 font-serif">
          <p className="pointer-events-none">
            {APP_NAME} will serve as a trusted guide to the crush of news and
            ideas around you. With thoughtful analysis and fearless views our
            team of editors and writers will track news in India and the world
            and provide a perspective that is reflective of a changing dynamic.
          </p>
          <p>
            <span className="font-semibold mr-2">Executive Editor :</span>
            Chiranjib Nath
          </p>
          <p>
            <span className="block text-red-500 font-semibold capitalize">
              Send your press release to
            </span>
            pressrelease@{domain}
          </p>
          <p>
            <span className="block text-red-500 font-semibold capitalize">
              Do give us feedback at
            </span>
            feedback@{domain}
          </p>
          <p>
            <span className="block text-red-500 font-semibold capitalize">
              To work for us write to
            </span>
            jobs@{domain}
          </p>
          <p>
            <span className="block text-red-500 font-semibold capitalize">
              For advertising please contact
            </span>
            ads@
            {domain}
          </p>
        </section>
      </div>
    </div>
  );
};
export default About;
