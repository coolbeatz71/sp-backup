import splApi from "helpers/axios";

const ret = async (
  Component: any,
  ctx: any,
  svpProps: { [key: string]: any },
) => ({
  svpProps,
  pageProps: Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {},
});

const getInitialProps = async ({ Component, ctx }: { [key: string]: any }) => {
  let error = null;
  let categories = [];

  try {
    const _categories = await splApi.get("/categories");
    categories = _categories.data;
  } catch (exc) {
    error = exc.message || "Network or an unknown error occurred!";
  }

  return ret(Component, ctx, { error, categories });
};

export default getInitialProps;
