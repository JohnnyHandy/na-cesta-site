/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
var axios = require('axios')

const fetchProductsData = () => {
    const paramAttributes = {
        ExpressionAttributeNames: {
            '#NM': 'name',
            '#MD': 'model',
            '#ID': 'isDeal',
            '#PR': 'price',
            '#DP': 'dealPrice',
            '#PID': 'ProductId',
            '#IM': 'images'
          },
          ProjectionExpression: '#NM, #MD, #ID, #PR, #DP, #PID, #IM'
    }
    const options = {
        method: 'POST',
        url: 'https://lhpx7am1gk.execute-api.sa-east-1.amazonaws.com/dev/products',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'allow',
        },
        data: {
            action: 'scan',
            paramAttributes
        }
    }
    return axios(options).then(response => {
        return response
    }).catch(error => error)
}



exports.createPages = async ({ actions: { createPage } }) => {
    const { data } = await fetchProductsData()
    const productData = data
    console.log('data', data)
    createPage({
        path: '/',
        component: require.resolve('./src/templates/MainTemplate.js'),
        context: { productData }
    })
}