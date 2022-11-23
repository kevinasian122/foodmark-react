import '../index.css';
const Header = () => {
    return (
        <div className="header">
            <div className="search">
                <input type="text" placeholder="Search.." />
            </div>
            <div className="profile">
                <p>Kevin Yan</p>
            </div>
            <div className="greeting">
                <div> Hi there, </div>
                <div>Kevin</div> 
            </div>
            <div className="buttons">
                <button className="upload" onclick="openForm()">+</button>
            </div>
        </div>
    )
}

export default Header