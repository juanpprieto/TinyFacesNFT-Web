import useFetch from 'use-http'
import { useMemo } from 'react'
import { Box, Text, Button, Image } from 'theme-ui'
import { useMixpanel } from 'react-mixpanel-browser'
import { useLocation } from 'react-router-dom'

import { apiUrl } from '../../environment'
import Twitter from '../../components/icons/Twitter'
import AuthenticationLayout from '../../components/AuthenticationLayout'
import FullScreenLoader from '../../components/FullScreenLoader'
import FullScreenError from '../../components/FullScreenError'

import ticketPending from './images/ticket-pending.png'
import ticketPending2x from './images/ticket-pending-2x.png'

export default function Connect() {
    const mixpanel = useMixpanel()
    let query = useQuery()
    let isSignIn = query.get('type') === 'signin'

    if (mixpanel.config.token) {
        mixpanel.track('/connect appeared')
    }

    const { loading, error, data } = useFetch(
        `${apiUrl}twitter/authenticate`,
        []
    )

    if (!navigator.cookieEnabled) {
        return (
            <FullScreenError error="Cookies needs to be enabled for this website to function. Cookies are often disabled in private/incognito mode." />
        )
    }

    if (loading) {
        return <FullScreenLoader />
    }

    if (error) {
        return <FullScreenError />
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
                {isSignIn ? 'Welcome back' : 'Here’s your tiny invitation'}
            </Text>
            <Text as="p" sx={{ fontSize: [2, 2, 2], fontWeight: 300, pb: 5 }}>
                {isSignIn
                    ? 'To check out your ranking or submit your wallet (if whitelisted) please click the button below.'
                    : 'To join our discord server we need to analyse your twitter account to keep bots out and keep our giveaways fair and square. Click below to continue'}
            </Text>

            <Button as="a" href={data.url}>
                <Box sx={{ display: 'inline-flex' }} mr={2}>
                    <Twitter />
                </Box>
                Sign in with Twitter
            </Button>

            <Text as="p" sx={{ fontSize: 0, fontWeight: 300, pt: 5 }}>
                We only ask read-only access and will never post anything in
                your name
            </Text>
        </Box>
    )

    const side = (
        <Box p={5}>
            <Image
                src={ticketPending}
                alt="Discord ticket"
                sx={{
                    maxWidth: '100%',
                }}
                srcSet={`${ticketPending} 1x, ${ticketPending2x} 2x`}
            />
        </Box>
    )
    return (
        <AuthenticationLayout content={content} side={side} color="#381B51" />
    )
}

function useQuery() {
    const { search } = useLocation()
    return useMemo(() => new URLSearchParams(search), [search])
}
