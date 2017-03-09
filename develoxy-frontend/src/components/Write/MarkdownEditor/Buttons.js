import React from 'react';

const Buttons = ({ onSave, onRelease, saving, releasing }) => {
    return (
        <div className="buttons">
            <div className="save">임시저장</div>
            <div className="release">게시</div>
        </div>
    );
};

export default Buttons;