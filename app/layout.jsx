import "@styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover and Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
      </body>
      <main className="app"> {children} </main>
    </html>
  );
};

export default RootLayout;
