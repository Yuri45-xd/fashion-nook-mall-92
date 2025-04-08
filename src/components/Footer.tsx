
import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-gray-500 font-medium mb-4 uppercase text-xs">ABOUT</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link to="/contact" className="hover:text-flipkart-blue">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-flipkart-blue">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-flipkart-blue">Careers</Link></li>
              <li><Link to="/stories" className="hover:text-flipkart-blue">Fashion Zone Stories</Link></li>
              <li><Link to="/press" className="hover:text-flipkart-blue">Press</Link></li>
              <li><Link to="/wholesale" className="hover:text-flipkart-blue">Fashion Zone Wholesale</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-500 font-medium mb-4 uppercase text-xs">HELP</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link to="/payments" className="hover:text-flipkart-blue">Payments</Link></li>
              <li><Link to="/shipping" className="hover:text-flipkart-blue">Shipping</Link></li>
              <li><Link to="/cancellation" className="hover:text-flipkart-blue">Cancellation & Returns</Link></li>
              <li><Link to="/faq" className="hover:text-flipkart-blue">FAQ</Link></li>
              <li><Link to="/report" className="hover:text-flipkart-blue">Report Infringement</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-500 font-medium mb-4 uppercase text-xs">POLICY</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link to="/return-policy" className="hover:text-flipkart-blue">Return Policy</Link></li>
              <li><Link to="/terms" className="hover:text-flipkart-blue">Terms Of Use</Link></li>
              <li><Link to="/security" className="hover:text-flipkart-blue">Security</Link></li>
              <li><Link to="/privacy" className="hover:text-flipkart-blue">Privacy</Link></li>
              <li><Link to="/sitemap" className="hover:text-flipkart-blue">Sitemap</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-500 font-medium mb-4 uppercase text-xs">SOCIAL</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <Link to="/facebook" className="hover:text-flipkart-blue flex items-center gap-2">
                  <Facebook className="w-4 h-4" />Facebook
                </Link>
              </li>
              <li>
                <Link to="/twitter" className="hover:text-flipkart-blue flex items-center gap-2">
                  <Twitter className="w-4 h-4" />Twitter
                </Link>
              </li>
              <li>
                <Link to="/youtube" className="hover:text-flipkart-blue flex items-center gap-2">
                  <Youtube className="w-4 h-4" />YouTube
                </Link>
              </li>
              <li>
                <Link to="/instagram" className="hover:text-flipkart-blue flex items-center gap-2">
                  <Instagram className="w-4 h-4" />Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between">
          <div className="flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <span className="text-flipkart-blue font-medium text-sm">Advertise</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-flipkart-blue font-medium text-sm">Gift Cards</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-flipkart-blue font-medium text-sm">Help Center</span>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            © 2023 Fashion Zone
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
