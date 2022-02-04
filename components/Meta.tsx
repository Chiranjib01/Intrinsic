import Head from 'next/head';
import { APP_NAME, BASE_URL } from '../utils/constants';

interface MetaType {
  title: string;
  description?: string;
  keywords?: string;
}

const Meta = ({
  title,
  description = `${APP_NAME} is a place to read , learn and share very nice and informative articles`,
  keywords = `${APP_NAME}`,
}: MetaType) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta
        name="twitter:title"
        property="og:title"
        content={`${title} - ${APP_NAME}`}
      />
      <meta
        name="twitter:description"
        property="og:description"
        content={description}
      />
      <meta property="og:site_name" content={APP_NAME} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:domain" content={BASE_URL} />
    </Head>
  );
};

export default Meta;
