module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        displayName: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        password: '$argon2i$v=19$m=4096,t=3,p=1$MFWZmvATfB4dh9qSRd2ouQ$9Wun2oELH7TXcgg+6wszK/YSbuliWGtyK2S2YLrwqNc',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      },
      {
        id: 2,
        displayName: 'Michael Schumacher',
        email: 'MichaelSchumacher@gmail.com',
        password: '$argon2i$v=19$m=4096,t=3,p=1$MFWZmvATfB4dh9qSRd2ouQ$9Wun2oELH7TXcgg+6wszK/YSbuliWGtyK2S2YLrwqNc',
        image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
