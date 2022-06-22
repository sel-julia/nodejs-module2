export default class UserService {
    constructor(userModel, Op) {
        this.userModel = userModel;
        this.Op = Op;
    }

    async findAll() {
        return await this.userModel.findAll();
    }

    async findById(userId) {
        return await this.userModel.findByPk(userId);
    }

    async findForAutoSuggest(subString, limit) {
        return this.userModel.findAll({
            where: {
                login: {
                    [this.Op.substring]: subString
                }
            },
            order: [['login', 'DESC']],
            offset: 0,
            limit
        });
    }

    async create(user) {
        return await this.userModel.create(user);
    }

    async update(user) {
        return await this.userModel.update({
            login: user.login,
            password: user.password,
            age: user.age,
            isDeleted: user.isDeleted
        }, {
            where: {
                id: user.id
            }
        });
    }

    async delete(user) {
        return await this.userModel.destroy({
            where: {
                id: user.id
            }
        });
    }
}
