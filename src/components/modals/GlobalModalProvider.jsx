// GlobalModalProvider.jsx
import React from "react";
import { useSelector } from "react-redux";

// Import all your modals
import CreateTaskModal from "./CreateTaskModal";
import AddNewMemberModal from "./AddNewMemberModal";

const GlobalModalProvider = () => {
    const modals = useSelector(state => state.modal)
    console.log("MODAL", modals)

    return (
        <>
            {modals.createTaskModal && <CreateTaskModal />}
            {modals.addNewMemberModal && <AddNewMemberModal />}
        </>
    );
};

export default GlobalModalProvider;