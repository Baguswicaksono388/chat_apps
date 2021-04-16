import React, {useContext} from 'react';
import {UserContext} from '../../UserContext';
import {Link} from 'react-router-dom';
const Home = () => {
    const {user, setUser} = useContext(UserContext);
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
            <h1>Home {JSON.stringify(user)}</h1>
            <button onClick={setAsJohn}>set as John</button>
            <button onClick={setAsTom}>set as Tom</button>
            <Link to={'/chat'}>
                <button>go to chat</button>
            </Link>
        </div>
    )
}

export default Home;