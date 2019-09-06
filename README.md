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

Na nossa aplicação do carrinho de compras, para começarmos a usar o Redux, temos que ter 3 estruturas primordiais que são:
- As Actions
- Os Reducers
- A store

E assim _consequirmos gerenciar o estado global da nossa aplicação por meio dos componentes_. Criaremos a nossa Action explicitando 
o que irá acontercer quando chamar-mos tal action . **Lembrando que uma Action representa um objeto que tem um tipo e um payload**. 

Com os reducers, vamos **conseguir falar como os estados vão ser atualizados**. 

O instrutor criou uma pasta para cada uma dessas tres coisas.  Primeiro vamos criar uma Action para adicionar um produto 
no carrinho de compras. **O meu carrinho de compra será uma Store**. Action:
```
export const ADD_TO_CART = 'ADD_TO_CART';
//Action Creator
export const addToCart = product => ({
  type: ADD_TO_CART,
  product
});
```
Observe que o tal do Payload vai ser o product. A Action Creator, `addTocart` vai ser uma function que vai retornar nossa Action.

Depois vamos criar o Reducer para dizer como vamos atualizar a nossa Store. O instrutor chamou esse Reducer de cart.js. 
Nesse reducer, primeiro vamos observar qual será meu estado inicial. Qual estado queremos atualizar. Observe o código:
```
const initialState = {
  products: []
};
```
A function cart, que vai ser o reducer, vai receber dois parâmetros, o estado inicial e a action. Observe sua assinatura 
`export const cart = (state = initialState, action)`
E dentro dela vamos usar switch case como mostra o código abaixo:
```
switch (action.type) {
    case ADD_TO_CART:
      if(state.products.find(p => p.id === action.product.id)){
        return state;
      }
      return {
        ...state,
        product: state.products.concat(action.product)
      }
    default:
      return state;
  }
```
Dentro desse switch case que vamos de fato atualizar nossa Store. Observe que se to tipo da action for add to card, ele 
entra e faz uma verificação usando um if, onde se já existir o id do produto, simplesmente vai retornar o state, 
caso contrário vai adicionar o product na array products. 

Vamos ter uma única Store, **no entando podemos ter vários Reducers**. Mas nessa nossa aplicação vamos usar apenas 1. 
Caso tenhamos vários Reducers, temos que usar um método do pacote Redux, que se chama, `combineReducers()`. O instrutor usou 
esse método lá no index.js dentro da pasta reducers. Observe como é ele:
```
import {combineReducers} from 'redux'
import {cart} from "./cart";
export const Reducers = combineReducers({
  cart
});
```
Agora passemos à criação da Store, que vai representar nosso carrinho de compras. Lá nela, temos que dizer qual reducer
estamos usando. Vamos usar o método CreateStore(), e para esse método passamos o Reducer criado. 
```
import {createStore} from "redux";
import {Reducers} from "../reducers";

export const Store = createStore (
    Reducers /* preLoadeState */,
    window.__REDUX_DEVTOOLS__EXTENSION__ && window.__REDUX_DEVTOOLS__EXTENSION__()      <--

);
```
Lembrar do código que está alí apenas porque queremos que a extensão do Redux do chrome funcione. **Lembrando que não precisamos 
dessa coisa para o Redux funcionar.**

Finanlmente, precisamos ir lá no App e dizer que o conjunto de componentes que estão lá dentro, tudo que acontecer lá dentro, 
estará associado com a Store. E para isso vamos usar um componente do React-Redux chamado Provider passando a Store para ele.
```
<Provider store={Store}>    <--
      <div id="main-app">
        <h1>Amazing Store</h1>
       <BrowserRouter>
         <Route exact path="/" component={ProductsList}/>
         <Route path="/product/:id" component={ProductComponent}/>
       </BrowserRouter>
      </div>
</Provider>                 <--
```

Agora tudo que devemos fazer é uma associação entre componente e action. Simplesmente assim. Vamos ir lá no componente
ProductComponent, para que ao clicar nos detalhes do produto, vou cair na tela do produto, e nisso vou criar um botão para 
ao clicar, adicionar o produto no carrinho. Vamos adicionar o produto no nosso Estado Global. E esse estado global vai ser o 
carrinho de compras. 
No componente ProductComponent vamos usar a action ADD-TO-CART. E para fazer isso vamos usar o método connect(), do React-Redux,
assim vamos exportar o componente associado com essas ações. Vamos observe como fica o método. E reparar onde eu coloquei 
ele:
```
export const Product = connect (
    undefined,
    {addToCart}
)(ProductComponent);
```
Uma observação interessante. Observar que estou exportando o Product, ai lá no meu App, na rota, vou ter que usar não mais 
ProductComponent, mas sim Product. Observer: `<Route path="/product/:id" component={Product}/>`

Observe que o método connect recebe dois argumentos, o primeiro indica se desejamos recuperar algo dado para esse componente. 
Nesse momento não vamos usar ele, por isso declaramos undefined. **O segundo argumento é um object para onde vou passar 
minhas actions**. A connect vai retornar outra function, onde passamos como argumento qual componente que vamos conectar à essa ação
e então vai usar as configurações que usarmos. 

