export default () => {
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_SPL_FRONTEND_LOCAL_URL;
  }
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_SPL_FRONTEND_PRODUCTION_URL;
  }
  return process.env.NEXT_PUBLIC_SPL_FRONTEND_STAGING_URL;
};
