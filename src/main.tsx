import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'config/theme.config'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from 'store/store.ts'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ChakraProvider>
	</Provider>
)
