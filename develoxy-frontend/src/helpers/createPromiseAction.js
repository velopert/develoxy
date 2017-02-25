const createPromiseAction = (type, promise) => (payload) => ({
    type,
    payload: {
        promise: promise(payload)
    }
})


export default createPromiseAction;