import React, { useState } from 'react'
import { Box, Text, Grid, Flex } from 'theme-ui'
import Collapsible from 'react-collapsible'

import Minus from '../../components/icons/Minus'
import Plus from '../../components/icons/Plus'

export default function Questions() {
    return (
        <Flex
            sx={{
                justifyContent: 'center',
                alignItems: 'center',
                py: [8, 8, 9],
                px: [5, 5, 6],
            }}
        >
            <Box sx={{ maxWidth: 1230 }}>
                <Grid columnGap={5} columns={['1fr', '1fr', '500px auto']}>
                    <Text
                        as="h1"
                        sx={{
                            fontFamily: 'heading',
                            fontSize: [6, 6, 8],
                            lineHeight: 1.1,
                            mb: [4, 4, 0],
                        }}
                    >
                        Your questions,{' '}
                        <Text as="span" sx={{ fontStyle: 'italic' }}>
                            answered
                        </Text>
                        .
                    </Text>
                    <Box>
                        <Item title="What’s an NFT?">
                            Much like an autographed book or a rare coin, NFTs
                            (non-fungible tokens) are unique digital items that
                            cannot be easily exchanged for something of similar
                            value, simply because their distinctive properties
                            make them one-of-a-kind. Since no two NFTs are
                            exactly alike, their value is based on the rarity of
                            the item and the community driving it.
                        </Item>
                        <Item title="What makes TinyFaces special?">
                            Our community is everything to us, and that’s why we
                            have developed a unique technology that analyses the
                            authenticity of our user base and with that, filters
                            out bots and other spam accounts. By joining
                            TinyFaces, you will access a genuine community of
                            designers, entrepreneurs, artists, and crypto
                            enthusiasts.
                        </Item>

                        <Item title="Who’s the team behind TinyFaces NFT?">
                            Tinyfaces is an NFT project run in collaboration
                            between <b>Maxime De Greve</b>, developer and artist
                            behind the 3D characters, and{' '}
                            <b>Filippo Chiumiento</b>, designer who looks after
                            the branding and other digital communications.
                        </Item>

                        <Item title="When does minting begin?">
                            Whitelisted members can start minting on April 22nd
                            2022. Public sale will follow after 24 hours. Follow
                            our Twitter page or join our Discord server to get
                            the latest updates and be the first one to know.
                        </Item>

                        <Item title="Who can mint one?">
                            The initial distribution will be reserved to those
                            who have been whitelisted and assigned a TinyOG role
                            inside our Discord channel.
                        </Item>
                    </Box>
                </Grid>
            </Box>
        </Flex>
    )
}

function Item({ title, children }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Collapsible
            onOpening={() => setIsOpen(true)}
            onClosing={() => setIsOpen(false)}
            trigger={
                <Flex
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTopStyle: 'solid',
                        borderTopColor: 'border',
                        borderTopWidth: 1,
                        cursor: 'pointer',
                        py: [4, 4, 6],
                    }}
                >
                    <Text as="h2" sx={{ fontSize: [3, 3, 4], fontWeight: 400 }}>
                        {title}
                    </Text>
                    {isOpen ? <Minus /> : <Plus />}
                </Flex>
            }
        >
            <Text as="p" sx={{ fontSize: [2, 2, 3], fontWeight: 300, pb: 7 }}>
                {children}
            </Text>
        </Collapsible>
    )
}
