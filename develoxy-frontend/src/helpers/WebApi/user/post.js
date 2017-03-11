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

export const updatePost = ({
    postId,
    title,
    content,
    visibility,
    isTemp,
    categories,
    tags
}) => {
    return axios.patch(`/api/user/post/${postId}`, {
        title,
        content,
        visibility,
        isTemp,
        categories,
        tags
    });
}
