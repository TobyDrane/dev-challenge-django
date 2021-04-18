import React, { useState } from 'react'
import './App.css'
import { ChakraProvider, extendTheme, Flex, Heading, Box } from '@chakra-ui/react'
import DefaultLayout from './components/layouts/Default'
import theme from './theme'
import request from 'axios'
import InterestForm from './components/InterestForm'
import { AppState, InterestState } from './types'
import Breakdown from './components/Breakdown'

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
                        {appState?.chart && (
                            <Breakdown
                                totalInvestment={appState?.interestState?.totalInvestment || 0.0}
                                chart={appState?.chart}
                            />
                        )}
                    </Box>
                </Flex>
            </DefaultLayout>
        </ChakraProvider>
    )
}

export default App
