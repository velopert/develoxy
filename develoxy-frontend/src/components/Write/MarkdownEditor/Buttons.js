import React from 'react';

const Buttons = ({ onSave, onRelease, saving, releasing }) => {
    return (
        <div className="buttons">
            <div className="save" onClick={()=>onSave(true)}>임시저장</div>
            <div className="release" onClick={()=>onSave(false)}>게시</div>
        </div>
    );
};

export default Buttons;