import Header from "../components/header/header";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
        <Header />
        <main className=" bg-white min-h-screen w-full">
            {children}  
        </main>
        </>
    );
  }