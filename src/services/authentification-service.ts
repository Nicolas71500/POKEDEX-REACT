export default class AuthentificationService {
  static isAuthenticated: boolean = false;

  static login(username: string, password: string): Promise<boolean> {
    const isAuthenticated = username === "Pikachu" && password === "Pikachu";

    return new Promise((resolve) => {
      setTimeout(() => {
        this.isAuthenticated = isAuthenticated;
        resolve(isAuthenticated);
      }, 1000);
    });
  }
}
