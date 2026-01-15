import MainPage from "./ui/mainPage";
import Navbar from "./ui/navbar";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <main className="flex flex-col items-center">
        <MainPage></MainPage>
      </main>
    </div>
  );
}
