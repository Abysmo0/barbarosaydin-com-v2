export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="w-full px-6 md:px-16 mx-auto text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white tracking-tight">Barbaros Aydin</h3>
          <p className="text-sm mt-2 text-gray-400">Strategy | Investment | Development</p>
        </div>
        <p className="mb-6 px-4 mx-auto text-gray-400">
  Independent professional advisory across business, investment and real estate.
</p>
        <p className="mb-8 font-medium">
          Email: <a href="mailto:contact@barbarosaydin.com" className="text-white hover:underline">contact@barbarosaydin.com</a>
        </p>
        <div className="flex justify-center space-x-4 text-sm font-medium text-gray-400">
  <a href="/#home" className="hover:text-white transition-colors">Home</a>
  <span>·</span>
  <a href="/#expertise" className="hover:text-white transition-colors">Expertise</a>
  <span>·</span>
  <a href="/#about" className="hover:text-white transition-colors">About</a>
  <span>·</span>
  <a href="/#contact" className="hover:text-white transition-colors">Contact</a>
  <span>·</span>
  <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy & Terms</a>
</div>
      </div>
    </footer>
  );
}