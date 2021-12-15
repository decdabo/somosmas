import Menu from '../../assets/images/menu.svg'
import '../Header/Header.scss'

const Header = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="headerLogo">
                <button className="headerLogo__btn" onClick={() => setOpen(!open)}>
                    <img src={Menu} alt="Menu" className="headerLogo__img" />
                </button>
            </div>
        </>
    );
};
export default Header;