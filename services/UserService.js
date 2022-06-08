export default class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async findAll() {
        return await this.userRepository.findAll();
    }

    async findById(userId) {
        return await this.userRepository.findById(userId);
    }

    async findForAutoSuggest(subString, limit) {
        return await this.userRepository.findForAutoSuggest(subString, limit);
    }

    async create(user) {
        return await this.userRepository.create(user);
    }

    async update(user) {
        return await this.userRepository.update(user);
    }

    async delete(user) {
        await this.userRepository.delete(user);
    }
}
