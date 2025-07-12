import { Link } from "react-router-dom";

const CustomerServicePage = () => {
  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-yellow-400 border-b border-gray-700 pb-4">
          Customer Service
        </h1>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-300 mb-2">FAQ</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Find answers to the most frequently asked questions about our
            products, shipping, payments, and more. If you can’t find your
            answer here, feel free to contact our support team.
          </p>
        </section>

        {/* Support */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-300 mb-2">
            Support
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Need help? Our dedicated customer support team is here for you.
            Reach out via our{" "}
            <Link to="/" className="text-yellow-400 hover:underline">
              Contact Page
            </Link>{" "}
            or call us during business hours.
          </p>
        </section>

        {/* Returns */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-300 mb-2">
            Returns
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Not satisfied with your purchase? You can return any item within 7
            days of delivery, as long as it's in original condition. Visit our{" "}
            <Link
              to="/"
              className="text-yellow-400 hover:underline"
            >
              Returns Policy
            </Link>{" "}
            for more details.
          </p>
        </section>

        {/* Privacy Policy */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-300 mb-2">
            Privacy Policy
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            We value your privacy and protect your personal information with
            industry-standard encryption. Read our full{" "}
            <Link
              to="/"
              className="text-yellow-400 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        {/* Terms & Conditions */}
        <section>
          <h2 className="text-xl font-semibold text-yellow-300 mb-2">
            Terms & Conditions
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            By using our website, you agree to our terms of use, policies, and
            legal guidelines. For complete information, please read our{" "}
            <Link to="/" className="text-yellow-400 hover:underline">
              Terms & Conditions
            </Link>
            .
          </p>
        </section>

        <div className="text-center mt-10">
          <Link
            to="/"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerServicePage;
