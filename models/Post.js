const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   defaultValue: 'nextval("Sensor_id_seq"::regclass)',
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id:{
      type:DataTypes.INTEGER,
      allowNull: false,
      references:{model:'users',key:'id'}

    }

  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,

    underscored: true,
    modelName: 'posts',
  }
);

module.exports = Post;
