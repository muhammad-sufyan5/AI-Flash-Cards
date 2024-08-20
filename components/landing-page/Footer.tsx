import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Flashcard Pro</h2>
            <p className="text-sm">
              Supercharge your learning with our powerful flashcard platform.
            </p>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="https://www.facebook.com/share/xoBPwz3i3tw7VxRa/?mibextid=qi2Omg"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaFacebookF className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/Sufi87455524"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-sufyan-11598b208"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaLinkedinIn className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/muhammad-sufyan5"
              target="_blank"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
          <div className="text-center md:text-left">
            <a
              href="https://portfolio-website-azure-seven-20.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Visit Us
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">
            Designed and developed by{" "}
            <span className="font-semibold text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text">
              Muhammad Sufyan, Umme Aymen, Obed Destine
            </span>{" "}
            &copy; 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
