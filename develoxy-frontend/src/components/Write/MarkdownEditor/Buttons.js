import React from 'react';

const Buttons = ({ onCreate, onRelease, saving, releasing }) => {
    return (
        <div className="buttons">
            <div className="save" onClick={()=>onCreate(true)}>임시저장</div>
            <div className="release" onClick={()=>onCreate(false)}>게시</div>
        </div>
    );
};

export default Buttons;