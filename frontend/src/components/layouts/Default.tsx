import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import NavHeader from '../NavHeader'

type LayoutProps = {
    children: React.ReactNode
}

const DefaultLayout = ({ children }: LayoutProps) => (
    <Box display="flex" minHeight="100vh" height="100%" flexDirection="column">
        <NavHeader />
        <Flex flex="1" width="100%">
            {children}
        </Flex>
    </Box>
)

export default DefaultLayout
