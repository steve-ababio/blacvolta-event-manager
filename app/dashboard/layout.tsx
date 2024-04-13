import Header from "../components/header/header";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
        <Header />
        <main className=" bg-white  w-full">
            {children}  
        </main>
        </>
    );
  }