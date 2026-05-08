import "../../../Styles/GeneralComponentsStyles/Header/Search.css";

type SearchProps = {
    onSearch: (value: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    return (
        <div className="search_box">
            <input className="search" placeholder="Search Project..." onChange={(e) => onSearch(e.target.value)} />
            <button className="search_button"></button>
        </div>
    );
};

export default Search;
