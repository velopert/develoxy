const accounts = [
    {
      "id": "1",
      "username": "velopert",
      "email": "public.velopert@gmail.com",
      "friends": [
        "2",
        "3"
      ],
      "firstName": "Minjun",
      "lastName": "Kim"
    },
    {
      "id": "2",
      "username": "jn4kim",
      "email": "jn4kim@gmail.com",
      "friends": [
        "1",
        "4"
      ],
      "firstName": "Jayna",
      "lastName": "Kim"
    },
    {
      "id": "3",
      "username": "abet",
      "email": "abet@gmail.com",
      "friends": [
        "4"
      ],
      "firstName": "Abet",
      "lastName": "Bane"
    },
    {
      "id": "4",
      "username": "Betty",
      "email": "betty@gmail.com",
      "friends": [
        "1",
        "3"
      ],
      "firstName": "Betty",
      "lastName": "Cain"
    }
  ]




const findById = (id) => {
    return accounts.filter((account)=> {
        return account.id === id
    })[0]
};


module.exports = {
    Account: {
        friends: (account) => {
            return account.friends.map(findById);
        }
    }
}