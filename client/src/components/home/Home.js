import React, {useContext, useState, useEffect} from 'react';
import {UserContext} from '../../UserContext';
import {Link} from 'react-router-dom';
import RoomList from './RoomList';
import io from 'socket.io-client';
let socket;
const Home = () => {
    const ENDPT = 'localhost:5000';
    useEffect(() => {
        socket = io(ENDPT);
        return () => {
            socket.emit("disconnect");
            // console.log(socket.emit());
            socket.off();
        }
    }, [ENDPT])
    const {user, setUser} = useContext(UserContext);
    const [room, setRoom] = useState();
    const handleSubmit = e=>{
        e.preventDefault();
        socket.emit('create-room', room);
        console.log(room);
        setRoom('');
    }

    // const SetRoomOnChange = (data) =>{
    //     console.log(data);
    //     // /setRoom(data);
    // }

    const rooms =[
        {
            name: 'room1',
            _id: '123'},
        {
            name: 'room2',
            _id: '456'
        }
    ]
    const setAsJohn = ()=> {
        const john = {
            name: 'John',
            email: 'john@gmail.com',
            password: '123'
        }
        setUser(john);
    }
    const setAsTom = ()=> {
        const tom = {
            name: 'Tom',
            email: 'tom@gmail.com',
            password: '123',
            id: '456'
        }
        setUser(tom);
    }
    return (
        <div>
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Welcome {user? user.name:''}</span>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder="Enter a room name" id="room" type="text" className="validate" 
                                        value={room}
                                        // onChange={(e) => SetRoomOnChange(e.target.value)}
                                        onChange={e=>setRoom(e.target.value)}
                                        />
                                        <label htmlFor="room">Room</label>
                                    </div>
                                </div>
                                <button className="btn">Create Room</button>
                            </form>
                        </div>
                        <div className="card-action">
                            <a href="#" onClick={setAsJohn}>Set as John</a>
                            <a href="#" onClick={setAsTom}>Set as Tom</a>
                        </div>
                    </div>
                </div>
                <div className="col s6 m5 offset-1">
                    <RoomList rooms={rooms}/>
                </div>
            </div>
            <Link to={'/chat'}>
                <button>go to chat</button>
            </Link>
        </div>
    )
}

export default Home;