Em seguinda o instrutor criou um botão para de fato usar a Action. **E essa action fica disponível como uma propriedade 
para o meu componente**. Fizemos assim:
- Puxamos a ação que declaramos
- Colocamos no botão que quando eu clicarm chama a ação ADD-TO-CART
`<button onClick={() => this.props.addToCart(this.state.product)}>Add to Cart</button>`

O próximo passo do nosso projeto será a página que vai mostrar quais produtos estão no carrinho de compras. E depois vamos 
criar um botão para retirar o produto do carrinho. 

Para essa ação **temos que criar uma Action e Reducer**. Lá na pasta view, o instrutor criou o component Cart onde vai 
ser listado os produtos adicionados. Vamos observar nessa view o seguinte: O nome dela é Cart. A assinatura da classe vai ser 
essa: `class CartComponent extends Component`. E também lá no export temos a seguinte assinatura: `export const Cart = connect()`.
Lembrar que é Cart que devemos colocar lá no App, para fazer o roteamento. 

Em relação ao método connect(), visto que ele recebe dois argumentos e a gente já havia utilizado um deles vamos utilizar o 
outro. Passando **o primeiro argumento para o connect,** vamos _conseguir recuperar os dados da nossa Store para o componente 
carrinho de compras._ Ele vai ser uma function mapStateToProps(). Isso é porque devemos declarar quais dados vamos trabalhar 
dentro desse componente, do Cart, que será o nosso carrinho de compras. Portanto no connect() temos que:
- 1 argumento (Quais dados da Store que vamnos utilizar)
- 2 argumento (Quais as actions que vamos usar)

Portanto ela vai ficar assim:
```
export const Cart = connect(
    mapStateToProps,
    {removeFromCart}
)(CartComponent);
```
E esse método mapStateToProps que vai retornar quais os dados vamos querer exibir no componente. 
```
const mapStateToProps = ({cart}) => (
    {
      products: cart.products
    }
);
```
E lá no Reducer cart, vamos ter a array de produtos usada ai em cima. Observe que ela será o Estado inicial:
```
const initialState = {
  products: []
};
```
Em seguido o professor o professor criou a action para remover um produto do carrinho de compras. Observe que ele vai ser 
chamado REMOVE_FROM_CART e ele vai ficar lá no index.js dentro da pasta action:
```
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
//Action Creator
export const addToCart = product => ({
  type: ADD_TO_CART,
  product
});
export const removeFromCart = product => ({     <--
  type: REMOVE_FROM_CART,
  product
});
```
Declaramos o tipo e o payload dele. Agora vou ir lá no Reducer, no cart.js na pasta Reducer, e adiciona mais um 
case na estrutura switch. Mas agora vai ser um para trabalhar a retirada do produto do carrinho de compras:
```
case REMOVE_FROM_CART:
      if(state.products.find(p => p.id === action.product.id)){
        return {
          ...state,
          products: state.products.filter(p=> p.id !== action.product.id)
        };
      }
      return state;
```
Observando o if, onde ele vai retornar o primeiro elemento do array (products) casa seja satisfeita a function de teste. 
Ou seja se tiver uma id fornecido que for igual ao que tá na action, vai retornar um estado modificado. E observe que o método 
filter vai retornar uma array com todos os elementos que passarem no teste, na function, ou seja o id que for diferente 
do que foi passado na action.

E então essa action vai ser passada lá no componente do carrinho de compras. 

Agora vamos de fato listas os produtos do carrinho de compras. Agora vamos lá no return() e trabalhar o html 
```
<ul>
            {this.props.products.map(product => (
                <li>
                  <img src={require(`../assets/images/${product.image}`)} alt=""/>
                  <h4>{product.name}</h4>
                  <span>{product.price}</span>
                  <button onClick={() => this.props.removeFromCart(product)}>Remove from cart</button>
                </li>
            ))}
          </ul>
```

E depois o instrutor montou um trecho onde a medida que vamos adicionando produto no carrinho, vai ser acumulado o valor, 
observe:
```
<p>
<b> Amount:</b> {this.props.products.reduce((acc, current) => acc + current.price, 0 ).toFixed(2)}
</p>
```

Em suma o que está acontecendo aqui é o seguinte:
1. **O usuário clica no botão para adicionar um produto no carrinho de compras**
2. **É disparado uma Action para adicionar um produto**
3. **Um reducer recebe a ação com um tipo de um payload**
4. **O mesmo reducer trata a ação, retornando um objeto modificado que representa o novo estado da aplicação**
5. **A store agora possui um novo valor, atualizado**
6. **O component Cart é renderizado novamente com os novos valores da store**

Sempre que o usuário clica no botão para adicionar um produto ao carrinho de compras, é necessário disparar uma ação,
tratar o tipo da ação pelo reducer e atualizar valor da store. 