import Meta from '../components/Meta';
import { APP_NAME, BASE_URL } from '../utils/constants';
import terms from '../utils/terms';

const TermsPage = () => {
  return (
    <div className="w-full">
      <Meta title={`${APP_NAME} - Terms Of Use`} />
      <div className="max-w-2xl mx-auto h-full bg-white border-x border-x-gray-400 pb-8">
        <div className="pt-4 pb-2 px-2 text-2xl mob:text-3xl capitalize border-b-4 border-blue-500 font-light">
          Terms of use
        </div>
        <section className="bg-white px-2 py-4 space-y-5 font-serif">
          <p className="pointer-events-none">
            By visiting our site you are agreeing to be bound by the following
            terms and conditions. We may change these terms and conditions at
            any time. Your continued use of{' '}
            {BASE_URL?.replace('https://', '').replace('http://', '')} means
            that you accept any new or modified terms and conditions that we
            come up with. Please re-visit the `Terms of Use` link at our site
            from time to time to stay abreast of any changes that we may
            introduce. The term `{' '}
            {BASE_URL?.replace('https://', '').replace('http://', '')} ` is used
            through this entire Terms of Use document to refer to the website,
            its owners and the employees and associates of the owner
          </p>
          {terms.map((term) => (
            <p key={term.id}>
              <span className="block text-red-500 font-semibold uppercase">{`${term.id}) ${term.title}`}</span>
              {term.body}
            </p>
          ))}
        </section>
      </div>
    </div>
  );
};
export default TermsPage;
