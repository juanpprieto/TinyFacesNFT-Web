import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    useAccount,
    useContract,
    useConnect,
    useProvider,
    useContractEvent,
    useSigner,
} from 'wagmi'
import { ethers } from 'ethers'
import { Text, Select, Box, Button, Link } from 'theme-ui'
import contractInterface from '../../tiny-contract-abi.json'
import FullScreenError from '../../components/FullScreenError'
import FullScreenLoader from '../../components/FullScreenLoader'
import ConnectPopover from '../../components/ConnectPopover'
import AuthenticationLayout from '../../components/AuthenticationLayout'
import { useSupply } from '../../hooks/useSupply'

import Card from './Card'

const DEFAULT_PRICE = 0.07

function Mint() {
    // 🕰 History
    let navigate = useNavigate()

    // 📝 Signers
    const provider = useProvider()
    const [signerResponse] = useSigner()

    // 📄 Contract
    const contractConfig = {
        addressOrName: '0xb363af6181a4335608880510772A5f61a5183c88',
        contractInterface: contractInterface,
        signerOrProvider: signerResponse.data || provider,
    }

    // 🪣 State
    const [lastTransaction, setLastTransaction] = useState(null)
    const [isMinting, setIsMinting] = useState(false)
    const [error, setError] = useState(null)
    const [amount, setAmount] = useState(1)

    // 🌐 Web 3
    const [connectResponse, connect] = useConnect()
    const contract = useContract(contractConfig)
    const [accountResponse, disconnect] = useAccount({
        fetchEns: true,
    })
    const address = accountResponse?.data?.address

    const supply = useSupply({
        contractConfig,
        address: address,
    })

    useContractEvent(contractConfig, 'Transfer', async (args) => {
        const [from, to, tokenId, event] = args
        console.log({ from, to, tokenId, event })

        if (lastTransaction?.hash) {
            navigate('/success?hash=' + lastTransaction.hash, { replace: true })
        }

        if (to.toLowerCase() === address?.toLowerCase()) {
            setIsMinting(false)
            setError(null)
        }
    })

    const { balanceOf, mintRate, maxSupply, totalSupply } = supply

    const isConnected = connectResponse.data?.connected
    const maxBalance = 200 - balanceOf?.toNumber()
    const totalMintable = Math.max(maxBalance, 0)
    const cost = mintRate?.toString()
    const totalCost = cost && ethers.BigNumber.from(cost).mul(amount)
    const singleCost = cost
        ? ethers.utils.formatEther(ethers.BigNumber.from(cost))
        : DEFAULT_PRICE
    const costMintable = totalCost && ethers.utils.formatEther(totalCost)
    const soldOut =
        totalSupply &&
        maxSupply &&
        ethers.BigNumber.from(totalSupply).gte(maxSupply)

    const startNormalMint = async () => {
        try {
            setIsMinting(true)
            setError(null)
            setLastTransaction(null)
            const tx = await contract.mint(amount, {
                value: totalCost,
            })
            setLastTransaction(tx)
        } catch (err) {
            console.log(err)
            setIsMinting(false)
            setError(err)
        }
    }

    // 🏁 Start code

    if (accountResponse.loading || supply.isLoading) {
        return <FullScreenLoader loading="Let's get this set up..." />
    }

    if (soldOut) {
        return <FullScreenError error="All our artworks are sold out now." />
    }

    if (totalMintable === 0) {
        return (
            <FullScreenError
                error={`You own already a total of ${balanceOf?.toNumber()} pieces and can't mint more.`}
            />
        )
    }
    if (isMinting) {
        return (
            <FullScreenLoader message="We're processing your order... Don't close this page. If this takes longer than expected track your transacation in your wallet." />
        )
    }

    if (accountResponse.error) {
        return (
            <FullScreenError error="There was an error connecting to your wallet" />
        )
    }

    return (
        <AuthenticationLayout
            maxWidth={1200}
            content={
                isConnected ? (
                    <Connected
                        address={accountResponse.data?.address}
                        data={connectResponse.data}
                        disconnect={disconnect}
                        error={error}
                        supply={supply}
                        costMintable={costMintable}
                        contract={contract}
                        startMint={startNormalMint}
                        totalMintable={totalMintable}
                        setAmount={setAmount}
                    />
                ) : (
                    <Connect
                        connectResponse={connectResponse}
                        connect={connect}
                    />
                )
            }
            color="transparent"
            side={
                <Box mb={[8, 8, 0]} mt={[5, 5, 0]}>
                    <Card
                        supply={supply}
                        whitelistOnly={false}
                        singleCost={singleCost}
                    />
                </Box>
            }
        />
    )
}

