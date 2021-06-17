/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using itq
import http from './src/utils/http';

const fetchModelsData = () => {
    const modelsUrl = '/models'
    return http.get(modelsUrl).then(response => {
        return response
    }).catch(error => error)
}

const fetchProducts = () => {
  const url = `/products`
  return http.get(url).then(response => {
    return response
  }).catch(error => error)
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const {data: products} = await fetchProducts()
  await products.forEach(product => {
    const productNodeId = createNodeId(`${product.ref}-${product.name}`)
    const productNode = {
      name: product.name,
      productId: product.id,
      model_id: product.model_id,
      ref: product.ref,
      color: product.color,
      description: product.description,
      is_deal: product.is_deal,
      discount: product.discount,
      price: product.price,
      deal_price: product.deal_price,
      enabled: product.enabled,
      images: product.image_url,
      stocks: product.stocks,
      id: productNodeId,
      created_at: product.created_at,
      updated_at: product.updated_at,
      internal: {
        mediaType: 'application/json',
        type: "Product",
        contentDigest: createContentDigest(product)
      }
    }
    actions.createNode(productNode)
  })
    const { data: models } = await fetchModelsData()
    await models.forEach(async model => {
      const modelNodeId = createNodeId(`${model.ref}-${model.name}`)
      const node = {
        name: model.name,
        category_id: model.category_id,
        modelId: model.id,
        ref: model.ref,
        price: model.price,
        deal_price: model.deal_price,
        is_deal: model.is_deal,
        discount: model.discount,
        id: modelNodeId,
        internal: {
          type: "Model",
          contentDigest: createContentDigest(model),
        },
      }
      actions.createNode(node)
    })

}

exports.createPages = async ({ actions: { createPage }, graphql }) => {
    const models = await graphql(`
     {
        allModel {
          nodes {
            id
            name
            ref
            price
            deal_price
            is_deal
            discount
            category_id,
            modelId
          }
        }
      }
    `)
    const products = await graphql(`
    {
       allProduct {
         nodes {
           id
           name
           ref
           price
           color
           deal_price
           is_deal
           discount
           productId
           images { id, filename, url }
           model_id
           stocks { size, id }
           created_at
           updated_at
         }
       }
     }
   `)
   const formattedModelData = models.data.allModel.nodes.map(model => {
     const getModelProducts = products.data.allProduct.nodes.filter(product => product.model_id === model.modelId)
     return ({
       ...model,
       products: getModelProducts
     })
   })
    createPage({
        path: '/',
        component: require.resolve('./src/templates/MainTemplate.js'),
        context: { modelData: formattedModelData }
    })
    createPage({
      path: '/produtos',
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { modelData: formattedModelData, title: 'Produtos' }
    })
    formattedModelData.forEach((model, index) => {
      model.products.forEach((product, productIndex) => {
        createPage({
          path: `${model.ref}-${model.name.replace(/\s/g, '-')}-${product.ref}-${product.name.replace(/\s/g, '-')}`,
          component: require.resolve('./src/templates/ProdTemplate.js'),
          context: {model, product}
        })
      })
    })
    const biquiniModels = await graphql(`
    {
      allModel(filter: {category_id: {eq: 1}}) {
        edges {
          node {
            id
            name
            ref
            price
            deal_price
            is_deal
            discount
            category_id,
            modelId
          }
        }
      }
    }
  `)
    console.log('biquini', biquiniModels.data.allModel.edges);
    const resultForBiquinis = biquiniModels.data.allModel.edges.map(({node: model}) => {
      const getModelProducts = products.data.allProduct.nodes.filter(product => product.model_id === model.modelId)
      return ({
        ...model,
        products: getModelProducts
      })
    })
    createPage({
      path: `/produtos/biquinis`,
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { products: resultForBiquinis, title: 'Biquinis' }
    })
    const maioModels = await graphql(`
    {
      allModel(filter: {category_id: {eq: 2}}) {
        edges {
          node {
            id
            name
            ref
            price
            deal_price
            is_deal
            discount
            category_id,
            modelId
          }
        }
      }
    }
  `)

    const resultForMaios = maioModels.data.allModel.edges.map(({node: model}) => {
      const getModelProducts = products.data.allProduct.nodes.filter(product => product.model_id === model.modelId)
      return ({
        ...model,
        products: getModelProducts
      })
    })
    createPage({
      path: `/produtos/maios`,
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { products: resultForMaios, title: 'Maiôs' }
    })
    const saidaModels = await graphql(`
    {
      allModel(filter: {category_id: {eq: 3}}) {
        edges {
          node {
            id
            name
            ref
            price
            deal_price
            is_deal
            discount
            category_id,
            modelId
          }
        }
      }
    }
  `)
  const resultForSaidas = saidaModels.data.allModel.edges.map(({node: model}) => {
    const getModelProducts = products.data.allProduct.nodes.filter(product => product.model_id === model.modelId)
    return ({
      ...model,
      products: getModelProducts
    })
  })

    createPage({
      path: `/produtos/saidas`,
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { products: resultForSaidas, title: 'Saídas' }
    })
    const dealModels = await graphql(`
    {
      allModel(filter: {is_deal: {eq: true}}) {
        edges {
          node {
            id
            name
            ref
            price
            deal_price
            is_deal
            discount
            category_id,
            modelId
          }
        }
      }
    }
    `)
    const resultForDeals = dealModels.data.allModel.edges.map(({node: model}) => {
      const getModelProducts = products.data.allProduct.nodes.filter(product => product.model_id === model.modelId)
      return ({
        ...model,
        products: getModelProducts
      })
    })
  
    createPage({
      path: '/produtos/ofertas',
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { products: resultForDeals, title: 'Ofertas' }
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


