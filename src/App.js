import AppRoutes from "./routes/AppRoutes";
import { ToggleMenuProvider } from "./shop/ToggleMenuContext";
import { DirectionLayoutProvider } from "./shop/DirectionLayoutContext";
import { ThemeProvider } from "./shop/ThemeContext";
import { LanguageProvider } from "./shop/LanguageContext";
import { LoginProvider } from "./shop/LoginContext";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "./themestyles/themesColor.css";
import "./themestyles/languageDirection.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <LoginProvider>
      <ThemeProvider>
        <ToggleMenuProvider>
          <DirectionLayoutProvider>
            <LanguageProvider>
              <ToastContainer theme="colored" />
              <AppRoutes />
              <div id="notifications"></div>
            </LanguageProvider>
          </DirectionLayoutProvider>
        </ToggleMenuProvider>
      </ThemeProvider>
    </LoginProvider>
  );
}

export default App;
