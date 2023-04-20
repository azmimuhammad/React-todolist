const Navbar = () => {
  const style = {
    container: {
      padding: "38px 220px",
      backgroundColor: "#16ABF8",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
    },
    text: {fontSize: "24px", fontWeight: 700, lineHeight: "36px", color: "#fff"}
  }

  return (
    <div style={style.container} data-cy="header-background">
      <div style={style.text} data-cy="header-title">
        TO DO LIST APP
      </div>
    </div>
  )
}

export default Navbar
