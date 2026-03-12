const USER = "q_user";

class UserStorage {
  // Save user details to local storage
  static saveUser(user) {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  // Get the complete user object
  static getUser() {
    return JSON.parse(window.localStorage.getItem(USER));
  }

  // Get only the User ID
  static getUserId() {
    const user = this.getUser();
    return user ? user.id : "";
  }

  // Get the User Role (ADMIN or USER)
  static getUserRole() {
    const user = this.getUser();
    return user ? user.role : "";
  }

  // Check if the logged-in user is an ADMIN
  static isAdminLoggedIn() {
    const role = this.getUserRole();
    return role === "ADMIN";
  }

  // Check if the logged-in user is a basic USER
  static isUserLoggedIn() {
    const role = this.getUserRole();
    return role === "USER";
  }

  // Clear storage on Sign Out
  static signOut() {
    window.localStorage.removeItem(USER);
  }
}

export default UserStorage;