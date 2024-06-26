
import ReactDOM from 'react-dom/client'
import App from './app/layout/App.tsx'
import '../src/app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/Router/Route.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(

    <RouterProvider router={router} />
)
