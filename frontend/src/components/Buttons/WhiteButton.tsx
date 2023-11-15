function WhiteButton({ content }: { content: string }) {
  return (
    <button className="rounded-xl bg-white font-semibold text-primary-color border border-primary-color py-1 px-3 hover:bg-primary-color hover:text-white hover:font-normal">
      <p>{content}</p>
    </button>
  );
}

export default WhiteButton;
