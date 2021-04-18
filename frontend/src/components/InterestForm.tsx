import React, { useState, useEffect } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import SingleFormItem from './layouts/SingleFormItem'
import NumberInput from './ui/NumberInput'
import Slider from './ui/Slider'
import useDebounce from '../hooks/useDebounce'
import { InterestState } from '../types'

// For our props we only have a onInterestChange callback
interface InterestFormProps {
    onInterestChange: (interestState: InterestState) => void
}

const DEFAULT_INTEREST_STATE = {
    initialDeposit: 800,
    interest: 1.25,
    monthlyDeposit: 10,
    duration: 50,
}

// Simple sum of our initial deposit and how many monthly payments we make over the duration
const calculateTotalInvestment = (
    initialDeposit: number,
    monthlyDeposit: number,
    duration: number
): number => {
    const monthsInDuration = 12 * duration
    const total = initialDeposit + monthsInDuration * monthlyDeposit
    return +(Math.round(total * 100) / 100).toFixed(2)
}

const InterestForm: React.FC<InterestFormProps> = ({ onInterestChange }) => {
    // Interest state form, normally what we will fire back to the API
    const [interestState, setInterestState] = useState<InterestState>({
        initialDeposit: DEFAULT_INTEREST_STATE.initialDeposit,
        interest: DEFAULT_INTEREST_STATE.interest,
        monthlyDeposit: DEFAULT_INTEREST_STATE.monthlyDeposit,
        duration: DEFAULT_INTEREST_STATE.duration,
        totalInvestment: calculateTotalInvestment(
            DEFAULT_INTEREST_STATE.initialDeposit,
            DEFAULT_INTEREST_STATE.monthlyDeposit,
            DEFAULT_INTEREST_STATE.duration
        ),
    })
    // We debounce the state because of the slider onChange value, as we will fire to the API
    // we will overload server unless we debounce the values
    const debouncedInterestState = useDebounce(interestState, 400)

    useEffect(() => {
        // Debounced interestState change, fire our props onInterestChange function
        onInterestChange(debouncedInterestState)
    }, [debouncedInterestState])

    // Set state initial deposit value
    const setInitialDeposit = (deposit: number) =>
        setInterestState({
            ...interestState,
            initialDeposit: deposit,
            totalInvestment: calculateTotalInvestment(
                deposit,
                interestState.monthlyDeposit,
                interestState.duration
            ),
        })

    // Set state monthly deposit value
    const setMonthlyDeposit = (deposit: number) =>
        setInterestState({
            ...interestState,
            monthlyDeposit: deposit,
            totalInvestment: calculateTotalInvestment(
                interestState.initialDeposit,
                deposit,
                interestState.duration
            ),
        })

    // Set state interest rate
    const setInterestRate = (rate: number) => setInterestState({ ...interestState, interest: rate })

    const format = (val: number) => `$` + val
    const formatPercent = (val: number) => `${val}%`

    const parse = (val: string) => parseFloat(val.replace(/^\$/, '')) || 0.0

    return (
        <Flex flexDirection="column">
            <SingleFormItem
                gridLeftComponent={
                    <>
                        <Text pb="3px">Initial Deposit</Text>
                        <Slider
                            defaultValue={interestState.initialDeposit}
                            value={interestState.initialDeposit}
                            onSliderChange={setInitialDeposit}
                        />
                    </>
                }
                gridRightComponent={
                    <NumberInput
                        value={format(interestState.initialDeposit)}
                        onNumberInputChange={(e) => setInitialDeposit(parse(e))}
                        renderIncrementStepper
                        renderDecrementStepper
                    />
                }
            />
            <SingleFormItem
                gridLeftComponent={
                    <>
                        <Text pb="3px">Monthly Deposit</Text>
                        <Slider
                            defaultValue={interestState.monthlyDeposit}
                            value={interestState.monthlyDeposit}
                            onSliderChange={setMonthlyDeposit}
                        />
                    </>
                }
                gridRightComponent={
                    <NumberInput
                        value={format(interestState.monthlyDeposit)}
                        onNumberInputChange={(e) => setMonthlyDeposit(parse(e))}
                        renderDecrementStepper
                        renderIncrementStepper
                    />
                }
            />
            <SingleFormItem
                gridLeftComponent={
                    <>
                        <Text pb="3px">Interest Rate (Yearly)</Text>
                        <Slider
                            defaultValue={interestState.interest}
                            value={interestState.interest}
                            onSliderChange={setInterestRate}
                            min={0.1}
                            max={10}
                            step={0.05}
                        />
                    </>
                }
                gridRightComponent={
                    <NumberInput
                        value={formatPercent(interestState.interest)}
                        onNumberInputChange={(e) => setInterestRate(parse(e))}
                        renderDecrementStepper={false}
                        renderIncrementStepper={false}
                        step={0.05}
                        readOnly
                    />
                }
            />
        </Flex>
    )
}

export default InterestForm
