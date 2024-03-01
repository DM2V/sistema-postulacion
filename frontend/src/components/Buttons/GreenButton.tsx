function GreenButton({
  content,
  onClick,
  disabled
}: {
  content: string;
  onClick?: () => void;
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mx-1 transform rounded-xl border border-primary-color bg-primary-color px-3
    py-1 font-normal text-white transition-all hover:scale-105 hover:bg-white hover:font-semibold hover:text-primary-color"
    >
      <p>{content}</p>
    </button>
  );
}

export default GreenButton;
