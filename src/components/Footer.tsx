import { FaNewspaper } from "react-icons/fa";
import NewsletterForm from "./NewsletterForm";

const Footer = () => {
  return (
    <>
      {/* Newsletter Section */}
      <section className="py-12 md:py-20 px-4 border-t border-primary/20">
        <div className="max-w-4xl mx-auto text-center">
          <FaNewspaper className="text-primary text-3xl md:text-4xl mx-auto mb-4 md:mb-6" />
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-secondary">
            Stay <span className="text-primary">Updated</span>
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 text-primary">
            Follow us on our social media platforms for the latest updates and
            events!
          </p>
          <NewsletterForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 border-t border-primary/20">
        <div className="max-w-6xl mx-auto px-4 text-center text-primary">
          <p className="text-sm md:text-base">
            © {new Date().getFullYear()} Gaming Community. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
