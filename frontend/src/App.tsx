import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router'; // Нашият рутер
import MainLayout from './layouts/MainLayout'; // Нашият главен лейаут

function App() {
  return (
    <Router>
      <MainLayout> {/* Обграждаме рутера с основния лейаут */}
        <AppRouter />
      </MainLayout>
    </Router>
  );
}

export default App;