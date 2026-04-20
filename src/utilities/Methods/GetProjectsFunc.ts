import React from "react";

export async function GetProjects(){
    const response = await fetch(import.meta.env.VITE_PROJECTS_SERVER_URL);
    const data = await response.json();
    return data;
}