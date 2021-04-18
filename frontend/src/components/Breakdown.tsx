import React from 'react'
import { Flex, Box, Text, Heading } from '@chakra-ui/react'
import LineChart from './LineChart'

interface BreakdownProps {
    totalInvestment: number
    chart: {
        xAxis: number[] | string[]
        yAxis: number[]
    }
}

const Breakdown: React.FC<BreakdownProps> = ({ totalInvestment, chart }) => {
    return (
        <>
            <Flex flexDirection="row" justifyContent="space-between" pb="5%">
                <Box>
                    <Text>Will Give</Text>
                    <Heading size="sm" pt="5px">{`£ ${totalInvestment}`}</Heading>
                </Box>
                <Box>
                    <Text>Will Yield</Text>
                    <Heading size="sm" pt="5px">{`£ ${
                        chart.yAxis[chart.yAxis.length - 1]
                    }`}</Heading>
                </Box>
            </Flex>
            {chart && (
                <LineChart
                    title="Savings Over time"
                    xAxisData={chart.xAxis}
                    yAxisData={chart.yAxis}
                    xLabel="Years"
                    yLabel="Amount"
                />
            )}
        </>
    )
}

export default Breakdown
