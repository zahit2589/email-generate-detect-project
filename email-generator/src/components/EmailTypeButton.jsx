function EmailTypeButton({ name, icon, selected, onSelect }) {
  const getIconComponent = () => {
    if (name === "İndirim") {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" fill="#0071DC" />
          <path
            d="M7 12L10 15L17 8"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    } else if (name === "İptal") {
      return <span className="text-red-600 font-bold">N</span>;
    } else if (name === "İş") {
      return <span className="text-blue-600">📊</span>;
    } else {
      return icon;
    }
  };

  return (
    <button
      className={`px-4 py-2 border rounded-md flex items-center gap-2 min-w-fit ${
        selected
          ? "bg-indigo-800 border-indigo-400"
          : "bg-gray-600 border-gray-500"
      }`}
      onClick={() => onSelect(name)}
      type="button"
    >
      <span>{getIconComponent()}</span>
      <span>{name}</span>
    </button>
  );
}

export default EmailTypeButton;
