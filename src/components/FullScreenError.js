import { Box, Flex, Text } from 'theme-ui'
import Logo from './Logo'

export default function FullScreenError({ error }) {
    return (
        <Flex
            sx={{
                width: '100vw',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100vh',
                pb: 6,
                color: 'primary',
            }}
        >
            <Box mr={1}>
                <Logo />
            </Box>
            <Text
                color="primary"
                mt={6}
                sx={{
                    fontSize: 1,
                    maxWidth: 400,
                    textAlign: 'center',
                    lineHeight: 1.8,
                }}
            >
                {error ?? 'Something went wrong. Please try again....'}
            </Text>
        </Flex>
    )
}
