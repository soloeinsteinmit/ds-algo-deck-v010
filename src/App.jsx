import { RouterProvider } from "react-router-dom";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { router } from "./routes/router";
import { useSelector } from "react-redux";

function App() {
  const { appTheme } = useSelector((state) => state.playgroundLayout);
  return (
    <NextThemesProvider attribute="class" defaultTheme={appTheme}>
      <RouterProvider router={router} />
    </NextThemesProvider>
  );
}

export default App;
