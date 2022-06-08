export const getOtherEmail = (users, currentUser) => {
  return users.filter(user => user !== currentUser?.name)[0]
}
