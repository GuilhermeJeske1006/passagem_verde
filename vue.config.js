const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
  devServer: {
    proxy: 'https://7fhxhtheo0.execute-api.us-east-1.amazonaws.com',
  },
};
