import { useEffect, useState } from 'react'
import useFetch from 'use-http'
import { useAccount, useBalance, useConnect } from 'wagmi'
import { ethers } from 'ethers'
import { apiUrl } from '../../environment'
import { useAuth } from '../../context/auth'
import { Box, Text, Button, Spinner, Image } from 'theme-ui'
import { Link as RouterLink } from 'react-router-dom'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

import AuthenticationLayout from '../../components/AuthenticationLayout'
import FullScreenLoader from '../../components/FullScreenLoader'
import FullScreenError from '../../components/FullScreenError'
import ConnectPopover from '../../components/ConnectPopover'

import ticketApproved from '../Me/images/ticket-approved.png'
import ticketApproved2x from '../Me/images/ticket-approved-2x.png'

export default function Address() {
    const { authToken, signOut } = useAuth()
    const [lastUpdated, setLastUpdated] = useState(Date())

    // 🌐 Web 3
    const [connectResponse, connect] = useConnect()
    const [accountResponse] = useAccount({
        fetchEns: true,
    })

    const [balanceResponse] = useBalance({
        addressOrName: accountResponse?.data?.address,
        skip: !accountResponse.data,
    })

    const { loading, error, data } = useFetch(
        `${apiUrl}me`,
        {
            headers: { Authorization: `Bearer ${authToken}` },
            cachePolicy: 'no-cache',
        },
        [lastUpdated]
    )

    const {
        post,
        response: savingResponse,
        data: savingData,
        loading: isSaving,
        error: savingError,
    } = useFetch(apiUrl + 'me', {
        headers: { Authorization: `Bearer ${authToken}` },
        cachePolicy: 'no-cache',
    })

    const saveAddress = async () => {
        await post('address', { address: accountResponse?.data?.address })
        if (savingResponse.ok) setLastUpdated(Date())
    }

    useEffect(() => {
        if (error) {
            signOut()
        }
    }, [error, signOut])

    if (!navigator.cookieEnabled) {
        return (
            <FullScreenError error="Cookies needs to be enabled for this website to function. Cookies are often disabled in private/incognito mode." />
        )
    }

    if (loading || balanceResponse.loading || accountResponse.loading) {
        return <FullScreenLoader />
    }

    if (data && !data.whitelisted) {
        return (
            <FullScreenError error="You need to be whitelisted to submit your address." />
        )
    }

    if (!data) {
        return <FullScreenError />
    }

    if (data?.address) {
        return <Confirmed address={data?.address} />
    }

    if (connectResponse.data?.connected && balanceResponse.data) {
        return (
            <Confirm
                address={accountResponse.data?.address}
                balanceValue={balanceResponse.data?.value}
                saveAddress={saveAddress}
                savingError={savingError}
                isSaving={isSaving}
                savingData={savingData}
            />
        )
    }

    return <Connect connect={connect} connectResponse={connectResponse} />
}

function Side() {
    const { width, height } = useWindowSize()

    return (
        <>
            <Confetti
                width={width}
                height={height}
                colors={['#293D19', '#90A480']}
            />
            <Box p={5}>
                <Image
                    src={ticketApproved}
                    alt="3D character with cap and glasses"
                    sx={{
                        maxWidth: '100%',
                    }}
                    srcSet={`${ticketApproved} 1x, ${ticketApproved2x} 2x`}
                />
            </Box>
        </>
    )
}

function Confirm({
    address,
    balanceValue,
    saveAddress,
    savingError,
    isSaving,
    savingData,
}) {
    const minimum = ethers.BigNumber.from('50000000000000000') // 0.05 eth
    const enoughEth = balanceValue.gt(minimum)

    const content = enoughEth ? (
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
                Are the details below correct?
            </Text>
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 5 }}>
                Make sure that the address below is the one you will use to buy
                one of our artworks. Once submitted this can't be changed.
            </Text>
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 500, pb: 2 }}>
                Address
            </Text>
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 6 }}>
                {address}
            </Text>

            {isSaving ? (
                <Spinner size={40} />
            ) : (
                <Button as="a" onClick={saveAddress} sx={{ cursor: 'pointer' }}>
                    Submit my address
                </Button>
            )}

            {savingError && (
                <Box mt={6}>
                    <Text
                        color="primary"
                        as="p"
                        sx={{ fontSize: [2, 2, 2], fontWeight: 300 }}
                    >
                        {savingData.reason || 'Something went wrong...'}
                    </Text>
                </Box>
            )}
        </>
    ) : (
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
                Your wallet needs more funds
            </Text>
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 5 }}>
                The address below needs more than 0.05 ETH to be able to buy one
                of artworks therefore you won't be able to submit your address.
                Switch to a different wallet with more funds to confirm your
                spot.
            </Text>
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 500, pb: 2 }}>
                Address
            </Text>
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 6 }}>
                {address}
            </Text>
        </>
    )

    return (
        <AuthenticationLayout
            content={content}
            side={<Side />}
            color="#536743"
        />
    )
}

function Confirmed({ address }) {
    return (
        <AuthenticationLayout
            content={
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
                        Your whitelist spot is secured
                    </Text>
                    <Text
                        as="p"
                        sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 5 }}
                    >
                        The address below is what you will need to buy one of
                        our artworks.
                    </Text>
                    <Text
                        as="p"
                        sx={{ fontSize: [2, 2, 2], fontWeight: 500, pb: 2 }}
                    >
                        Address
                    </Text>
                    <Text
                        as="p"
                        sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 6 }}
                    >
                        {address}
                    </Text>
                    <Button
                        sx={{ display: 'inline-flex' }}
                        as={RouterLink}
                        to={`/me`}
                    >
                        Go back
                    </Button>
                </>
            }
            side={<Side />}
            color="#536743"
        />
    )
}

function Connect({ connect, connectResponse }) {
    const content = (
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
                Confirm your whitelisted spot
            </Text>
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 5 }}>
                Our big mint day is days away and we need your wallet address to
                confirm your spot. Every whitelisted person like you will be
                able to buy one or two artworks for 0.05 ETH each.
            </Text>

            <ConnectPopover
                connectResponse={connectResponse}
                connect={connect}
            />
        </>
    )

    return (
        <AuthenticationLayout
            content={content}
            side={<Side />}
            color="#536743"
        />
    )
}
