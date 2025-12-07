import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import logo from "../../../assets/logo.png"; 

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10">
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                    <img src={logo} alt="MeetUp Logo" className="h-10 w-auto" />
                    <h2 className="text-xl font-bold">MeetUp</h2>
                    </div>

                    <p className="text-sm leading-6 opacity-80">
                    MeetUp connects people, ideas, and opportunities.
                    Our mission is to simplify events, communities,
                    and networking—making every meetup meaningful.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2 text-sm opacity-80">
                    <li>📍 Dhaka, Bangladesh</li>
                    <li>📞 +880 123 456 789</li>
                    <li className="flex items-center gap-2">
                        <MdEmail className="text-lg" />
                        support@meetup.com
                    </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                    <div className="flex items-center gap-4 text-2xl">
                    <a href="https://github.com" target="_blank" className="hover:text-primary">
                        <FaGithub />
                    </a>
                    <a href="https://linkedin.com" target="_blank" className="hover:text-primary">
                        <FaLinkedin />
                    </a>
                    <a href="https://x.com" target="_blank" className="hover:text-primary">
                        <FaXTwitter />
                    </a>
                    <a href="mailto:support@meetup.com" className="hover:text-primary">
                        <MdEmail />
                    </a>
                    </div>
                </div>
            </div>
            <div className="border-t mt-10 pt-4 text-center text-sm opacity-60">
              © {new Date().getFullYear()} MeetUp — All rights reserved.
            </div>
        </div>
    </footer>
  );
};

export default Footer;