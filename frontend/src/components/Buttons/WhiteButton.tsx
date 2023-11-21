function WhiteButton({
  content,
  onClick,
}: {
  content: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="transform rounded-xl border border-primary-color bg-white px-3 py-1 font-semibold text-primary-color transition-all hover:scale-105 hover:bg-primary-color hover:font-normal hover:text-white"
    >
      <p>{content}</p>
    </button>
  );
}

export default WhiteButton;
