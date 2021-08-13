import { Text } from '@chakra-ui/react'
import  { ReactElement } from 'react'

import Header from '../components/Header'



export default function Index(): ReactElement {
    return (<>
        <Header />
            
        <Text>This in homepage</Text>
        </>
    )
}
