import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";
import { Provider } from "react-redux";
import { setupStore } from "./redux/store";

const store = setupStore();

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
