import React, {useEffect, useState} from 'react'
import "./Chat.css"
import {AttachFile, MoreVert, SearchOutlined} from "@material-ui/icons";
import {Avatar, IconButton} from "@material-ui/core"
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useParams } from "react-router-dom";
import MicIcon from '@material-ui/icons/Mic';
import db from "./firebase";
import firebase from "firebase";
import {useStateValue} from './StateProvider';


function Chat() {
    const [seed, setSeed] = useState("")
    const [input, setInput] = useState("")
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [message, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId) {
            db.collection("rooms").doc(roomId)
            .onSnapshot((snapshot) => setRoomName(snapshot.data().name));


            db.collection("rooms").doc(roomId).
            collection("message").orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId]);


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [])

const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typed", input);

    db.collection("rooms").doc.apply(roomId).collection("message")
    .add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
};

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar  src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} />

                <div className="chat__headerInfo">
                    <h1>{roomName}</h1>
                    <p>las seen {""}
                        {new Date(
                            message[message.length -1]?.timestamp?.toDate()
                            .toUTCString())}
                    </p>
                </div>

                <div className="chat__HeaderRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {message.map(message => (
                    <p className={`chat__message ${message.name === user.displayName &&
                        'chat__reciever'}`}>
                       <span className="chat__name">{message.name}</span>
                       {message.message}
                    <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                   </p>
                ))}
                
            </div>

            <div className="chat__footer">
                    <InsertEmoticonIcon />
                    <form>
                        <input value={input} 
                                onChange={(e) => setInput(e.target.value)} type="text" />
                        <button onClick={sendMessage}>Send a message</button>
                    </form>
                    <MicIcon />
            </div>
        </div>
    )
}

export default Chat
