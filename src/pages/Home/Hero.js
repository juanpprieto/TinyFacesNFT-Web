import { Flex, Box, Text, Grid } from 'theme-ui'

import Marquee from 'react-fast-marquee'

import character1 from './images/characters/character1.jpg'
import character12x from './images/characters/character1-2x.jpg'

import character2 from './images/characters/character2.jpg'
import character22x from './images/characters/character2-2x.jpg'

import character3 from './images/characters/character3.jpg'
import character32x from './images/characters/character3-2x.jpg'

import character4 from './images/characters/character4.jpg'
import character42x from './images/characters/character4-2x.jpg'

import character5 from './images/characters/character5.jpg'
import character52x from './images/characters/character5-2x.jpg'

import character6 from './images/characters/character6.jpg'
import character62x from './images/characters/character6-2x.jpg'

import character7 from './images/characters/character7.jpg'
import character72x from './images/characters/character7-2x.jpg'

import character8 from './images/characters/character8.jpg'
import character82x from './images/characters/character8-2x.jpg'

import character9 from './images/characters/character9.jpg'
import character92x from './images/characters/character9-2x.jpg'

import character10 from './images/characters/character10.jpg'
import character102x from './images/characters/character10-2x.jpg'

import character11 from './images/characters/character11.jpg'
import character112x from './images/characters/character11-2x.jpg'

import character12 from './images/characters/character12.jpg'
import character122x from './images/characters/character12-2x.jpg'

import character13 from './images/characters/character13.jpg'
import character132x from './images/characters/character13-2x.jpg'

import character14 from './images/characters/character14.jpg'
import character142x from './images/characters/character14-2x.jpg'

import character15 from './images/characters/character15.jpg'
import character152x from './images/characters/character15-2x.jpg'

import character16 from './images/characters/character16.jpg'
import character162x from './images/characters/character16-2x.jpg'

export default function Hero({ supply }) {
    return (
        <Box>
            <Marquee speed={15} gradient={false}>
                {[...Array(6)].map((el, i) => (
                    <CharactersTopGrid key={i} />
                ))}
            </Marquee>
            <Marquee speed={15} direction="right" gradient={false}>
                {[...Array(6)].map((el, i) => (
                    <CharactersBottomGrid key={i} />
                ))}
            </Marquee>
            <Marquee gradient={false}>
                {[...Array(12)].map((el, i) => (
                    <Ticker key={i} supply={supply} />
                ))}
            </Marquee>
        </Box>
    )
}

function CharactersTopGrid() {
    return (
        <Grid gap={3} columns={8} paddingLeft={3} paddingBottom={3}>
            <Character src={character1} src2x={character12x} />
            <Character src={character2} src2x={character22x} />
            <Character src={character3} src2x={character32x} />
            <Character src={character4} src2x={character42x} />
            <Character src={character5} src2x={character52x} />
            <Character src={character6} src2x={character62x} />
            <Character src={character7} src2x={character72x} />
            <Character src={character8} src2x={character82x} />
        </Grid>
    )
}

function CharactersBottomGrid() {
    return (
        <Grid gap={3} columns={8} paddingLeft={3} paddingBottom={3}>
            <Character src={character9} src2x={character92x} />
            <Character src={character10} src2x={character102x} />
            <Character src={character11} src2x={character112x} />
            <Character src={character12} src2x={character122x} />
            <Character src={character13} src2x={character132x} />
            <Character src={character14} src2x={character142x} />
            <Character src={character15} src2x={character152x} />
            <Character src={character16} src2x={character162x} />
        </Grid>
    )
}

function Character({ src, src2x }) {
    return (
        <Box
            sx={{
                borderRadius: 1,
                overflow: 'hidden',
                img: { display: 'block' },
                width: [228, 'auto', 'auto', 'auto'],
            }}
        >
            <img
                alt="Character"
                src={src}
                height="auto"
                width="100%"
                srcSet={`
      ${src2x} 2x, 
    `}
            />
        </Box>
    )
}

function Ticker({ supply }) {
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
