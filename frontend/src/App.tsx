import React, { useState } from 'react'
import './App.css'
import { ChakraProvider, extendTheme, Flex, Heading, Box, Text } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import LineChart from './components/LineChart'
import theme from './theme'
import request from 'axios'
import InterestForm from './components/InterestForm'
import { AppState, InterestState } from './types'

const defaultTheme = extendTheme(theme)

function App() {
    const [appState, setAppState] = useState<AppState>()

    // Callback from interest state form, we get back a new interest state
    // NOTE: This has already been debounced, this has been handled directly
    // by that component
    const onInterestStateChange = async (state: InterestState) => {
        const newAppState: AppState = { ...appState }
        newAppState.interestState = state

        // Fire interest to API to handle calculation
        const response = await request.post('/interest-data/', {
            initial: state.initialDeposit,
            interest: state.interest,
            monthly: state.monthlyDeposit,
            duration: state.duration,
        })
        const { data } = response
        if (data && data.result) {
            const { result } = data
            const xAxis = Array.from(Array(result.length).keys())
            newAppState.chart = { xAxis, yAxis: result }
        }

        setAppState(newAppState)
    }

    return (
        <ChakraProvider theme={defaultTheme}>
            {/* We've just bundled everything into one file here to 
            get you started!*/}
            <DefaultLayout>
                <Flex flex="1">
                    <Box flex="60%" flexDirection="column" px="6%" py="3%">
                        <Heading size="md" pb="6%">
                            Interest Calculator
                        </Heading>
                        <InterestForm onInterestChange={onInterestStateChange} />
                    </Box>
                    <Box bg="grey1" flex="40%" flexDirection="column" px="4%" py="3%">
                        <Heading size="md" pb="6%">
                            Yearly Breakdown
                        </Heading>
                        <Flex flexDirection="row" justifyContent="space-between" pb="5%">
                            <Box>
                                <Text>Will Give</Text>
                                <Heading size="sm" pt="5px">{`£${
                                    appState?.interestState?.totalInvestment || 0.0
                                }`}</Heading>
                            </Box>
                            <Box>
                                <Text>Will Yield</Text>
                                <Heading size="sm" pt="5px">{`£${
                                    appState?.chart?.yAxis[appState.chart.yAxis.length - 1]
                                }`}</Heading>
                            </Box>
                        </Flex>
                        {appState?.chart?.xAxis && appState.chart.yAxis ? (
                            <LineChart
                                title="Savings Over time"
                                xAxisData={appState.chart.xAxis}
                                yAxisData={appState.chart.yAxis}
                                xLabel="Years"
                                yLabel="Amount"
                            />
                        ) : null}
                    </Box>
                </Flex>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
