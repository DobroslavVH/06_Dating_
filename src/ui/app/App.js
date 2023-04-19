import UserProvider from '../context/UserContext/Provider'
import AuthNavigator from '../navigation/AuthNavigator'
import { QueryClientProvider } from 'react-query'
import { reactQuery } from '../core/query'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs() // Ignore all log notifications
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Failed prop type:',
  'flexWrap:'
])

export default function App() {
  return (
    <QueryClientProvider client={reactQuery}>
      <UserProvider>
        <AuthNavigator />
      </UserProvider>
    </QueryClientProvider>
  )
}