import { Flex, Spinner, Box, Text } from 'theme-ui'
import Logo from './Logo'

export default function FullScreenLoader({ message }) {
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
            <Spinner strokeWidth={2} sx={{ mt: 6 }} />
            {message && (
                <Text color="primary" mt={6} sx={{ fontSize: 1 }}>
                    {message}
                </Text>
            )}
        </Flex>
    )
}
