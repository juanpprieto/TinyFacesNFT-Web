import './App.css'
import { ThemeProvider } from 'theme-ui'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { AuthContext } from './context/auth'
import { CookiesProvider, useCookies } from 'react-cookie'
import mixpanel from 'mixpanel-browser'
import { MixpanelProvider } from 'react-mixpanel-browser'
import { WagmiProvider, defaultChains } from 'wagmi'
import { providers } from 'ethers'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import process from 'process'
import { Buffer } from 'buffer'
import EventEmitter from 'events'
import { infuriaKey } from './environment'

import theme from './theme'

import Home from './pages/Home'
import Success from './pages/Success'
import Mint from './pages/Mint'

//import PrivateRoute from './PrivateRoute'

window.process = process
window.Buffer = Buffer
window.EventEmitter = EventEmitter

const tokenKey = 'token'

mixpanel.init('d5290f9d8c2013af5afd452957d617ac')

// Set up connectors
const connectors = () => {
    return [
        new InjectedConnector({
            chains: defaultChains,
            options: { shimDisconnect: true },
        }),
        new WalletConnectConnector({
            options: {
                infuraId: infuriaKey,
            },
            chains: [...defaultChains],
        }),
        new CoinbaseWalletConnector({
            options: {
                infuraId: infuriaKey,
            },
            chains: [...defaultChains],
        }),
    ]
}

function App() {
    const [cookies, removeCookie] = useCookies([tokenKey])

    const provider = ({ chainId }) =>
        new providers.InfuraProvider(chainId, infuriaKey)

    return (
        <WagmiProvider autoConnect provider={provider} connectors={connectors}>
            <CookiesProvider>
                <MixpanelProvider>
                    <AuthContext.Provider
                        value={{
                            authToken: cookies[tokenKey],
                            signOut: () => removeCookie(tokenKey, ''),
                        }}
                    >
                        <ThemeProvider theme={theme}>
                            <BrowserRouter>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route
                                        path="/success"
                                        element={<Success />}
                                    />
                                    <Route path="/mint" element={<Mint />} />
                                </Routes>
                            </BrowserRouter>
                        </ThemeProvider>
                    </AuthContext.Provider>
                </MixpanelProvider>
            </CookiesProvider>
        </WagmiProvider>
    )
}

export default App
