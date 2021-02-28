const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.story.belongsTo(models.user, { foreignKey: "authorId" });
    }
  }
  Story.init(
    {
      title: DataTypes.STRING,
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "story",
    }
  );
  return Story;
};
