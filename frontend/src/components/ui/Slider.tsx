import React from 'react'
import {
    Slider as ChakraSlider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from '@chakra-ui/react'

const SLIDER_DEFAULT = {
    min: 1,
    max: 10000,
    step: 1,
    colorScheme: 'green',
    track: { height: 9, borderRadius: 15 },
    thumb: { width: 15, height: 30 },
}

interface SliderProps {
    defaultValue: number
    value: number
    onSliderChange: (value: number) => void
    min?: number
    max?: number
    step?: number
}

// High Level Slider component
const Slider: React.FC<SliderProps> = ({ defaultValue, value, onSliderChange, min, max, step }) => {
    return (
        <ChakraSlider
            defaultValue={defaultValue}
            value={value}
            onChange={onSliderChange}
            min={min || SLIDER_DEFAULT.min}
            max={max || SLIDER_DEFAULT.max}
            step={step || SLIDER_DEFAULT.step}
            colorScheme={SLIDER_DEFAULT.colorScheme}
            focusThumbOnChange={false}
        >
            <SliderTrack
                height={`${SLIDER_DEFAULT.track.height}px`}
                borderRadius={`${SLIDER_DEFAULT.track.borderRadius}px`}
            >
                <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb
                width={`${SLIDER_DEFAULT.thumb.width}px`}
                height={`${SLIDER_DEFAULT.thumb.height}px`}
            />
        </ChakraSlider>
    )
}

export default Slider
