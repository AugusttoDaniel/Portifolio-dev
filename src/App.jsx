
import { GlobalStyle } from './styles/globalStyles';
import Header from './components/header';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
    </ThemeProvider>
  )
}

export default App
