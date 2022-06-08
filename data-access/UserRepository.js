export default class UserRepository {
    constructor(models, Op) {
        this.models = models;
        this.Op = Op;
    }

    async findAll() {
        return await this.models.User.findAll();
    }

    async findById(userId) {
        return await this.models.User.findByPk(userId);
    }

    async findForAutoSuggest(subString, limit) {
        return this.models.User.findAll({
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
        return await this.models.User.create(user);
    }

    async update(user) {
        return await this.models.User.update({
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
        return await this.models.User.destroy({
            where: {
                id: user.id
            }
        });
    }
}

