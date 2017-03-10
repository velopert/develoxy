import axios from 'axios';

export const createPost = ({
    title,
    content,
    visibility,
    isTemp,
    categories,
    tags
}) => {
    return axios.post('/api/user/post', {
        title,
        content,
        visibility,
        isTemp,
        categories,
        tags
    });
}

