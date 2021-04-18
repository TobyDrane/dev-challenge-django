import React from 'react'
import {
    NumberInput as ChakraNumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

interface NumberInputProps {
    renderIncrementStepper: boolean
    renderDecrementStepper: boolean
    value: string | number
    step?: number
    readOnly?: boolean
    onNumberInputChange: (valueAsString: string, valueAsNumber: number) => void
}

const NumberInput: React.FC<NumberInputProps> = ({
    renderDecrementStepper,
    renderIncrementStepper,
    value,
    step,
    readOnly,
    onNumberInputChange,
}) => {
    return (
        <ChakraNumberInput
            step={step}
            value={value}
            onChange={onNumberInputChange}
            focusInputOnChange={false}
            isReadOnly={readOnly}
        >
            <NumberInputField />
            {renderDecrementStepper || renderDecrementStepper ? (
                <NumberInputStepper>
                    {renderIncrementStepper ? <NumberIncrementStepper /> : null}
                    {renderDecrementStepper ? <NumberDecrementStepper /> : null}
                </NumberInputStepper>
            ) : (
                <></>
            )}
        </ChakraNumberInput>
    )
}

export default NumberInput
