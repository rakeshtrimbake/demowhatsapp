import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton, Button, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Chat from "./Chat";
import ChatRoom from "./ChatRoom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import axios from 'axios';
import {connect} from 'react-redux';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Sidebar(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [room,setRoom] = useState('');
  const [groups,setGroups] = useState([]);
  const [search,setSearch] = useState("");
  const [searchData,setSearchData] = useState([]);

  useEffect(() => {
      async function getGroups() {
          const groupData = await axios.get('http://localhost:4000/room');
          setGroups(groupData.data);
      }
      
     getGroups();
      console.log(groups);

  }, [])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   async function createRoom() {
            const roomData = await axios.post('http://localhost:4000/room',{
                name:room
            });
            setOpen(false);
            setGroups([...groups,roomData.data])
            setRoom('');
  }

  useEffect(() => {
    async function searchRoom(){
      
      const room = await axios.get(`http://localhost:4000/room/name/${search}`);
         setSearchData(room.data);
    }
    searchRoom();
  },[search])
  
  return ( 
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={props.user.imageUrl}/>
        <div className="sidebar__headerInfo">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchInfo">
          <SearchIcon className="sidebar__search__icon" />
          <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder="search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chat">
        {search != "" ?<h2 className="sidebar__chatTitle">CHATS</h2>:null}
        {search != "" ? searchData.map(group => {
          return <ChatRoom group={group}/>
        }):null}
      </div>
      <div className="sidebar__group">
        <Button variant="contained" onClick={handleOpen} color="primary">
          Create New Group
        </Button>
      </div>
      <div className="sidebar__chatRoom">
          {groups.map((group => {
              return <ChatRoom group={group}/>
          }))}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Create Group</h2>
            <TextField id="standard-basic" label="Group Name" value={room} onChange={e => setRoom(e.target.value)}/>
            <br></br><br></br>
            <Button className="modal__button" variant="contained" onClick={(e) => createRoom(e)} color="primary">
              SUBMIT
            </Button>
            <Button className="modal__button" variant="contained" onClick={handleClose} color="primary">
              CANCEL
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Sidebar);
