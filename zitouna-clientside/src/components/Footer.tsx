export function Footer(): JSX.Element {
  return (
      <footer className="p-4 bg-gray-800 text-white text-center w-full mt-auto">
        <p>&copy; 2025 Zitouna. All rights reserved.</p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>
            <a href="/privacy" className="hover:text-gray-400">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/terms" className="hover:text-gray-400">
              Terms of Service
            </a>
          </li>
        </ul>
      </footer>
  );
}
