export default class GroupService {
    constructor(groupModel, Op, userModel) {
        this.groupModel = groupModel;
        this.Op = Op;
        this.userModel = userModel;
    }

    async findAll() {
        return await this.groupModel.findAll({
            include: this.userModel
        });
    }

    async findById(groupId) {
        return await this.groupModel.findByPk(groupId, {
            include: this.userModel
        });
    }

    async create(group) {
        return await this.groupModel.create(group);
    }

    async update(group) {
        return await this.groupModel.update({
            name: group.name,
            permissions: group.permissions
        }, {
            where: {
                id: group.id
            }
        });
    }

    async delete(group) {
        return await this.groupModel.destroy({
            where: {
                id: group.id
            }
        });
    }
}
