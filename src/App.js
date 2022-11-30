import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.route";
import Shop from "./routes/shop/shop.route";
import Home from "./routes/home/home.route";
import Authentication from "./routes/authentication/authentication.route";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;
