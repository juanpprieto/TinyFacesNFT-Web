import { Box, Text, Grid, Flex, Button } from 'theme-ui'

import Marquee from 'react-fast-marquee'

import footerCharacter from './images/footer.png'
import footerCharacter2x from './images/footer2x.png'

import RightArrow from '../../components/icons/RightArrow'

export default function Footer({ supply }) {
    return (
        <Box>
            <Marquee gradient={false}>
                {[...Array(12)].map((el, i) => (
                    <CollectionDroppingSoon supply={supply} key={i} />
                ))}
            </Marquee>
            <Box
                sx={{
                    bg: '#C7B19C',
                    pt: 3,
                    pb: [0, 0, 8],
                    mt: 3,
                    position: 'relative',
                }}
            >
                <Text
                    as="h1"
                    sx={{
                        fontFamily: 'heading',
                        fontSize: [7, 7, '13vw'],
                        lineHeight: 1.1,
                        whiteSpace: ['auto', 'auto', 'nowrap'],
                        mt: 8,
                        textAlign: ['center', 'center', 'left'],
                        overflow: ['visible', 'visible', 'hidden'],
                    }}
                >
                    Join the{' '}
                    <Text as="span" sx={{ fontStyle: 'italic' }}>
                        community
                    </Text>
                    .
                </Text>
                <Flex
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        px: 3,
                        pt: 2,
                    }}
                >
                    <Box sx={{ maxWidth: 1230, width: '100%' }}>
                        <Grid
                            columnGap={5}
                            columns={['1fr', '1fr', '580px auto']}
                        >
                            <Box>
                                <Text
                                    as="p"
                                    sx={{
                                        fontSize: [2, 2, 3],
                                        textAlign: ['center', 'center', 'left'],
                                        fontWeight: 300,
                                    }}
                                >
                                    Join our Discord channel or follow us on
                                    Twitter keep up to date with our latest work
                                    and announcements.
                                </Text>
                                <Flex
                                    sx={{
                                        mt: 6,
                                        flexDirection: [
                                            'column',
                                            'column',
                                            'row',
                                        ],
                                        justifyContent: [
                                            'center',
                                            'flex-start',
                                            'flex-start',
                                        ],
                                        alignItems: 'center',
                                    }}
                                >
                                    <Button
                                        as="a"
                                        target="_blank"
                                        href="https://discord.com/invite/tinyfacesnft"
                                    >
                                        Join Discord
                                        <Box
                                            sx={{ display: 'inline-block' }}
                                            ml={3}
                                        >
                                            <RightArrow />
                                        </Box>
                                    </Button>

                                    <Button
                                        as="a"
                                        variant="secondary"
                                        ml={[0, 0, 2]}
                                        sx={{ mt: [2, 2, 0] }}
                                        href="https://twitter.com/tinyfacesnft"
                                        target="_blank"
                                    >
                                        Follow on Twitter
                                        <Box
                                            sx={{ display: 'inline-block' }}
                                            ml={3}
                                        >
                                            <RightArrow />
                                        </Box>
                                    </Button>
                                </Flex>
                            </Box>
                            <Box>
                                <Box
                                    sx={{
                                        display: ['flex'],
                                        position: [
                                            'static',
                                            'static',
                                            'absolute',
                                        ],
                                        bottom: 0,
                                        zIndex: 1,
                                        mt: [3, 3, 0],
                                    }}
                                >
                                    <img
                                        alt="Character"
                                        src={footerCharacter}
                                        height="auto"
                                        width="100%"
                                        srcSet={`${footerCharacter2x} 2x`}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

function CollectionDroppingSoon({ supply }) {
    const saleOn = supply?.isWhitelistSale || supply?.isNormalSale
    const isLoading = supply.isLoading
    const currentSupply = supply?.totalSupply?.toString()
    const totalSupply = supply?.maxSupply?.toString()
    return (
        <Flex
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                sx={{
                    fontSize: 1,
                    fontWeight: '500',
                    fontFamily: 'body',
                    letterSpacing: 1.1,
                    textTransform: 'uppercase',
                }}
            >
                {!isLoading && saleOn
                    ? `${currentSupply}/${totalSupply} minted`
                    : 'minting starting soon'}
            </Text>
            <Box p={2}>
                <Dot />
            </Box>
        </Flex>
    )
}

function Dot() {
    return (
        <Box
            sx={{
                width: '4px',
                height: '4px',
                borderRadius: '2px',
                bg: 'secondary',
            }}
        ></Box>
    )
}
