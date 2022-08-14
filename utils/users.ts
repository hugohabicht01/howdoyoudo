interface UserType {
  id: string
  name: string
}

class Users {
  public users: UserType[]
  constructor() {
    this.users = []
  }

  addUser<T extends UserType | UserType[]>(newUser: T) {
    if (Array.isArray(newUser))
      this.users.push(...newUser)
    else
      this.users.push(newUser)

    return newUser
  }

  getUser(userid: string) {
    return this.users.find(user => user.id === userid)
  }

  deleteUser(userid: string) {
    const userIdx = this.users.findIndex(user => user.id === userid)
    if (userIdx === -1)
      return false
    this.users.splice(userIdx, 1)
    return true
  }
}

export const userDB = new Users()

// Populate fakeDB with some data
userDB.addUser([{ id: '1', name: 'Hugo' }, { id: '2', name: 'Jack' }])
