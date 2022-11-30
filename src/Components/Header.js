import '../index.css';
const Header = ({filter, handleFilterChange, openForm}) => {
    return (
        <div className="header">
              
              <input 
              className="search" type="text" placeholder="Search.." 
               value = {filter} 
              onChange={handleFilterChange} 
              />
              
              <div className="profile">
                  <button className="account">Kevin Yan</button>
              </div>
              <div className="greeting">
                  <div> Hi there, </div>
                  <div>Kevin</div> 
              </div>
              <div className="buttons">
                  <button className="upload" onClick={() => openForm()}>Upload</button>
              </div>
        </div>
    )
}

export default Header