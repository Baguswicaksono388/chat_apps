import React from 'react'

const RoomList = ({rooms}) => {
    return (
        <div>
            {rooms && rooms.map(room =>(<div key={room._id}>{room.name}</div>))}
        </div>
    )
}

export default RoomList
