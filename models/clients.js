import bcrypt from 'bcrypt';

module.exports = (sequelize, DataType) => {
  const Clients = sequelize.define("Clients", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    secret: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    timestamps: false,
    hooks: {
      beforeCreate: client => {
        const salt = bcrypt.genSaltSync();
        client.secret = bcrypt.hashSync(client.secret, salt);
      }
    },
    classMethods: {
      isPassword: (encodedPassword, password) => {
        return bcrypt.compareSync(password, encodedPassword);
      }
    }
  });

  return Clients;
};
