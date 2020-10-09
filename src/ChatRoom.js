import React, { useState, useEffect } from 'react'
import { Avatar } from '@material-ui/core'
import './ChatRoom.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
function ChatRoom({group}) {

    const [msg,setMsg] = useState([]);

    useEffect(() => {
            if(group._id) {
                async function getLastMsg() {
                    const message = await axios.get(`http://localhost:4000/message/${group._id}`);
                        setMsg(message.data);
                }
                getLastMsg();
            }
    },[group._id])

    return (
        <Link to={`/room/${group._id}`}><div className="chatroom">
            <Avatar/>
            <div className="chatroom__info">
                <h2>{group.name}</h2>
                <span>{msg[0]?.message}</span>
            </div>

        </div>
        </Link>
    )
}

const mapStateToProps = state => {
    return {
      user: state.user
    }
}

export default connect(mapStateToProps)(ChatRoom);