function Connected({
    disconnect,
    supply,
    contract,
    setAmount,
    address,
    amount,
    startMint,
    costMintable,
    totalMintable,
    error,
    lastTransaction,
}) {
    const errorMessage = smartError(error, contract) ?? error?.error?.message

    return (
        <Box>
            <Message
                title="The wait is finally over"
                subtitle={`At present there are ${supply.totalSupply?.toString()}/${supply.maxSupply?.toString()} TinyFaces minted. Select how many TinyFaces you want to mint...`}
            />
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 2 }}>
                Your address is:
            </Text>
            <Text
                as="p"
                sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 3, mb: 5 }}
            >
                {address}
            </Text>

            <Box sx={{ display: 'flex', mr: 2 }}>
                <Box sx={{ mr: 3, svg: { ml: '-30px' } }}>
                    <Select
                        name="amount"
                        id="amount"
                        mb={2}
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        sx={{
                            width: 100,
                            borderRadius: 21,
                            pl: 4,
                            pr: 6,
                        }}
                    >
                        {Array(totalMintable || 0)
                            .fill(0)
                            .map((item, index) => (
                                <option key={index}>{index + 1}</option>
                            ))}
                    </Select>
                </Box>
                <Button sx={{ cursor: 'pointer' }} onClick={startMint}>
                    Buy Now ({costMintable} ETH)
                </Button>
            </Box>
            {errorMessage && (
                <Box
                    sx={{
                        mt: 4,
                        color: 'primary',
                    }}
                >
                    {errorMessage}
                </Box>
            )}

            {errorMessage && lastTransaction?.hash && (
                <Box
                    sx={{
                        mt: 4,
                        color: 'primary',
                    }}
                >
                    For more information: https://rinkeby.etherscan.io/tx/$
                    {lastTransaction.hash}
                </Box>
            )}
            <Box sx={{ position: 'absolute', bottom: 4, right: 5 }}>
                <Link
                    sx={{ fontSize: [1, 1, 1], cursor: 'pointer' }}
                    onClick={disconnect}
                >
                    Disconnect wallet
                </Link>
            </Box>
        </Box>
    )
}

function Message({ title, subtitle }) {
    return (
        <>
            <Text
                as="h1"
                sx={{
                    fontFamily: 'heading',
                    fontSize: [6, 6, 8],
                    lineHeight: 1.1,
                    pr: [0, 0, 4],
                    pb: [5],
                }}
            >
                {title}
            </Text>
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 5 }}>
                {subtitle}
            </Text>
        </>
    )
}

function Connect({ connect, connectResponse }) {
    return (
        <div>
            <Message
                title="The wait is finally over"
                subtitle="Thank you for being a supporter from day one. Our TinyFaces are
                finally ready to be minted. Connect your ETH wallet to
                start buying."
            ></Message>

            <ConnectPopover
                connectResponse={connectResponse}
                connect={connect}
            />
        </div>
    )
}

function smartError(error, contract) {
    const errorData = error?.error?.data?.originalError?.data

    if (!errorData) {
        return undefined
    }

    const errorName = contract?.interface?.parseError(errorData)?.name

    if (!errorName) {
        return undefined
    }

    switch (errorName) {
        case 'NormalSaleNotActive':
            return "Sale for non whitelisted users didn't start yet."
        case 'WhitelistNotActive':
            return "Sale for whitelisted users didn't start yet."
        case 'ExceededLimit':
            return "You've exceeded the max amount of artworks for this wallet."
        case 'WrongEther':
            return 'Not enough Ethereum was sent for this.'
        case 'InvalidMerkle':
            return "Your address isn't whitelisted."
        case 'WhitelistUsed':
            return 'Your address already used up all whitelist slots.'
        default:
    }
}

export default Mint
