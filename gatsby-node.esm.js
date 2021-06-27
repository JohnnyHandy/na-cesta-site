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
    const { data: models } = await fetchModelsData()
    let modelNodeArray = []
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
        description: model.description,
        id: modelNodeId,
        internal: {
          type: "Model",
          contentDigest: createContentDigest(model),
        },
      }
      modelNodeArray.push(node)
      actions.createNode(node)
    })
    const {data: products} = await fetchProducts()
    await products.forEach(product => {
      const productNodeId = createNodeId(`${product.ref}-${product.name}`)
      const findParentModelNode = modelNodeArray.find(model => model.modelId === product.model_id)
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
        imagesUrl: product.image_url,
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
      actions.createParentChildLink({ parent: findParentModelNode, child: productNode })
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
            description
            is_deal
            discount
            description
            category_id,
            modelId
            childrenProduct {
              id
              name
              ref
              price
              description
              color
              deal_price
              is_deal
              discount
              productId
              images { id, filename, url }
              imageArray {
                 childImageSharp {
                    gatsbyImageData(
                     placeholder: BLURRED
                     layout: FULL_WIDTH
                    ) 
                 }
               }
              model_id
              stocks { size, id, quantity }
              created_at
              updated_at
   
            }
          }
        }
      }
    `)
   const formattedModelData = models.data.allModel.nodes.map(model => {
    const  { childrenProduct, ...rest } = model
      return ({
        ...rest,
        products: childrenProduct
      })
    })
    createPage({
        path: '/',
        component: require.resolve('./src/templates/MainTemplate.js'),
    })
    createPage({
      path: '/produtos',
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { modelData: formattedModelData, title: 'Produtos' }
    })
    formattedModelData.forEach((model, index) => {
      model.products.forEach((product, productIndex) => {
        const modelNodeId = model.id
        const productNodeId = product.id
        createPage({
          path: `${model.ref}-${model.name.replace(/\s/g, '-')}-${product.ref}-${product.name.replace(/\s/g, '-')}`,
          component: require.resolve('./src/templates/ProdTemplate.js'),
          context: {model, product, modelNodeId, productNodeId}
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
            childrenProduct {
              id
              name
              ref
              price
              description
              color
              deal_price
              is_deal
              discount
              productId
              images { id, filename, url }
              imageArray {
                 childImageSharp {
                    gatsbyImageData(
                     placeholder: BLURRED
                     layout: FULL_WIDTH
                    ) 
                 }
               }
              model_id
              stocks { size, id, quantity }
              created_at
              updated_at   
            }
          }
        }
      }
    }
  `)
    console.log('biquini', biquiniModels.data.allModel.edges);
    const resultForBiquinis = biquiniModels.data.allModel.edges.map(({node: model}) => {
      const  { childrenProduct, ...rest } = model
      return ({
        ...rest,
        products: childrenProduct
      })
    })
    createPage({
      path: `/produtos/biquinis`,
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { modelData: resultForBiquinis, title: 'Biquinis' }
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
            childrenProduct {
              id
              name
              ref
              price
              description
              color
              deal_price
              is_deal
              discount
              productId
              images { id, filename, url }
              imageArray {
                 childImageSharp {
                    gatsbyImageData(
                     placeholder: BLURRED
                     layout: FULL_WIDTH
                    ) 
                 }
               }
              model_id
              stocks { size, id, quantity }
              created_at
              updated_at   
            }
          }
        }
      }
    }
  `)

    const resultForMaios = maioModels.data.allModel.edges.map(({node: model}) => {
      const  { childrenProduct, ...rest } = model
      return ({
        ...rest,
        products: childrenProduct
      })
    })
    createPage({
      path: `/produtos/maios`,
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { modelData: resultForMaios, title: 'Maiôs' }
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
            childrenProduct {
              id
              name
              ref
              price
              description
              color
              deal_price
              is_deal
              discount
              productId
              images { id, filename, url }
              imageArray {
                 childImageSharp {
                    gatsbyImageData(
                     placeholder: BLURRED
                     layout: FULL_WIDTH
                    ) 
                 }
               }
              model_id
              stocks { size, id, quantity }
              created_at
              updated_at   
            }
          }
        }
      }
    }
  `)
  const resultForSaidas = saidaModels.data.allModel.edges.map(({node: model}) => {
    const  { childrenProduct, ...rest } = model
    return ({
      ...rest,
      products: childrenProduct
    })
  })

    createPage({
      path: `/produtos/saidas`,
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { modelData: resultForSaidas, title: 'Saídas' }
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
            childrenProduct {
              id
              name
              ref
              price
              description
              color
              deal_price
              is_deal
              discount
              productId
              images { id, filename, url }
              imageArray {
                 childImageSharp {
                    gatsbyImageData(
                     placeholder: BLURRED
                     layout: FULL_WIDTH
                    ) 
                 }
               }
              model_id
              stocks { size, id, quantity }
              created_at
              updated_at   
            }
          }
        }
      }
    }
    `)
    const resultForDeals = dealModels.data.allModel.edges.map(({node: model}) => {
        const  { childrenProduct, ...rest } = model
        return ({
          ...rest,
          products: childrenProduct
        })
      })
  
    createPage({
      path: '/produtos/ofertas',
      component: require.resolve('./src/templates/ProdListTemplate.js'),
      context: { modelData: resultForDeals, title: 'Ofertas' }
    })
    createPage({
      path: '/carrinho',
      component: require.resolve('./src/templates/CartTemplate.js')
    })
    createPage({
      path: '/registrar',
      component: require.resolve('./src/templates/AuthTemplate.js'),
      context: { auth: 'register', title: 'Registre-se' }
    })
    createPage({
      path: '/auth/confirmation',
      component: require.resolve('./src/templates/AuthTemplate.js'),
      context: { auth: 'confirm', title: 'Confirmar conta' }
    })
    createPage({
      path: '/login',
      component: require.resolve('./src/templates/AuthTemplate.js'),
      context: { auth: 'login', title: 'Entrar' }
    })
}


