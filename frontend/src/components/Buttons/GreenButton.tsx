function GreenButton({ content }: { content: string }) {
  return (
    <button
      className="rounded-xl font-normal bg-primary-color text-white py-1 mx-1 px-3
    hover:bg-white hover:text-primary-color hover:font-semibold border border-primary-color transform hover:scale-105 transition-all">
      <p>{content}</p>
    </button>
  );
}

export default GreenButton;
