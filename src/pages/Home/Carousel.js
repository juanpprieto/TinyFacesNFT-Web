import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Box, Text, Flex, Grid, useThemeUI } from 'theme-ui'

import LeftArrow from '../../components/icons/LeftArrow'
import RightArrow from '../../components/icons/RightArrow'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import character1 from './images/characters-pick/character1.jpg'
import character2 from './images/characters-pick/character2.jpg'
import character3 from './images/characters-pick/character3.jpg'
import character4 from './images/characters-pick/character4.jpg'
import character5 from './images/characters-pick/character5.jpg'
import character6 from './images/characters-pick/character6.jpg'

export function widthCharacter(columns) {
    return `100vw / ${columns}`
}
export default function Carousel() {
    const swiperRef = useRef(null)
    const context = useThemeUI()

    const paddingLeft = '((100vw - 1230px) / 2)'
    const paddingLeftSmall = `${context.theme.space[5]}px`

    return (
        <Box
            sx={{
                bg: 'backgroundDark',
                pt: [7, 7, 8],
                pb: [8, 8, 9],
                overflow: 'hidden',
            }}
        >
            <Flex
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: [5, 5, 8],
                }}
            >
                <Flex
                    sx={{
                        maxWidth: 1230,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: [5, 5, 0],
                    }}
                >
                    <Text
                        sx={{
                            fontSize: [5, 5, 7],
                            fontFamily: 'heading',
                            display: 'block',
                            pr: 2,
                            color: 'textInversed',
                            lineHeight: 1.0,
                        }}
                    >
                        Find your favourite character
                    </Text>

                    <Grid gap={3} columns={2} sx={{ flexShrink: 0 }}>
                        <NavButton
                            onClick={() => swiperRef.current.swiper.slidePrev()}
                            direction="left"
                        />
                        <NavButton
                            onClick={() => swiperRef.current.swiper.slideNext()}
                            direction="right"
                        />
                    </Grid>
                </Flex>
            </Flex>
            <Box
                sx={{
                    '.swiper-slide': {
                        width: [
                            `calc(${widthCharacter(3)})`,
                            `calc(${widthCharacter(3)})`,
                            `calc(${widthCharacter(4)})`,
                        ],
                        display: 'flex',
                    },
                    '.swiper-slide:first-of-type': {
                        justifyContent: 'flex-end',

                        width: [
                            `calc(${widthCharacter(
                                3
                            )} + max(0px,${paddingLeftSmall}))`,
                            `calc(${widthCharacter(
                                3
                            )} + max(0px,${paddingLeftSmall}))`,
                            `calc(${widthCharacter(
                                4
                            )} + max(0px,${paddingLeft}))`,
                        ],
                    },
                    '.swiper-slide:last-of-type': {
                        width: [
                            `calc(${widthCharacter(
                                3
                            )} + max(0px,${paddingLeftSmall}))`,
                            `calc(${widthCharacter(
                                3
                            )} + max(0px,${paddingLeftSmall}))`,
                            `calc(${widthCharacter(
                                4
                            )} + max(0px,${paddingLeft}))`,
                        ],
                    },
                }}
            >
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={30}
                    ref={swiperRef}
                >
                    <SwiperSlide>
                        <Character src={character1} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Character src={character2} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Character src={character3} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Character src={character4} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Character src={character5} />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Character src={character6} />
                    </SwiperSlide>
                </Swiper>
            </Box>
        </Box>
    )
}

function NavButton({ direction, onClick }) {
    return (
        <Box
            as="button"
            sx={{
                color: 'textInversed',
                width: 44,
                cursor: 'pointer',
                bg: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 44,
                borderRadius: 22,
                borderColor: 'textInversed',
                borderStyle: 'solid',
                borderWidth: 1,
            }}
            onClick={onClick}
        >
            {direction === 'left' ? <LeftArrow /> : <RightArrow />}
        </Box>
    )
}
function Character({ src }) {
    return (
        <>
            <Box
                sx={{
                    borderRadius: 1,
                    overflow: 'hidden',
                    img: { display: 'block' },
                    width: [
                        `calc(${widthCharacter(3)})`,
                        `calc(${widthCharacter(3)})`,
                        `calc(${widthCharacter(4)})`,
                    ],
                }}
            >
                <img alt="Character" src={src} height="auto" width="100%" />
            </Box>
        </>
    )
}
