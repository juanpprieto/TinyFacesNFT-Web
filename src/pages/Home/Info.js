import { Box, Text, Grid, Flex } from 'theme-ui'

export default function Info() {
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
                <Grid gap={2} columns={['1fr', '1fr', '1fr 1fr']}>
                    <Text
                        as="h1"
                        sx={{
                            fontFamily: 'heading',
                            fontSize: [6, 6, 8],
                            lineHeight: 1.1,
                            pr: [0, 0, 4],
                            maxWidth: 580,
                        }}
                    >
                        A new wave of collectibles is about to hit the{' '}
                        <Text as="span" sx={{ fontStyle: 'italic' }}>
                            blockchain
                        </Text>
                        .
                    </Text>
                    <Text as="p" sx={{ fontSize: [2, 2, 4], fontWeight: 300 }}>
                        Characterised by soft lighting, vintage colour schemes
                        and quirky costumes, these generative 3D TinyFaces are
                        the addition to your NFT collection you’ve been waiting
                        for.
                    </Text>
                </Grid>
            </Box>
        </Flex>
    )
}
