// 로컬 스토리지에 JSON 형태로 저장 / 불러오기 / 삭제 헬퍼

const storage = {};

storage.set = (key, object) => {
    localStorage[key] = (typeof object) === 'string' ? object : JSON.stringify(object);
}

storage.get = (key) => {
    if(!localStorage[key]) {
        return null;
    }

    try {
        const parsed = JSON.parse(localStorage[key]);
        return parsed;
    } catch(e) {
        return localStorage[key];
    }
}

storage.remove = (key) => {
    if(localStorage[key]) {
        localStorage.removeItem(key);
    }
}

export default storage;