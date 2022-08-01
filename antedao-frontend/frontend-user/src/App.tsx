import { ThemeProvider } from "@material-ui/core/styles";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import createRoutes from "./routes";
import configureStore from "./store/configureStore";
import defaultTheme from "./themes/DefaultTheme/DefaultTheme";

export const getLibrary = (provider: any): any => {
	const library = new ethers.providers.Web3Provider(provider, "any");
	library.pollingInterval = 10000;

	return library;
};

const App = () => {
	const { store, persistor } = configureStore();


	return (
		<Provider store={store}>
			<Web3ReactProvider getLibrary={getLibrary}>
				<ThemeProvider theme={defaultTheme}>
					<PersistGate loading={null} persistor={persistor}>
						{createRoutes()}
					</PersistGate>
				</ThemeProvider>
			</Web3ReactProvider>
		</Provider>
	);
};

export default App;
