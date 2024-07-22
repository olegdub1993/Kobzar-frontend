import '../styles/globals.css'
import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {AppProps} from 'next/app';
import {wrapper} from './../store/store';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import en from "../i18n/en.json"
import uk from "../i18n/uk.json"

const messages={en,uk}
const MyApp: FC<AppProps> = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    const {locale} =useRouter()
    return (
        <IntlProvider locale={locale as string} messages={messages[locale as "en"|"uk"]}>
            <Provider store={store}>
                <Component {...props.pageProps} />
            </Provider>
        </IntlProvider>
    );
};

export default MyApp;
// export function App({ Component, pageProps }) {
//     return <Component {...pageProps} />;
//   }
//   export default wrapper.withRedux(App);