import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'

export function useSupply({ contractConfig, address }) {
    const [didLoad, setDidLoad] = useState(false)

    const [totalSupplyRequest, getTotalSupply] = useContractRead(
        contractConfig,
        'totalSupply',
        { skip: !address }
    )
    const [whitelistSaleRequest, getWhitelistSale] = useContractRead(
        contractConfig,
        'whitelistSale',
        { skip: !address }
    )

    const [normalSaleRequest, getNormalSale] = useContractRead(
        contractConfig,
        'normalSale',
        { skip: !address }
    )

    const [maxSupplyRequest, getMaxSupply] = useContractRead(
        contractConfig,
        'maxSupply',
        { skip: !address }
    )

    const [mintRateRequest, getMintRate] = useContractRead(
        contractConfig,
        'mintRate',
        { skip: !address }
    )

    const [whitelistMintRateRequest, getWhitelistMintRate] = useContractRead(
        contractConfig,
        'whitelistMintRate',
        { skip: !address }
    )

    const [balanceOfRequest, getBalanceOf] = useContractRead(
        contractConfig,
        'balanceOf',
        { args: address, skip: !address }
    )

    const isLoading =
        totalSupplyRequest.loading ||
        whitelistSaleRequest.loading ||
        normalSaleRequest.loading ||
        mintRateRequest.loading ||
        whitelistMintRateRequest.loading ||
        balanceOfRequest.loading ||
        maxSupplyRequest.loading

    const isError =
        totalSupplyRequest.error ||
        whitelistSaleRequest.error ||
        normalSaleRequest.error ||
        mintRateRequest.error ||
        whitelistMintRateRequest.error ||
        balanceOfRequest.error ||
        maxSupplyRequest.error

    useEffect(() => {
        console.log('🔁 Loading balance of...')
        getBalanceOf()
        setDidLoad(true)
    }, [getBalanceOf])

    useEffect(() => {
        console.log('🔁 Loading all data from contract...')
        getTotalSupply()
        getWhitelistSale()
        getNormalSale()
        getMaxSupply()
        getMintRate()
        getWhitelistMintRate()
        setDidLoad(true)
    }, [
        getMaxSupply,
        getTotalSupply,
        getWhitelistMintRate,
        getWhitelistSale,
        getMintRate,
        getNormalSale,
    ])

    const isWhitelistSale = whitelistSaleRequest.data
    const isNormalSale = normalSaleRequest.data
    const maxSupply = maxSupplyRequest.data
    const mintRate = mintRateRequest.data
    const whitelistMintRate = whitelistMintRateRequest.data
    const balanceOf = balanceOfRequest.data
    const totalSupply = totalSupplyRequest.data

    return {
        isWhitelistSale,
        isNormalSale,
        maxSupply,
        mintRate,
        totalSupply,
        whitelistMintRate,
        balanceOf,
        isLoading: didLoad ? isLoading : true,
        isError,
    }
}
