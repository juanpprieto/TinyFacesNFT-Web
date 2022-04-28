import { Box } from 'theme-ui'
import { useMixpanel } from 'react-mixpanel-browser'
import { useSupply } from '../../hooks/useSupply'
import { useAccount, useProvider, useSigner } from 'wagmi'

import Header from './Header'
import Hero from './Hero'
import Info from './Info'
import Blocks from './Blocks'
import Carousel from './Carousel'
import Questions from './Questions'
import Footer from './Footer'

import contractInterface from '../../tiny-contract-abi.json'

export default function Home() {
    const mixpanel = useMixpanel()

    if (mixpanel.config.token) {
        mixpanel.track('/ appeared')
    }

    // 📝 Signers
    const provider = useProvider()
    const [signerResponse] = useSigner()

    // 📄 Contract
    const contractConfig = {
        addressOrName: '0xb363af6181a4335608880510772A5f61a5183c88',
        contractInterface: contractInterface,
        signerOrProvider: signerResponse.data || provider,
    }

    const [accountResponse] = useAccount({
        fetchEns: true,
    })
    const address = accountResponse?.data?.address

    const supply = useSupply({
        contractConfig,
        address: address,
    })

    return (
        <Box>
            <Header />
            <Hero supply={supply} />
            <Info />
            <Blocks />
            <Carousel />
            <Questions />
            <Footer supply={supply} />
        </Box>
    )
}
