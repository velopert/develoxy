import React from 'react';

const Buttons = ({ onSave, onRelease, saving, releasing, isTemp }) => {
    return (
        <div className="buttons">
            { isTemp ? (
                <div>
                    <div className="save" onClick={()=>onSave(true)}>임시저장</div>
                    <div className="release" onClick={()=>onSave(false)}>게시</div>
                </div>
            ) : (
                <div className="update" onClick={()=>onSave(false)}>
                    업데이트
                </div>
            ) }
        </div>
    );
};

export default Buttons;