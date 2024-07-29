import React, { useEffect } from 'react';
import { PublicClientApplication, EventType, AuthenticationResult } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import PageLayout from './components/PageLayout';
import './App.css';

const msalInstance = new PublicClientApplication(msalConfig);

const App: React.FC = () => {
    useEffect(() => {
        msalInstance.addEventCallback((event) => {
            if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
                const payload = event.payload as AuthenticationResult;
                const account = payload.account;
                msalInstance.setActiveAccount(account);
            }
        });
    }, []);

    return (
        <MsalProvider instance={msalInstance}>
            <PageLayout />
        </MsalProvider>
    );
};

export default App;
