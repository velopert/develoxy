import React from 'react';
import { Input } from 'semantic-ui-react';

const TagInput = () => {
    return (
        <div>
            <Input 
                className="tag-input" 
                placeholder="태그"
                icon="tag" 
                iconPosition="left"
            />
        </div>
    );
};

export default TagInput;