import { useEffect } from 'react'
import useFetch from 'use-http'
import { useMixpanel } from 'react-mixpanel-browser'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { Link as RouterLink } from 'react-router-dom'

import { apiUrl } from '../../environment'
import { useAuth } from '../../context/auth'
import { Box, Text, Button, Image } from 'theme-ui'
import Discord from '../../components/icons/Discord'

import AuthenticationLayout from '../../components/AuthenticationLayout'
import FullScreenLoader from '../../components/FullScreenLoader'
import FullScreenError from '../../components/FullScreenError'

import ticketApproved from './images/ticket-approved.png'
import ticketApproved2x from './images/ticket-approved-2x.png'

import ticketRejected from './images/ticket-rejected.png'
import ticketRejected2x from './images/ticket-rejected-2x.png'

export default function Home() {
    const { authToken, signOut } = useAuth()

    const { loading, error, data } = useFetch(
        `${apiUrl}me`,
        {
            headers: { Authorization: `Bearer ${authToken}` },
            cachePolicy: 'no-cache',
        },
        []
    )

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

    if (loading) {
        return <FullScreenLoader />
    }

    if (data && !data.is_approved) {
        return <Rejected />
    }

    if (!data) {
        return <FullScreenError />
    }

    if (data && data.discord_connected) {
        return <AllSet data={data} />
    }

    return <Approved />
}

function AllSet({ data }) {
    const { width, height } = useWindowSize()
    const mixpanel = useMixpanel()

    if (mixpanel.config.token) {
        mixpanel.track('/me all-set appeared')
    }

    const content = (
        <Box sx={{ textAlign: ['center', 'center', 'left'] }}>
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
                All set!
            </Text>
            {!data.whitelisted ? (
                <>
                    <Text
                        as="p"
                        sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 5 }}
                    >
                        Open your Discord and go to the TinyFaces server to
                        start interacting with the community.
                    </Text>
                    <ExtraInfo data={data} />
                </>
            ) : (
                <Whitelisted data={data} />
            )}
        </Box>
    )

    const side = (
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
    return (
        <AuthenticationLayout content={content} side={side} color="#536743" />
    )
}

function Whitelisted({ data }) {
    if (data.address) {
        return (
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 5 }}>
                Congratulations your address {data.address} is whitelisted and
                can be used later to buy one or two artworks for 0.05 ETH each.
            </Text>
        )
    }
    return (
        <>
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 5 }}>
                You're whitelisted but you didn't connect your wallet and
                submitted your address yet. This is needed to confirm your spot.
            </Text>
            <Button
                sx={{ display: 'inline-flex' }}
                as={RouterLink}
                to={`/address`}
            >
                Confirm your spot
            </Button>
        </>
    )
}

function ExtraInfo({ data }) {
    const rankingNonOG = data?.ranking_non_og
    const rankingFull = data?.ranking

    if (!data?.twitter_calculation_finished) {
        return (
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 5 }}>
                Every day we pick 30 random people from our Top 40 leaderboard
                and reward them with a whitelist spot. We're working hard on
                calculating your ranking and you should be able to see an update
                pretty soon.
            </Text>
        )
    }

    if (data?.whitelisted) {
        return (
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 5 }}>
                Congratulations you're whitelisted and will be able to buy a
                TinyFace when we drop/release them. Your current whitelisted
                ranking is {rankingFull}/{data?.total_members_whitelisted}
            </Text>
        )
    }

    if (data?.whitelisted === false) {
        return (
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 5 }}>
                Every day we pick 30 random people from our Top 40 leaderboard
                and reward them with a whitelist spot. Your current ranking is{' '}
                {rankingNonOG}/{data?.total_members_non_og}
            </Text>
        )
    }
}

function Rejected() {
    const mixpanel = useMixpanel()

    if (mixpanel.config.token) {
        mixpanel.track('/me rejected appeared')
    }

    const content = (
        <Box sx={{ textAlign: ['center', 'center', 'left'] }}>
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
                Sorry
            </Text>
            <Text as="p" sx={{ fontSize: [1, 2, 2], fontWeight: 300, pb: 5 }}>
                Your twitter account doesn’t meet all the requirements yet to
                join our Discord. Make sure you follow us and liked a few
                tweets. Once you've done that wait at least 1 hour before you
                refresh this page. Currently we also block recent and suspicious
                Twitter accounts to keep our community safe and fair.
            </Text>
        </Box>
    )

    const side = (
        <>
            <Box p={5}>
                <Image
                    src={ticketRejected}
                    alt="Rejected ticket"
                    sx={{
                        maxWidth: '100%',
                    }}
                    srcSet={`${ticketRejected} 1x, ${ticketRejected2x} 2x`}
                />
            </Box>
        </>
    )
    return (
        <AuthenticationLayout content={content} side={side} color="primary" />
    )
}

function Approved() {
    const { width, height } = useWindowSize()
    const mixpanel = useMixpanel()

    if (mixpanel.config.token) {
        mixpanel.track('/me approved appeared')
    }

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
                Congratulations, you’re in!
            </Text>
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 5 }}>
                After carefully reviewing your Twitter activity we’ve decided
                you’re a great fit to the TinyFaces community. Click the button
                below to join our Discord
            </Text>

            <Button
                sx={{ display: 'inline-flex' }}
                as="a"
                href={`${apiUrl}discord/authenticate`}
            >
                <Box
                    sx={{
                        display: 'inline-flex',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    mr={2}
                >
                    <Discord />
                </Box>
                Join our Discord
            </Button>

            <Text as="p" sx={{ fontSize: 0, fontWeight: 300, pt: 5 }}>
                We only ask read-only access and will never post anything in
                your name
            </Text>
        </>
    )

    const side = (
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
    return (
        <AuthenticationLayout content={content} side={side} color="#536743" />
    )
}
