import Marquee from 'react-fast-marquee'

import { Text, Box, Flex, Image } from 'theme-ui'

import preview from './images/preview.jpg'
import preview2x from './images/preview-2x.jpg'

export default function Card({ whitelistOnly, singleCost, supply }) {
    return (
        <Box
            sx={{
                width: 392,
                bg: 'backgroundBright',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: 3,
                position: 'relative',
                filter: 'drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.1))',
            }}
        >
            {whitelistOnly && <WhitelistBadge />}
            <Image
                src={preview}
                alt="Preview art work"
                srcSet={`${preview} 1x, ${preview2x} 2x`}
            />
            <Marquee gradient={false}>
                {[...Array(12)].map((el, i) => (
                    <RevealingSoon key={i} supply={supply} />
                ))}
            </Marquee>

            <Box
                sx={{
                    py: 6,
                    px: 5,
                    display: 'flex',
                    alignItems: 'center',
                    bg: 'backgroundInversed',
                    color: 'textGrey',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Text sx={{ fontSize: 11, fontWeight: 'body', mb: 1 }}>
                        Sale price
                    </Text>{' '}
                    <Text
                        sx={{
                            fontSize: 4,
                            fontWeight: 'extraBold',
                        }}
                    >
                        {singleCost} ETH
                    </Text>
                </Box>
                <Box
                    sx={{
                        height: 40,
                        mx: 5,
                        width: 1,
                        opacity: 0.2,
                        background: 'textInversedSoft',
                    }}
                ></Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <Box>
                        <InfoIcon />
                    </Box>

                    <Text sx={{ fontSize: 11, fontWeight: 'body' }}>
                        The artwork will be revealed within 24h from buying.
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}

function WhitelistBadge() {
    return (
        <Box
            sx={{
                textTransform: 'uppercase',
                bg: 'backgroundBright',
                position: 'absolute',
                top: 4,
                left: 4,
                fontSize: 11,
                fontFamily: 'body',
                fontWeight: 'extraBold',
                height: 26,
                borderRadius: 13,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 2,
            }}
        >
            <Box sx={{ mr: 1, display: 'flex' }}>
                <StarIcon />
            </Box>
            Whitelist only
        </Box>
    )
}

function RevealingSoon({ supply }) {
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

function StarIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="11"
            fill="none"
            viewBox="0 0 12 11"
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.607 4.19a.353.353 0 00-.286-.243l-3.446-.575L6.318.262a.352.352 0 00-.636 0l-1.546 3.11-3.457.575a.36.36 0 00-.197.61L2.953 6.92l-.56 3.6a.358.358 0 00.142.35.282.282 0 00.183.069.443.443 0 00.19-.043L6 9.284l3.092 1.613a.35.35 0 00.373-.027.359.359 0 00.141-.35l-.56-3.6 2.472-2.362a.36.36 0 00.09-.367z"
                clipRule="evenodd"
            ></path>
        </svg>
    )
}

function InfoIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.267 8.093c-.438.441-1.037.745-1.704.875v.589a.75.75 0 01-1.5 0V8.29a.75.75 0 01.75-.75c.565 0 1.072-.183 1.391-.505.255-.256.383-.598.381-1.016 0-.857-.711-1.55-1.585-1.55s-1.585.693-1.585 1.546a.75.75 0 11-1.5 0c0-1.68 1.384-3.046 3.085-3.046 1.702 0 3.085 1.366 3.085 3.046.005.815-.278 1.535-.818 2.078zM7.75 13.43a1.18 1.18 0 010-2.359 1.18 1.18 0 010 2.359zM8 0C3.589 0 0 3.589 0 8s3.589 8 8 8c4.412 0 8-3.589 8-8s-3.588-8-8-8z"
                clipRule="evenodd"
            ></path>
        </svg>
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
