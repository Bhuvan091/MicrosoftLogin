import React, { useState } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest, graphConfig } from "../authConfig";
import { ProfileData } from "./ProfileData";
import Button from 'react-bootstrap/Button';

const ProfileContent: React.FC = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            fetch(graphConfig.graphMeEndpoint, {
                headers: { Authorization: `Bearer ${response.accessToken}` }
            })
                .then(response => response.json())
                .then(data => setGraphData(data));
        });
    }

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0]?.name}</h5>
            <br />
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button variant="secondary" onClick={RequestProfileData}>
                    Request Profile Information
                </Button>
            )}
        </>
    );
};

export default ProfileContent;
