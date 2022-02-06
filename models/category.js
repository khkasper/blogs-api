module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, { tablename: 'Categories', timestamps: false });

  return Category;
};