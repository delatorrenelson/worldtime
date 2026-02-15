interface SearchInputProps {
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput({ onSearch }: SearchInputProps) {
    return (
        <input
            type="text"
            className="input w-96 max-w-xs outline outline-1 outline-slate-100 bg-inherit z-10"
            onChange={onSearch}
            placeholder="Search"
        />
    );
}

export default SearchInput;
