import KrishnaAndArjuna from "../public/Krishna_and_Arjuna.jpeg"
import Hero from "./Hero";

export default function Home() {
  return (
    <>
      <div className="w-full h-[100vh]" style={{backgroundImage:`url(${KrishnaAndArjuna.src})`, backgroundPosition:"center", backgroundSize:"cover", backgroundRepeat:"no-repeat"}}>
      </div>
      <Hero/>
    </>
  );
}
