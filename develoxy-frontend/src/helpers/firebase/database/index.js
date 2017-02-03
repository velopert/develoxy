import users from './users';

// 편의를 위해 모듈화
const databaseHelper = (() => {
    return {
        initialize: (database) => {
            // 각 데이터베이스 헬퍼들을 initalize 한다
            users.initialize(database);
        }
    }
})();

export default databaseHelper;