import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-2000">
      <ClipLoader color="#70056B" size={70} speedMultiplier={1.2} />
    </div>
  );
}
