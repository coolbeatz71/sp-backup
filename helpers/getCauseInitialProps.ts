import splApi from "helpers/axios";

const getCauseInitialProps = async (ctx: any) => {
  let error = null;
  let cause = { slug: ctx?.query.slug };

  try {
    const _cause = await splApi.get(`/causes/${cause.slug}`);
    cause = _cause.data;
  } catch (exc) {
    error = exc;
  }

  return { error, cause };
};

export default getCauseInitialProps;
