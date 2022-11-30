import '../index.css';
const Overlay = ({showForm, closeForm}) => {
    const active = showForm? 'active':''
    const classes = `overlay ${active}`
    return (
      <div className={classes} onClick = {() => closeForm()}></div> 
    )
  }
  
export default Overlay
