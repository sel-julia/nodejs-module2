export default class UserService {
    constructor(userModel, Op, groupModel) {
        this.userModel = userModel;
        this.Op = Op;
        this.groupModel = groupModel;
    }

    async findAll() {
        return await this.userModel.findAll({
            include: this.groupModel
        });
    }

    async findById(userId) {
        return await this.userModel.findByPk(userId, {
            include: this.groupModel
        });
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

    async findByUserNameAndPassword(userName, password) {
        return await this.userModel.findAll({
            where: {
                login: userName,
                password
            }
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
