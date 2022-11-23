import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./style.css";


function Director(props) {
    const { id, name, lastName } = props;

    return (
        <div className="directors">
            {id}.  {name} {lastName}
        </div>
    );
}

function Form(props) {
    const [ newDirector, setNewDirector ] = useState('');
    const newDirectorInput = React.createRef();

    const handleChange = () => {
        setNewDirector(newDirectorInput.current.value)
    };

    const handleClick = () => {   
        const [ name, lastName ] = newDirector.split(' ');
        props.onClick({ name, lastName });

        setNewDirector('');
    };

    return (
        <div id="form-container">
            <h4> { newDirector } </h4>
            <input 
                type="text" 
                value={ newDirector } 
                ref={ newDirectorInput } 
                onChange={ handleChange } 
            />
            <input 
                type="button" 
                value="Добавить" 
                onClick={ handleClick } 
            />
        </div>
    );
}

function DirectorsList() {
    const initialDirectorsList = [
        { 
            id: 1,
            name: 'James',
            lastName: 'Cameron'
        },
        { 
            id: 2,
            name: 'Quentin',
            lastName: 'Tarantino'
        },
        { 
            id: 3,
            name: 'Clint',
            lastName: 'Eastwood'
        }
    ];
    
    const [ directorsList, setNewDirector] = useState(initialDirectorsList);

    const addNewDirector = newDirector => {
        const newDirectorsList = directorsList.slice();
        
        newDirector = { 
            id: directorsList.length + 1,
            ... newDirector
        };

        newDirectorsList.push( newDirector );
        setNewDirector( newDirectorsList );
    };

    return (
        <>
            <div>
                { directorsList.map(director => {
                    return <Director key={ director.id } { ...director } />;
                }) }
            </div>
            <Form onClick={ addNewDirector } />
        </>
    );
}

ReactDOM.render(<DirectorsList />, document.getElementById('root'));
