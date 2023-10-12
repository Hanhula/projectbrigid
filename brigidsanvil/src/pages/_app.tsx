import NavBar from "@/components/ui/Navbar/navbar";
import "@/styles/globals.css";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import persistStoreWrapper, { wrapper } from "@/components/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "@/components/ui/Loading/loading";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Loading></Loading>}
        persistor={persistStoreWrapper(store)}
      >
        <div>
          <NavBar />
          <Component {...pageProps} />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
