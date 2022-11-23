import {ChangeEvent, useState} from "react";
import Modal from 'react-modal';
import {TravelerModel} from "./TravelerModel/TravelerModel";
import axios from "axios";

type TravelerModalProps = {
    modalIsOpen: boolean,
    traveler: TravelerModel
    closeModal: () => void,
    fetchAllTraveler: () => void,

}

export default function TravelerModal(props: TravelerModalProps) {
    const [name, setName] = useState(props.traveler.name)

    function handleNewName(event: ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }


    function updateTraveler() {
        axios.put("/api/travelers/" + props.traveler.id, {
            id: props.traveler.id,
            name
        })
            .then(response => {
                props.fetchAllTraveler()
                props.closeModal()
                return response.data
            })
            .catch(error => console.log("error =>" + error))
    }

    return (
        <div>
            <Modal
                isOpen={props.modalIsOpen}
                onRequestClose={props.closeModal}
            >
                <div>I am a modal</div>
                <form>
                    <label>name:</label>
                    <input type={"text"} value={name} onChange={handleNewName}/>
                    <button onClick={props.closeModal}>close</button>
                    <button onClick={updateTraveler}>update</button>
                </form>
            </Modal>
        </div>
    )
}