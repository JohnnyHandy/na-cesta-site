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
            '#ID': 'isDeal',
            '#PR': 'price',
            '#DP': 'dealPrice',
            '#PID': 'ProductId',
            '#IM': 'images',
            "#DC": 'description',
            '#DT': 'details',
            '#TP': 'type',
            '#MD': 'model'
          },
          ProjectionExpression: '#NM, #ID, #PR, #DP, #PID, #IM, #DC, #DT, #TP, #MD'
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

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
    const { data } = await fetchProductsData()

    data.forEach(product => {
      console.log('product', product)
      const node = {
        name: product.name,
        images: product.images.map(item => item.key),
        dealPrice: product.dealPrice,
        isDeal:  product.isDeal,
        ProductId: product.ProductId,
        price: product.price,
        description: product.description,
        details: product.details,
        type: product.type,
        model: product.model,
        id: createNodeId(`${product.ProductId}-${product.name}`),
        internal: {
          type: "Product",
          contentDigest: createContentDigest(data),
        },
      }
      actions.createNode(node)
    })
  }


exports.createPages = async ({ actions: { createPage }, graphql }) => {
    const result = await graphql(`
     {
        allProduct {
          nodes {
            ProductId
            name
            dealPrice
            images
            isDeal
            price
            description
            type
            details { size, colors { colorId, quantity } }
          }
        }
      }
      
    `)
    console.log('result', result.data.allProduct.nodes)
    createPage({
        path: '/',
        component: require.resolve('./src/templates/MainTemplate.js'),
        context: { productData: result.data.allProduct.nodes }
    })
    createPage({
      path: '/produtos',
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { productData: result.data.allProduct.nodes, title: 'Produtos' }
    })
    result.data.allProduct.nodes.forEach((item, index) => {
        createPage({
            path: `${item.ProductId}-${item.name.replace(/\s/g, '-')}`,
            component: require.resolve('./src/templates/ProdTemplate.js'),
            context: { product: item, productIndex: index }
        })
    })
    const resultForBiquinis = await graphql(`
      {
        allProduct(filter: {type: {eq: "biquini"}}) {
          edges {
            node {
              ProductId
              dealPrice
              name
              price
              images
            }
          }
        }
      }
    `)
    createPage({
      path: `/produtos/biquinis`,
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { products: resultForBiquinis.data.allProduct.edges, title: 'Biquinis' }
    })
    const resultForMaios = await graphql(`
      {
        allProduct(filter: {type: {eq: "maiô"}}) {
          edges {
            node {
              ProductId
              dealPrice
              name
              price
              images
            }
          }
        }
      }
    `)
    createPage({
      path: `/produtos/maios`,
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { products: resultForMaios.data.allProduct.edges, title: 'Maiôs' }
    })
    const resultForSaidas = await graphql(`
      {
        allProduct(filter: {type: {eq: "saida"}}) {
          edges {
            node {
              ProductId
              dealPrice
              name
              price
              images
            }
          }
        }
      }
    `)
    createPage({
      path: `/produtos/saidas`,
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { products: resultForSaidas.data.allProduct.edges, title: 'Saídas' }
    })
    const resultForDeals = await graphql(`
      {
        allProduct(filter: {isDeal: {eq: true}}) {
          edges {
            node {
              ProductId
              dealPrice
              name
              price
              images
            }
          }
        }
      }
    `)
    createPage({
      path: '/produtos/ofertas',
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { products: resultForDeals.data.allProduct.edges, title: 'Ofertas' }
    })
    createPage({
      path: '/carrinho',
      component: require.resolve('./src/templates/CartTemplate.js')
    })
    createPage({
      path: '/registrar',
      component: require.resolve('./src/templates/AuthTemplate.js'),
      context: { auth: 'register' }
    })
    createPage({
      path: '/entrar',
      component: require.resolve('./src/templates/AuthTemplate.js'),
      context: { auth: 'login' }
    })

}

