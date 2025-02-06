import { Button } from "../ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa"; // Utilisation de React Icons pour les logos

const AuthButtons = () => {
  return (
    <div className="flex space-x-4 justify-center">
      {/* Bouton Google */}
      <Button
        variant="outline"
        className="flex items-center px-6 py-2 text-sm font-medium border-gray-300 rounded-lg"
      >
        <FaGoogle className="mr-2 text-blue-500" color="red" />
        Google
      </Button>

      {/* Bouton GitHub */}
      <Button
        variant="outline"
        className="flex items-center px-6 py-2 text-sm font-medium border-gray-300 rounded-lg"
      >
        <FaGithub className="mr-2 text-gray-800" />
        GitHub
      </Button>
      {/*<Button
        variant="outline"
        className="flex items-center px-6 py-2 text-sm font-medium border-gray-300 rounded-lg"
      >
        <FaGithub className="mr-2 text-gray-800" />
        ENT Le Mans
      </Button>*/}
    </div>
  );
};

export default AuthButtons;
