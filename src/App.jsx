import { Flex } from 'antd'

import { TransactionsTable } from './components/TransactionsTable'

const App = () => {
  return (
    <Flex justify='center'>
      <TransactionsTable />
    </Flex>
  )
}

export default App