export default class UserDao {
  constructor(model) {
    this.model = model;
  }

  async getUserById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUserByEmail(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }

  async register(user) {
    try {
      const { email } = user;
      const userExist = await this.model.findOne({ email });
      if (userExist) return null;
      return this.model.create(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }
}
