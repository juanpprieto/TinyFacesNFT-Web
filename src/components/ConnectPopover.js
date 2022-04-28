import { useState } from 'react'
import { Box, Button, Grid } from 'theme-ui'

function ConnectPopover({ connectResponse, connect }) {
    const [hidden, setHidden] = useState(true)

    return (
        <>
            <Button
                sx={{ mt: 2, cursor: 'pointer' }}
                onClick={() => setHidden(false)}
            >
                Connect your wallet
            </Button>
            {!hidden && (
                <Box
                    onClick={() => setHidden(true)}
                    sx={{
                        position: 'fixed',
                        zIndex: 1,
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bg: 'modal',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: 300,
                            bg: 'background',
                            borderRadius: 2,

                            p: 4,
                        }}
                    >
                        <Grid gap={2} columns={1}>
                            {connectResponse.data.connectors.map(
                                (connector) =>
                                    connector.ready && (
                                        <Button
                                            sx={{
                                                cursor: 'pointer',
                                                width: '100%',
                                            }}
                                            disabled={!connector.ready}
                                            key={connector.id}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                connect(connector)
                                            }}
                                        >
                                            {connector.name === 'Injected'
                                                ? 'MetaMask'
                                                : connector.name}
                                        </Button>
                                    )
                            )}
                        </Grid>
                        <Button
                            variant="secondary"
                            sx={{
                                cursor: 'pointer',
                                width: '100%',
                                mt: 2,
                            }}
                            onClick={(e) => {
                                setHidden(true)
                            }}
                        >
                            Cancel
                        </Button>
                        {connectResponse.error && (
                            <Box
                                sx={{
                                    mt: 4,
                                    fontSize: 1,
                                    color: 'primary',
                                    textAlign: 'center',
                                }}
                            >
                                {connectResponse.error?.message ??
                                    'Failed to connect'}
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
        </>
    )
}

export default ConnectPopover
