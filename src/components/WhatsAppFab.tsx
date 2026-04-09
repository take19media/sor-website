export default function WhatsAppFab() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!number) return null;
  const msg = encodeURIComponent("Hi, I'm interested in stocking Richard Bravo jewellery");
  return (
    <a
      href={`https://wa.me/${number}?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Message us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 md:hidden w-14 h-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-lg"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.24c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM16.03 5C9.94 5 5 9.93 5 15.99c0 2.39.77 4.61 2.07 6.43L5 29l6.74-2.05a11.01 11.01 0 0 0 4.29.86h.01c6.08 0 11.03-4.93 11.03-11 0-2.94-1.15-5.7-3.23-7.78A10.96 10.96 0 0 0 16.03 5zm0 19.88h-.01a9.1 9.1 0 0 1-4.63-1.27l-.33-.2-3.99 1.21 1.24-3.89-.22-.35a9.02 9.02 0 0 1-1.4-4.85c0-5.01 4.11-9.1 9.16-9.1 2.44 0 4.74.95 6.47 2.67a9.05 9.05 0 0 1 2.68 6.44c0 5.01-4.11 9.1-9.17 9.1z" />
      </svg>
    </a>
  );
}
