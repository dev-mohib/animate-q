import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Provider } from 'react-redux';
import { store } from '@/state/store'
import FabricContextProvider from '@/context/fabricContext'
const appName = "AnimateQ"

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <Provider store={store}>
                <FabricContextProvider>
                    <App {...props} />
                </FabricContextProvider>
            </Provider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
