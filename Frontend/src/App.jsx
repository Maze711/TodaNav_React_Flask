import { Toaster } from 'react-hot-toast';
import { UserForm } from './pages/UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{ 
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            style: {
              background: '#198754',
            },
          },
          error: {
            style: {
              background: '#dc3545',
            },
          },
        }} 
        reverseOrder={false}
      />
      <UserForm />
    </>
  );
}

export default App;