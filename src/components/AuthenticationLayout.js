import { Box, Flex, Link } from 'theme-ui'
import Logo from './Logo'
import { Link as RouterLink } from 'react-router-dom'

export default function AuthenticationLayout({
    content,
    side,
    color,
    maxWidth = 'auto',
}) {
    return (
        <Flex sx={{ minHeight: '100vh', maxWidth: maxWidth, mx: 'auto' }}>
            <Flex
                sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column',
                    pl: [7, 7, 8, 8, 8],
                    pr: [7, 7, 8, 8, 9],
                    py: [6, 6, 7, 8],
                    flex: 1,
                }}
            >
                <Flex
                    sx={{
                        maxWidth: 450,
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        height: '100%',
                        pb: [8, 8, 0],
                    }}
                >
                    <Box
                        sx={{
                            color: 'primary',
                            width: '100%',
                            justifyContent: 'center',
                            display: ['flex', 'flex', 'none'],
                        }}
                    >
                        <Link as={RouterLink} to="/">
                            <Logo width={89} height={50} />
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            color: 'primary',
                            width: '100%',
                            ml: '-20px',
                            display: ['none', 'none', 'flex'],
                        }}
                    >
                        <Link as={RouterLink} to="/">
                            <Logo />
                        </Link>
                    </Box>
                    <Box>
                        <Box
                            sx={{
                                display: ['flex', 'flex', 'none'],
                                justifyContent: 'center',
                            }}
                        >
                            {side}
                        </Box>
                        {content}
                    </Box>
                    <Box />
                </Flex>
            </Flex>
            <Box
                sx={{
                    minWidth: ['auto', 'auto', '50%'],
                    display: ['none', 'none', 'flex'],
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: color,
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                {side}
            </Box>
        </Flex>
    )
}
