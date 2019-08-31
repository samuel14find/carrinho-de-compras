This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### Minhas Notas Samuel B
Essa aplicação simples é para aprender alguns conceitos do Redux e mais um pouco sobre React. É simplesmente um carrinho 
de compras onde vou ter uma lista de produtos e posso adicionar esses produtos em um carrinho. Vamos ter uma tela para listar 
todos os produtos, uma tela para listar um produto único onde nessa tela terá um botão para adicionar um produto único. E vamos 
ter uma outra tela que será a tela do carrinho de compras, listando todos os produtos adicionados. 

Para prosseguir com essa aplicação necessitamos instalar três pacotes. São os seguintes:
- redux
- react-redux
- react-router-dom

E para prosseguir, vamos criar uma pasta assets/images, components e view onde nessa view ficará os componentes responsáveis 
pela interface. E também o instrutor instalou a extensão React e Redux no Chrome. O primeiro componente criado foi o relacionado 
ao Produto, onde teremos uma listagem de produtos e cada um desses produtos será um componente chamado ProductItem. 

A imagem relacionada ao produto será buscada dinamicamente, ficando assim o código: 
` <img src={require(`../assets/images/${product.image}`)} alt={product.name}/>`
O Componente ProductItem vai ser o que a gente vai listar na nossa página Inicial, onde vamos estar listando todos os produtos. 
O instrutor usou o pacote Router, para criar um Link, em que esse link vai nos levar à página principal do produto:
`<p><Link to={`/product/${product.id}`}>Details</Link>></p>`

Em seguida o instrutor criou um componente, que foi o ProductList em que esse componente vai ser o responsável por listar 
os produtos. E esse componente, como está relacionado a view, ficou lá na pasta view. Observar que esse Componente usou o 
seguinte ciclo de vido do React:
```
async componentWillMount() {
    const {items} = await Products.getProducts();
    this.setState({products: items})
  }
``` 
Isso porque queremos buscar o produto logo de cara, quando o usuário abrir a aplicação. Observe também que ele usou o 
async e o await, porque implementamos Promises lá no Products. 

O instrutor deixou criado, lá na API, um arquivo chado Product.js, em que ele será o responsável por devolver os items 
presentes no arquivo products-data.json. Faremos uma simulçao de uma Requisição em uma API. Esse arquivo vai possuir dois 
métodos. O `static getProducts()` e o `getProductById(id)`. E observe que ambos os métodos retornam Promises. 
```
 static getProducts(){
    return new Promise((resolve, reject) =>{
      if(products){
        resolve(products)
      } else {
        reject();
      }
    });
  }
```
Esse método vai retornar todos os produtos ou vai dar um reject. 
```
static getProductById(id){
    return new Promise(() => {
      const product = products.items.find(p=> p.id === parseInt(id));
      if(product){
        // eslint-disable-next-line no-undef
        resolve(product);
      } else {
        // eslint-disable-next-line no-undef
        reject();
      }
    });
  }
```
E esse método vai retornar o produto pelo seu ID. Observe que vamos usar o método find da arrray, porque items é uma array,
agora observe que foi passado uma callback, que será executada em cada iteração da array, cada elemento da array vai ser 
p. Ai se algum elemento satisfazer a função, ou seja, se a comparação for ok, quer dizer que o id foi encontrado e vai retornar
o product. 

Agora devemos criar uma rota para um componente que irá mostrar detalhes do produto. O componente vai ficar lá na pasta view
que vou chamar de ProductComponent.js. A nossa rota lá no App vai ficar assim:
```
<div id="main-app">
      <h1>Amazing Store</h1>
     <BrowserRouter>
       <Route exact path="/" component={ProductsList}/>
       <Route path="/product/:id" component={ProductComponent}/>    <--
     </BrowserRouter>
    </div>
```
Observe como coloquei um parâmetro alí na rota. Isso foi ensinado anteriormente. E para pegar esse id que vai vir pela URL
vou fazer assim lá no ProductComponent: `getProductById(this.props.match.params.id);`. Lembrando que esse método é o que 
está lá no Product.js. Observe também, quando foi renderizado a imagem do produto, como ele usou um && que é o booleano 
E :
```
<div className="product-page">
          {
            this.state.product.image && <img src={require(`../assets/images/${this.state.product.image}`)} alt=""/>
          }                           ^----
          <h3>{this.state.product.name}</h3>
          <span className="product-prive">
            <b>Price:</b>
            R${this.state.product.price}
          </span>
          <p>{this.state.product.description}</p>
        </div>
```

