import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './routes.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
                <AppRoutes />
                <ReactQueryDevtools
                    initialIsOpen={false}
                    buttonPosition='bottom-left'
                />
               
                <Toaster
                    position='top-right'
                    reverseOrder={false}
                    gutter={8}
                    containerStyle={{
                        margin: '8px',
                    }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 3000,
                        },
                        style: {
                            fontSize: '16px',
                            maxWidth: '800px',
                            padding: '16px 24px',
                        },
                    }}
                />
        </QueryClientProvider>
    </StrictMode>
);
