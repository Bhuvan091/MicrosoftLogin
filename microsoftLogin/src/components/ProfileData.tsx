import React from "react";

export const ProfileData: React.FC<{ graphData: any }> = ({ graphData }) => {
    return (
        <div id="profile-div">
            <p><strong>First Name: </strong> {graphData.givenName}</p>
            <p><strong>Last Name: </strong> {graphData.surname}</p>
            <p><strong>Email: </strong> {graphData.userPrincipalName}</p>
            <p><strong>Id: </strong> {graphData.id}</p>
        </div>
    );
};
