import { Provider } from "react-redux";
import initializeStore from "redux/store";
import App from "next/app";
import initialStates from "redux/initialStates";

export const withRedux = (PageComponent, { ssr = true } = {}) => {
  const WithRedux = ({ ...props }) => {
    const store = getOrInitializeStore(initialStates);

    if (typeof window !== "undefined") {
      // expose store when run in Cypress
      if (window.Cypress) window.store = store;
    }

    return (
      <Provider store={store}>
        <PageComponent {...props} />
      </Provider>
    );
  };

  // Make sure people don't use this HOC on _app.js level
  if (process.env.NODE_ENV !== "production") {
    const isAppHoc =
      PageComponent === App || PageComponent.prototype instanceof App;
    if (isAppHoc) {
      throw new Error("The withRedux HOC only works with PageComponents");
    }
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName =
      PageComponent.displayName || PageComponent.name || "Component";

    WithRedux.displayName = `withRedux(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithRedux.getInitialProps = async (context) => {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrInitializeStore();

      // Provide the store to getInitialProps of pages
      context.reduxStore = reduxStore;

      // Run getInitialProps from HOCed PageComponent
      const pageProps =
        typeof PageComponent.getInitialProps === "function"
          ? await PageComponent.getInitialProps(context)
          : {};

      // Pass props to PageComponent
      return {
        ...pageProps,
        initialReduxState: reduxStore.getState(),
      };
    };
  }

  return WithRedux;
};

let reduxStore;
const getOrInitializeStore = () => {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === "undefined") {
    return initializeStore(initialStates);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = initializeStore(initialStates);
  }

  return reduxStore;
};
