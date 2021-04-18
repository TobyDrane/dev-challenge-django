import React from 'react'
import { Grid, GridItem } from '@chakra-ui/react'

interface SingleFormItemProps {
    gridLeftComponent: React.ReactNode
    gridRightComponent: React.ReactNode
}

const SingleFormItem: React.FC<SingleFormItemProps> = ({
    gridLeftComponent,
    gridRightComponent,
}) => {
    return (
        <Grid gap={10} templateColumns="3fr 1fr" mb="5%">
            <GridItem>{gridLeftComponent}</GridItem>
            <GridItem margin="auto 0">{gridRightComponent}</GridItem>
        </Grid>
    )
}

export default SingleFormItem
